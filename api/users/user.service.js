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
  passwordForgotten
};

async function registration(user) {
  let _user = new User(user);
  _user.password = _user.generateHash(user.password);
  let _role = await Role.findOne({title:Roles.User}).exec();
  _user.role = new ObjectId(_role._id);
  let newUser = await _user.save();
  if (!newUser) return;
  newUser = JSON.parse(JSON.stringify(newUser));
  const token = jwt.sign({ domain: config.domain, email: newUser.email }, config.secret);
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
  const _email = jwt.verify(token, config.secret, function(err, decoded) {
    if (err) return;
    return decoded.email;
  });

  if (!_email) return;

  const _user = await User.findOneAndUpdate({ email: _email }, { emailconfirmed: true });
  return {
    success: true,
    ..._user.toDictionary()
  };
}

async function authenticate({ email, password }) {
  const user = await User.findOne({ email: email })
    .populate("role")
    .exec();
  if (!user) return { success: false, message: "Email or password is incorrect" };
  if (!user.emailconfirmed) return { success: false, message: "Email is not active yet." };
  if (!user.validPassword(password)) return { success: false, message: "Email or password is incorrect" };
  const token = jwt.sign({ sub: user.id, role: user.role.title }, config.secret);
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
    .exec();

  users.map(u => {
    return { ...u.toDictionary(), role: u.role.title };
  });
  return users.map(u => {
    return { ...u.toDictionary(), role: u.role.title };
  });
}

async function getById(id) {
  const user = await User.findById(id)
    .populate("role")
    .exec();
  if (!user) return;
  return { ...user.toDictionary(), role: user.role.title };
}

async function passwordReset(sub = null, password, token = null) {
  if (token !== null) {
    jwt.verify(token, config.secret, function(err, decoded) {
      if (err) return;
      sub = decoded.number;
    });
  }

  let _user = await User.findById(sub);

  if (!_user) return;
  _user.generateHash(password);
  const user = await User.findByIdAndUpdate(sub, { password: _user.password });
  return {
    ...user.toDictionary()
  };
}

async function passwordForgotten(email) {
  const _user = await User.findOne({ email: email }).exec();
  if (!_user) return;
  const token = jwt.sign({ domain: config.domain, email: _user.email, number: _user.id }, config.secret);
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
