const config = require("config.json");
const jwt = require("jsonwebtoken");
const Roles = require("_helpers/roles");
const User = require("models/user");
const sgMail = require("@sendgrid/mail");
const Role = require("models/role");
const Chat = require("models/chat");
const Animal = require("models/animal");
var mongoose = require("mongoose");
sgMail.setApiKey(config.sendGridApi);


var ObjectId = mongoose.Types.ObjectId;

// users hardcoded for simplicity, store in a db for production applications
//  const users = [
//      { id: 1, username: 'admin', password: 'admin', firstName: 'Admin', lastName: 'User', role: Role.Admin },
//      { id: 2, username: 'user', password: 'user', firstName: 'Normal', lastName: 'User', role: Role.User }
//  ];

module.exports = {
  registration,
  emailconfirmed,
  authenticate,
  getAll,
  getById,
  passwordReset,
  passwordForgotten,
  createRequest,
  deleteRequest,
  update,
  newNotification,
  readNotification,
  deleteNotification,
  acceptRequest,
  refuseRequest,
  returnRequest,
  returnAnimal,
  checkUserAnimalRequest
};

async function checkUserAnimalRequest(userId, animalId){
  let _user = await User.findOne({_id: userId});
  console.log(_user);
  console.log(animalId);
  let output = {availability: true}
  _user.requests.forEach(req => {
    if (req.animal == animalId){
      output = {availability: false, hasChat : req.chat};
    }
  });
  return output;
}

async function acceptRequest(userId, requestId){
  // Actualizar estado do pedido para accepted
  let _user = await User.findOne({_id: userId});
  let animalId;

  _user.requests.forEach(req => {
    if (req._id == requestId){
      animalId = req.animal;
      req.state = "Accepted";
    }
  });


  // Adicionar o animal à pessoa
  if (animalId == null)
    return {
      success: false
    }

  let _animal = await Animal.findOne({_id: animalId});
  _animal.owner = new ObjectId(_user._id);
  await _animal.save();
  
  if (_user.animals == null)
    _user.animals = new ObjectId(_animal._id);
  else
    _user.animals.push(new ObjectId(_animal._id));

  await _user.save();

  let _notification = {'title' : 'Request state change', 'message' : 'Your Request has been accepted', 'route' : 'Profile'};
  await newNotification(userId, _notification);// Enviar notificação a avisar o utilizador

  return {
    success: true
  }
}

async function refuseRequest(userId, requestId){
  // Actualizar estado do pedido para refused
  let _user = await User.findOne({_id: userId});

  _user.requests.forEach(req => {
    if (req._id == requestId)
      req.state = "Refused";
  });

  await _user.save();

  // Enviar notficação para o utilizador
  let _notification = {'title' : 'Request state change', 'message' : 'Your Request has been denied', 'route' : 'Profile'};
  await newNotification(userId, _notification);

  return {
    success: true
  }
}

async function newNotification(userId, notification){
  let _user = await User.findOne({
    _id: userId
  });

  let _notification = notification;
  _notification.date = new Date().toISOString().substr(0, 10);
  _notification.read = false;

  if (_user.notifications == null)
    _user.notifications = _notification;
  else
    _user.notifications.push(_notification);

    // Falta enviar email (?)
  await User.findOneAndUpdate({_id: userId}, {notifications: _user.notifications});

  return {
    success: true,
    notification: _notification
  }
}

async function readNotification(userId, notificationId){
  let _user = await User.findOne({_id: userId});

  _user.notifications.forEach(not => {
    if (not._id == notificationId)
      not.read = true;
  });

  await User.findOneAndUpdate({_id: userId}, {notifications: _user.notifications});

  return {
    success: true
  }
}

