const express = require("express");
const router = express.Router();
const userService = require("./user.service");
const authorize = require("_helpers/authorize");
const Roles = require("_helpers/roles");

// routes
router.post("/", registration);
router.post("/authenticate", authenticate); // public route
router.get("/", authorize(Roles.Admin), getAll); // admin only
router.get("/:id", authorize(), getById); // all authenticated users
router.get("/token/:token", emailconfirmed);
router.post("/password/reset", authorize(), passwordReset);
router.post("/password/reset/:token", passwordResetWithToken);
router.post("/password/forgotten", passwordForgotten);
router.post("/createRequest", createRequest);
router.post("/:id", updateUser);
router.delete("/:id/removeRequest/:requestId", deleteRequest);

module.exports = router;


function updateUser(req, res, next){
  userService
    .update(req.params.id, req.body)
    .then(result => (result ? res.json(result) : res.status(400).json({ success: false })))
    .catch(err => next(err));
}

function registration(req, res, next) {
  userService
    .registration(req.body)
    .then(result => (result ? res.json(result) : res.status(400).json({ success: false })))
    .catch(err => next(err));
}

function emailconfirmed(req, res, next) {
  userService
    .emailconfirmed(req.params.token)
    .then(result => (result ? res.json(result) : res.status(400).json({ success: false })))
    .catch(err => next(err));
}

function authenticate(req, res, next) {
  userService
    .authenticate(req.body)
    .then(user => (user.success ? res.json(user) : res.status(400).json({ message: user.message })))
    .catch(err => next(err));
}

function getAll(req, res, next) {
  userService
    .getAll()
    .then(users => res.json(users))
    .catch(err => next(err));
}

function getById(req, res, next) {
  const currentUser = req.user;
  const id = parseInt(req.params.id);

  // only allow admins to access other user records
  if (id !== currentUser.sub && currentUser.role !== Roles.Admin) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  userService
    .getById(req.params.id)
    .then(user => (user ? res.json(user) : res.sendStatus(404)))
    .catch(err => next(err));
}

function passwordReset(req, res, next) {
  const currentUser = req.user;

  const { password, passwordRepeat } = req.body;
  if (password !== passwordRepeat) return res.status(400).json({ message: "Passwords do not match" });

  userService
    .passwordReset(currentUser.sub, password)
    .then(user => (user ? res.json(user) : res.sendStatus(404)))
    .catch(err => next(err));
}

function passwordResetWithToken(req, res, next) {
  const { password, passwordRepeat } = req.body;
  if (password !== passwordRepeat) return res.status(400).json({ message: "Passwords do not match" });

  userService
    .passwordReset(null, password, req.params.token)
    .then(user => (user ? res.json(user) : res.sendStatus(404)))
    .catch(err => next(err));
}

function passwordForgotten(req, res, next) {
  userService
    .passwordForgotten(req.body.email)
    .then(result => (result ? res.json(result) : res.status(400).json({ success: false })))
    .catch(err => next(err));
}

// User Requests
function createRequest(req, res, next){
  if (req.body.email == null || req.body.request == null)
    res.status(400).json({ success: false});

  userService
    .createRequest(req.body)
    .then(result => (result ? res.json(result) : res.status(400).json({ success: false})))
    .catch(err => next(err));
}

function deleteRequest(req, res, next){
  userService
    .deleteRequest(req.params.id, req.params.requestId)
    .then(result => (result ? res.json(result) : res.status(400).json({ success: false})))
    .catch(err => next(err));
}