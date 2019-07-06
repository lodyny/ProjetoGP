var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.Types.ObjectId;

var chatSchema = mongoose.Schema({
    requestId   : { type: ObjectId, ref: 'User.Requests'},
    animal   : { type: ObjectId, ref: 'Animal'},
    user    : { type: ObjectId, ref: 'User'},
    state: String,
    messages: [{
        date: String,
        message: String,
        state: String,
        sender    : { type: ObjectId, ref: 'User'},
      }],
});

module.exports = mongoose.model('Chat', chatSchema);