async function deleteNotification(userId, notificationId){
  let _user = await User.findOne({_id: userId});

  let _newNotifications = _user.notifications;
  let _notification = await _user.notifications.find(function (element){
    return element._id == notificationId;
  });
  
  _newNotifications.splice(_user.notifications.indexOf(_notification), 1);

  await User.findOneAndUpdate({_id: userId}, {notifications: _newNotifications});

  return {
    success: true
  }
}

async function update(id, user){
  console.log(user);
  let _user = await User.findOne({ _id: id});

  if(user.userData.password != null)
    _user.password = _user.generateHash(user.userData.password);
  
  if(user.userData.name != null)
    _user.name = user.userData.name;

  if(user.userData.birthdate != null)
    _user.birthdate = user.userData.birthdate;

  if(user.userData.phonenumber != null)
    _user.phonenumber = user.userData.phonenumber;

    if(user.userData.image != null)
    _user.image = user.userData.image;

  if(user.userData.role != null){
    let _role = await Role.findOne({ title: user.userData.role});
    _user.role = new ObjectId(_role._id);
  }
  console.log(_user);
  await User.findOneAndUpdate({ _id: id}, _user);
  
  return {
    success: true,
    _user
  }
}

async function registration(user) {
  let _user = new User(user);
  _user.password = _user.generateHash(user.password);
  let _role = await Role.findOne({
    title: Roles.User
  }).exec();
  _user.role = new ObjectId(_role._id);
  let newUser = await _user.save();
  if (!newUser) return;
  newUser = JSON.parse(JSON.stringify(newUser));
  const token = jwt.sign({
    domain: config.domain,
    email: newUser.email
  }, config.secret);
  const msg = {
    to: newUser.email,
    from: config.emailFrom,
    subject: "AdotAqui Email",
    html: config.emailTemplate.replace(new RegExp("#LINKTOKEN#", "g"), config.domain + "/users/token/" + token)
  };
  sgMail.send(msg);

  return {
    success: true
  };
}

async function emailconfirmed(token) {
  const _email = jwt.verify(token, config.secret, function (err, decoded) {
    if (err) return;
    return decoded.email;
  });

  if (!_email) return;

  const _user = await User.findOneAndUpdate({
    email: _email
  }, {
    emailconfirmed: true
  });
  return {
    success: true,
    ..._user.toDictionary()
  };
}

async function authenticate({
  email,
  password
}) {
  const user = await User.findOne({
      email: email
    })
    .populate("role")
    .exec();
  if (!user) return {
    success: false,
    message: "Email or password is incorrect"
  };
  if (!user.emailconfirmed) return {
    success: false,
    message: "Email is not active yet."
  };
  if (!user.validPassword(password)) return {
    success: false,
    message: "Email or password is incorrect"
  };
  if (user.banned) return {
    success: false,
    message: "User banned"
  };
  const token = jwt.sign({
    sub: user.id,
    role: user.role.title
  }, config.secret);
  return {
    success: true,
    ...user.toDictionary(),
    role: user.role.title,
    token
  };
}

async function getAll() {
  const users = await User.find({})
    .populate("role")
    .populate("requests.animal")
    .exec();

  users.map(u => {
    return {
      ...u.toDictionary(),
      role: u.role.title
    };
  });

  return users.map(u => {
    return {
      ...u.toDictionary(),
      role: u.role.title
    };
  });
}



async function getById(id) {
  const user = await User.findById(id)
    .populate("role")
    .populate("animals")
    .populate("requests.animal")
    .exec();
  
  if (!user) return;
  return {
    ...user.toDictionary(),
    role: user.role.title
  };
}

async function passwordReset(sub = null, password, token = null) {
  if (token !== null) {
    jwt.verify(token, config.secret, function (err, decoded) {
      if (err) return;
      sub = decoded.number;
    });
  }

  let _user = await User.findById(sub);

  if (!_user) return;
  _user.generateHash(password);
  const user = await User.findByIdAndUpdate(sub, {
    password: _user.password
  });
  return {
    ...user.toDictionary()
  };
}

