const  path = require('path');
const express = require('express');
const rootDir = require('../util/path');
const Provider = require('../models/providers');
const router = express.Router();
const axios = require('axios');
const Employee = require('../models/employee');
const Users = require('../models/users');
let key = process.env.GOOGLE_API;
const helpers = require('./functionHelpers');
const providers = require('../models/providers');
const employee = require('../models/employee');


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
    providers.find({userId: id}, async (err, result) => {
        if (result.length > 0) {
            console.log('HERE', result)
            res.json({'Data': result, 'Type': 'Provider'})
        } else {
            console.log(id)
            employee.find({userId: id}, async (err, result2) => {
                console.log(result2)
                if (result2.length > 0) {
                    let userId = result2[0].userId;
                    let username; let password;
                    await Users.find({_id: userId}, (err, result3) => {
                        username = result3[0].username;
                        password = result3[0].password;
                    })
                    res.json({'Data': result2, username, password, 'Type': 'Employee'})
                } else {
                    res.json({'Error': 'User not found'})
                }
            })
        }
    })
})

exports.routes = router;
