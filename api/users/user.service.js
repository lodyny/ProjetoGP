const config = require("config.json");
const jwt = require("jsonwebtoken");
const Roles = require("_helpers/roles");
const User = require("models/user");

// users hardcoded for simplicity, store in a db for production applications
//  const users = [
//      { id: 1, username: 'admin', password: 'admin', firstName: 'Admin', lastName: 'User', role: Role.Admin },
//      { id: 2, username: 'user', password: 'user', firstName: 'Normal', lastName: 'User', role: Role.User }
//  ];

module.exports = {
  authenticate,
  getAll,
  getById
};

async function authenticate({ email, password }) {
  const user = await User.findOne({ email: email })
    .populate("role")
    .exec();
  if (!user) return;
  if (!user.validPassword(password)) return;
  const token = jwt.sign(
    { sub: user.id, role: user.role.title },
    config.secret
  );
  return {
    ...user.toDictionary(),
    role: user.role.title,
    token
  };
}

async function getAll() {
  const users = await User.find({})
    .populate("role")
    .exec();

  var a = users.map(u => {
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