async function passwordForgotten(email) {
  const _user = await User.findOne({
    email: email
  }).exec();
  if (!_user) return;
  const token = jwt.sign({
    domain: config.domain,
    email: _user.email,
    number: _user.id
  }, config.secret);
  const link = config.domain + "/users/password/reset/" + token;
  const msg = {
    to: email,
    from: config.emailFrom,
    subject: "AdotAqui Password",
    html: '<h3>Definir nova password:</h3><p><a href="' + link + '">' + link + "</a></p>"
  };
  sgMail.send(msg);

  return {
    success: true
  };
}

async function createRequest(req) {
  let _user = await User.findOne({
    email: req.email
  });
  let _request = req.request;
  _request.state = 'Pending';


var d = new Date,
dformat = [d.getDay().padLeft(),
          (d.getMonth()+1).padLeft(),
           d.getFullYear()].join('/') +' ' +
          [d.getHours().padLeft(),
           d.getMinutes().padLeft(),
           d.getSeconds().padLeft()].join(':');

  _request.date = dformat;

  if (_user.requests == null)
    _user.requests = _request;
  else
    _user.requests.push(_request);

  await User.findOneAndUpdate({email: req.email}, {requests: _user.requests});

  let _notification = {'title' : 'Request sucessfuly made', 'message' : 'Pending consideration', 'route' : 'Profile'};
  await newNotification(_user._id, _notification);

  return {
    success: true
  }
}

async function deleteRequest(userId, requestId){
  let _user = await User.findOne({ _id: userId});
  if (_user == null)
    return {
      success: false,
      message: "Invalid User"
    }

  let _request = await _user.requests.find(function (element){
    return element._id == requestId;
  });
  if (_request == null)
    return {
      success: false,
      message: "Invalid Request"
    }
    
    let _newRequests = _user.requests;
    _newRequests.splice(_user.requests.indexOf(_request), 1);
    await User.findOneAndUpdate({_id: userId}, {requests: _newRequests});
    await Chat.deleteMany({user : _user._id, requestId : _request._id});

    let _notification = {'title' : 'Request removed', 'message' : 'A request has been removed', 'route' : 'Profile'};
    await newNotification(_user._id, _notification);

  return {
    success: true
  }
}

async function returnAnimal(userId, animalId){
  let _user = await User.findOne({ _id: userId});
  if (_user == null)
    return {
      success: false,
      message: "Invalid User"
    }

  let _animal = await _user.animals.find(function (element){
    return element._id == animalId;
  });
  if (_animal == null)
    return {
      success: false,
      message: "Invalid Animal"
    }
    console.log(_animal);
    let _newAnimals = _user.animals;
    console.log(_newAnimals);
    console.log(_user.animals.indexOf(_animal));
    _newAnimals.splice(_user.animals.indexOf(_animal), 1);
    console.log(_newAnimals);
    await User.findOneAndUpdate({_id: userId}, {animals: _newAnimals});
    await removeOwnership(_animal);

    let _notification = {'title' : 'Request removed', 'message' : 'A request has been removed from the system', 'route' : 'Profile'};
    await newNotification(_user._id, _notification);

  return {
    success: true
  }
}

async function removeOwnership(animalId){
  // Remover pessoa do animal
  let _animal = await Animal.findOne({_id: animalId});
  _animal.owner = null;
  await _animal.save();
  
}

async function returnRequest(userId, requestId){
  // Actualizar estado do pedido para returned
  let _user = await User.findOne({_id: userId});
  console.log(requestId);
  console.log(_user);
  _user.requests.forEach(req => {
    if (req._id == requestId)
      req.state = "Returned";
  });

  await _user.save();

  // Enviar notficação para o utilizador
  
  return {
    success: true
  }
}

Number.prototype.padLeft = function(base,chr){
  var  len = (String(base || 10).length - String(this).length)+1;
  return len > 0? new Array(len).join(chr || '0')+this : this;
}