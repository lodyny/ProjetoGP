var mongoose = require('mongoose');

var roleSchema = mongoose.Schema({
    title        : String
});

module.exports = mongoose.model('Role', roleSchema);