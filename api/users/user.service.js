const config = require("config.json");
const jwt = require("jsonwebtoken");
const Roles = require("_helpers/roles");
const User = require("models/user");
const sgMail = require("@sendgrid/mail");
const Role = require("models/role");
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
};

async function newNotification(email, notification){
  let _user = await User.findOne({
    email: email
  });

  let _notification = notification;
  _notification.date = new Date().toISOString().substr(0, 10);
  _notification.read = false;

  if (_user.notifications == null)
    _user.notifications = _notification;
  else
    _user.notifications.push(_notification);

    // Send Email FALTA
  await User.findOneAndUpdate({email: email}, {notifications: _user.notifications});

  return {
    success: true
  }
}

async function update(id, user){
  let _user = await User.findOne({ _id: id});

  if(user.password != null)
    _user.password = _user.generateHash(user.password);
  
  if(user.name != null)
    _user.name = user.name;

  if(user.birthdate != null)
    _user.birthdate = user.birthdate;

  if(user.phonenumber != null)
    _user.phonenumber = user.phonenumber;

  if(user.role != null){
    let _role = await Role.findOne({ title: user.role});
    _user.role = new ObjectId(_role._id);
  }

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
  _request.date = new Date().toISOString().substr(0, 10);

  if (_user.requests == null)
    _user.requests = _request;
  else
    _user.requests.push(_request);

  await User.findOneAndUpdate({email: req.email}, {requests: _user.requests});

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
    console.log(_request);
    let _newRequests = _user.requests;
    console.log(_newRequests);
    console.log(_user.requests.indexOf(_request));
    _newRequests.splice(_user.requests.indexOf(_request), 1);
    console.log(_newRequests);
    await User.findOneAndUpdate({_id: userId}, {requests: _newRequests});

  return {
    success: true
  }
}