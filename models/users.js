const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//If not admin then editor
const Provider = new Schema({
    username: String,
    password: String,
    admin: Boolean,
    hcProvider: Boolean
})

module.exports = mongoose.model('User', Provider)