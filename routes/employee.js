const  path = require('path');
const express = require('express');
const Users = require('../models/users');
const router = express.Router();
const axios = require('axios')
const bcrypt = require('bcrypt');
const saltRounds = 10;
var jwt = require('jsonwebtoken');
const middleware = require('../middleware/auth');
const Providers = require('../models/providers');
const Employee = require('../models/employee');

router.post('/delete-employee', middleware.verifyToken, async (req, res, next) => {
    const {id} = req.body;
    if (id) {
    jwt.verify(req.token, 'secret', function(err, decoded) {
        if (!err) {
            Employee.deleteOne({_id: id}, (err, result) => {
                if (!err) {
                    console.log(result)
                    res.json({'Success': 'user deleted'})
                }
            })
        } else {
            res.json({'Failure': err})
        }
    })
    } else {
        res.json({'Failure': 'No data sent'})
    }
})

router.post('/employee-list', middleware.verifyToken, async (req, res, next) => {
    const {id} = req.body;
    if (id) {
    jwt.verify(req.token, 'secret', function(err, decoded) {
        if (!err) {
            Employee.find({author: id}, async (error, result) => {
                if (!error) {
                    console.log('RES',result)
                    res.json({'Data': result})
                }
            })
        } else {
            res.json({'Failure': err})
        }
    })
    } else {
        res.json({'Failure': 'No id sent.'})
    }
})

router.post('/edit-employee', middleware.verifyToken, async (req, res, next) => {
    const {firstname, lastname, id, username, password, discipline, email, businessAddress} = req.body;
    let obj = {firstname, lastname, username: username, password: password, discipline: discipline, email, businessAddress}
    console.log('Name', username)
    if (username) {
    jwt.verify(req.token, 'secret', function(err, decoded) {
        if (!err) {
            Employee.updateOne({username: username}, {$set: obj}, 
                (err, result) => {
                    console.log('RESULT', result)
                    //COMES BACK AS SUCCESSFUL EVEN WHEN FILTER NOT WORKED
                    if (!err) {
                        res.json({'Success': 'user changed'})
                    }
            })
        } else {
            res.json({'Failure': err})
        }
    })
    } else {
        res.json({'Failure': 'No data sent'})
    }
})

exports.routes = router;