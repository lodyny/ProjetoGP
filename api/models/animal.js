var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.Types.ObjectId;

var animalSchema = mongoose.Schema({
    name        : String,
    gender      : Number, //ISO/IEC 5218
    breed       : { type: ObjectId, ref: 'Breed' },
    height      : Number,
    weight      : Number,
    birthday    : String,
    details     : { type: String, default: null },
    image       : { type: String, default: null }
});

module.exports = mongoose.model('Animal', animalSchema);