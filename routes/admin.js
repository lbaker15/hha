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
    console.log('ID', id)
    providers.find({userId: id}, async (err, result) => {
        if (result) {
            console.log('result', result)
            res.json({'Data': result, 'Type': 'Provider'})
        } else {
            employee.find({userId: id}, async (err, result2) => {
                if (result2) {
                    res.json({'Data': result2, 'Type': 'Employee'})
                } else {
                    res.json({'Error': 'User not found'})
                }
            })
        }
    })
})

exports.routes = router;
