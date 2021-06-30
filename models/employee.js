const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Employee = new Schema({
    username: String,
    password: String,
    firstname: String,
    lastname: String,
    discipline: String,
    businessAddress: String,
    email: String,
    author: String
})

module.exports = mongoose.model('Employee', Employee)