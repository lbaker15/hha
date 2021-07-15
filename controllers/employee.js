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

const deleteFunc = async (req, res, next) => {
    const {id} = req.body;
    if (id) {
    jwt.verify(req.token, 'secret', function(err, decoded) {
        if (!err) {
            let promise1 = new Promise((resolve, rej) => {
                Employee.find({_id: id}, (err, result) => {
                    if (result.length > 0) {
                        let {userId} = result[0];
                        Users.deleteOne({_id: userId}, (err, result2) => {
                            if (!err) {
                                resolve()
                            }
                        })
                    }
                })
            })
            let promise2 = new Promise((resolve, rej) => {
                Employee.deleteOne({_id: id}, (err, result) => {
                    if (!err) {
                        resolve()
                    }
                })
            })
            return Promise.all([promise1, promise2])
            .then(() => res.json({'Success': 'user deleted'}))
            .catch(err => console.log('ERROR', err))
        } else {
            return res.json({'Failure': err})
        }
    })
    } else {
        return res.json({'Failure': 'No data sent'})
    }
}

exports.deleteFunc = deleteFunc;