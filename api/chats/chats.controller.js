const express = require("express");
const router = express.Router();
const chatService = require("./chats.service");
const authorize = require("_helpers/authorize");
const Roles = require("_helpers/roles");

router.get("/",/*authorize(Roles.Admin),*/getOpenChats); // Retorna todos os chatsId de um animal
router.post("/", createChat); // cria chat (requestId, user(id), animalId)
router.post("/:id/createMessage", createMessage); // cria messagem (chatId, message.message)
router.get("/:id", getChat); // Obter um chat

module.exports = router;

function getOpenChats(req, res, next) {
  chatService
      .getOpenChats()
      .then(result => (result ? res.json(result) : res.status(400).json({ success: false})))
      .catch(err => next(err));
  }

  function createChat(req, res, next) {
    chatService.
        createChat(req.body)
        .then(result => (result ? res.json(result) : res.status(400).json({ success: false })))
        .catch(err => next(err));
}

function getChat(req, res, next){
  chatService.getById(req.params.id)
  .then(result => (result ? res.json(result) : res.status(400).json({
      success: false
  })))
  .catch(err => next(err));
}

function createMessage(req, res, next){
  if (req.params.id == null || req.body.message == null)
    res.status(400).json({ success: false});

    chatService
    .createMessage(req.params.id, req.body)
    .then(result => (result ? res.json(result) : res.status(400).json({ success: false})))
    .catch(err => next(err));
}