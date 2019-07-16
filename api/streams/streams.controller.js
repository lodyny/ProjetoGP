const express = require("express");
const router = express.Router();
const streamsService = require("./streams.service");

// routes
router.get("/", getAll);

module.exports = router;

function getAll(req, res, next){
  streamsService
  .getAll()
  .then(result => (result ? res.json(result) : res.status(400).json({ success: false })))
  .catch(err => next(err));
}