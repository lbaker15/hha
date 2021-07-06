const  path = require('path');
const express = require('express');
const rootDir = require('../util/path');
const Provider = require('../models/providers');
const router = express.Router();
const axios = require('axios');
const Employee = require('../models/employee');
const Users = require('../models/users');
let key = 'AIzaSyCNxlh-79Og3dQ_tYpV_Vzlkx3kAPyZ6HI';
const helpers = require('./functionHelpers');


router.post('/get-center', async (req, res, next) => {
    let {address} = req.body;
    let addressEdit = await helpers.stringReplace(address)
    let clientAddress; 
    try {
        const {data} = await axios.post(`
            https://maps.googleapis.com/maps/api/geocode/json?address=${addressEdit}&key=${key}
        `)
        clientAddress = data.results[0].geometry.location;
    } catch(err) {
        console.log(err)
    }
    res.json({'Client address': clientAddress})
}) 

router.post('/get-profile', async (req, res, next) => {
    let {id} = req.body;
    console.log('ID', id)
    Users.find({_id: id}, async (err, result) => {
        if (result) {
            let user = result[0].name;
            if (user) {
                Employee.find({username: user}, async (err, result) => {
                    res.json({'Data': result})
                })
            } else {
                res.json({'Error': 'User not found'})
            }
        } else {
            res.json({'Error': err})
        }
    })
})

exports.routes = router;
