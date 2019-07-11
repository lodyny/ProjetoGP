// app/models/user.js
// load the things we need
var mongoose = require("mongoose");
var ObjectId = mongoose.Schema.Types.ObjectId;
var bcrypt = require("bcrypt");

// define the schema for our user model
var userSchema = mongoose.Schema({
  email: { type: String, unique: true },
  password: String,
  name: String,
  birthdate: String,
  phonenumber: String,
  image: { type: String, default: null },
  role: { type: ObjectId, ref: "Role" },
  animals: [{type: ObjectId, ref: "Animal"}],
  banned: { type: Boolean, default: false },
  emailconfirmed: { type: Boolean, default: false },
  requests: [{
    date: String,
    details: String,
    state: String,
    chat: {type: ObjectId, ref: "Chat"},
    animal: {type: ObjectId, ref: "Animal"}
  }],
  notifications: [{
    date: String,
    title: String,
    message: String,
    read: Boolean
  }]
});

userSchema.methods.toDictionary = function() {
  return {
    id: this.id,
    email: this.email,
    emailconfirmed: this.emailconfirmed,
    name: this.name,
    birthdate: this.birthdate,
    phonenumber: this.phonenumber,
    image: this.image,
    banned: this.banned,
    requests: this.requests,
    animals: this.animals,
    notifications: this.notifications
  };
};

// methods ======================
// generating a hash
userSchema.methods.generateHash = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8));
};

// checking if password is valid
userSchema.methods.validPassword = function(password) {
  return bcrypt.compareSync(password, this.password);
};

// create the model for users and expose it to our app
module.exports = mongoose.model("User", userSchema);
