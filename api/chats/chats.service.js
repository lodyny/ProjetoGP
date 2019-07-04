const config = require("config.json");
const jwt = require("jsonwebtoken");
const Roles = require("_helpers/roles");
const User = require("models/user");
const sgMail = require("@sendgrid/mail");
const Role = require("models/role");
const Chat = require("models/chat");
const Animal = require("models/animal");
var mongoose = require("mongoose");

var ObjectId = mongoose.Types.ObjectId;

module.exports = {
  getOpenChats,
  createChat,
  getById
}

async function getOpenChats() {
    const chats = await Chat.find({})
    .populate("animal")
      .exec();
  
    let openChats = {};
    let animalSet = [];
  
    chats.forEach(chat => {
        if(chat.state == 'Open'){
          animalSet.push(chat.animal);
          if (openChats.hasOwnProperty(chat.animal._id)){
            
            openChats[chat.animal._id].push(chat._id);
          } else {
            openChats[chat.animal._id] = [chat._id];
          }
        }
    });
    chatJoin = [...new Set(animalSet)];

    chatJoin.forEach(animal => {
      animal.chats = openChats[animal._id];
    });

    return chatJoin;
  }

  async function getById(id) {
    const chat = await Chat.findById(id)
      .populate("user")
      .exec();
    if (!chat) return;
    return chat;
  }

  async function createChat(chatInfo){
    let _chat = new Chat();
    _chat.requestId = chatInfo.requestId;
    _chat.user = chatInfo.user;
    _chat.animal = chatInfo.animal;
    _chat.state = 'Open';
    let newChat = await _chat.save();
    if (!newChat) return;
    newChat = JSON.parse(JSON.stringify(newChat));
    return newChat;
}