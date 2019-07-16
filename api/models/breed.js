var mongoose = require('mongoose');

var breedSchema = mongoose.Schema({
    name        : String,
    name_PT     : String
});

module.exports = mongoose.model('Breed', breedSchema);