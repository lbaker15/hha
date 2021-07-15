const  path = require('path');
const express = require('express');
const Users = require('../models/users');
const router = express.Router();
const axios = require('axios')
const bcrypt = require('bcrypt');
const saltRounds = 10;
const HttpError = require('../models/http-error');
var jwt = require('jsonwebtoken');
const middleware = require('../middleware/auth');
const Providers = require('../models/providers');
const Employee = require('../models/employee');


router.post('/signup', async (req, res, next) => {
    let {username, password, admin, hcProvider} = req.body;
    Users.find({username: username}, async(err, result) => {
        if (result.length === 0) {
            bcrypt.hash(password, saltRounds, function(err, hash) {
                let obj = {username, password: hash, admin, hcProvider}
                Users.create(obj).then(result => {
                    if (result) {
                        res.json({'Success': result._id})
                    }
                })
            })
        } else {
            let error = new HttpError('A user with this username already exists, please try a unique username.', 401)
            next(error)
        }
    })    
})

router.post('/user-check', async (req, res, next) => {
    let {username} = req.body;
    Users.find({username: username}, (err, result) => {
        console.log(result)
    })
})

router.post('/login', async (req, res, next) => {
    let {name, password} = req.body;
    Users.find({username: name}, (err, result) => {
        let val = result;
        if (result.length > 0) {
            bcrypt.compare(password, result[0].password, function(err, result) {
                if (result) {
                    console.log('HERE', val)
                    let token = jwt.sign({ data: 'bar' }, 'secret', { expiresIn: '1h' });
                    let obj = {'Token': token, 'Id': val[0]._id, 'Name': val[0].username, 'Priv': val[0].admin }
                    res.json(obj)
                } else {
                    res.json({'Failure': 'Password incorrect, please ensure password is spelled correctly.'})
                }
            });
        } else {
            res.json({'Failure': 'User not found, please ensure username is spelled correctly.'})
        }
    })
})


exports.routes = router;