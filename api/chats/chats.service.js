const config = require("config.json");
const jwt = require("jsonwebtoken");
const Roles = require("_helpers/roles");
const User = require("models/user");
const sgMail = require("@sendgrid/mail");
const Role = require("models/role");
const Chat = require("models/chat");
const Specie = require("models/specie");
const Animal = require("models/animal");
var mongoose = require("mongoose");
const userService = require("../users/user.service");

var ObjectId = mongoose.Types.ObjectId;

module.exports = {
  getOpenChats,
  createChat,
  getById,
  createMessage,
  getUserChats
}

async function getOpenChats() {
    const chats = await Chat.find({})
    .populate("animal")
    .exec();
    let species = await Specie.find({}).populate('breeds');

    let openChats = {};
    let animalSet = [];
  
    chats.forEach(chat => {
      // var convertedJSON = JSON.parse(JSON.stringify(chat.animal));
        if(chat.state == 'Open'){
          species.forEach(specie => {specie.breeds.map(a => {
            if(chat.animal.breed.equals(a._id)){
              chat.animal.set('breed_name', a.name, {strict: false});
            }
          })});
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
      .populate({ path: 'user', select: ['name', 'email', 'image', 'phonenumber'] })
      .exec();
    if (!chat) return;
    return chat;
  }

  async function getUserChats(id) { // rever
    const chat = await Chat.findById(id)
      .populate({ path: 'user', select: ['name', 'email', 'image', 'phonenumber'] })
      .exec();
      const _user = await User.findById('5cfbf19d10062826c0b07fca').select({"image": 3, "email": 2, "name": 1, "_id": 0});
      chat.user = _user;
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

    let _user = await User.findOne({_id: chatInfo.user});
    _user.requests.forEach(req => {
      if (req._id == chatInfo.requestId){
        req.chat = newChat._id;
      }
    });
    await _user.save();

    let _notification = {'title' : 'New Conversation', 'message' : 'Admin has started a conversation'};
    await userService.newNotification(_user._id, _notification);

    newChat = JSON.parse(JSON.stringify(newChat));
    return newChat;
}

async function createMessage(chatId, req){ // chatId, Sender, Reciever
  let _chat = await Chat.findOne({
    _id: chatId
  });
  console.log(req);
  let _message = req.message;

  var d = new Date,
  dformat = [d.getDay().padLeft(),
            (d.getMonth()+1).padLeft(),
            d.getFullYear()].join('/') +' ' +
            [d.getHours().padLeft(),
            d.getMinutes().padLeft(),
            d.getSeconds().padLeft()].join(':');
            
  // _message.sender = req.sender;
  _message.date = dformat;
  _message.state = 'todo';

  if (_chat.messages == null)
    _chat.messages = _message;
  else
    _chat.messages.push(_message);
  
  await Chat.findOneAndUpdate({_id: chatId}, {messages: _chat.messages});

  return _message;
}