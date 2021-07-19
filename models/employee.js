const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Employee = new Schema({
    firstname: String,
    lastname: String,
    discipline: String,
    businessAddress: String,
    email: String,
    author: String,
    userId: String
})

module.exports = mongoose.model('Employee', Employee)