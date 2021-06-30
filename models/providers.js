const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Provider = new Schema({
    firstname: String,
    lastname: String,
    discipline: String,
    gender: String,
    businessAddress: String,
    lat: String, lng: String,
    minAge: Number, maxAge: Number, genders: Array,
    languages: Array, services: Array, 
    telephone: Number,
    author: String
})

module.exports = mongoose.model('HC Providers', Provider)