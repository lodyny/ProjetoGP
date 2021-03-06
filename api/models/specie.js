var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.Types.ObjectId;

var specieSchema = mongoose.Schema({
    name        : String,
    name_PT     : String,
    breeds      : [{ type: ObjectId, ref: 'Breed' }],
    icon        : String
});

module.exports = mongoose.model('Specie', specieSchema);