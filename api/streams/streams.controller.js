const express = require("express");
const router = express.Router();
const streamsService = require("./streams.service");

// routes
router.get("/", teste);

module.exports = router;

function teste(req, res, next){
  streamsService
  .teste()
  .then(result => (result ? res.json(result) : res.status(400).json({ success: false })))
  .catch(err => next(err));
}