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
const HttpError = require('../models/http-error');
const helpers = require('./helpers/file');

const deleteFunc = async (req, res, next) => {
    jwt.verify(req.token, 'secret', function(err, decoded) {
    const {id} = req.body;
    if (id) {
        if (!err) {
            let promise1 = helpers.employeeFindDelete;
            let promise2 = helpers.employeeDelete;
            return Promise.all([promise1, promise2])
            .then(() => res.json({'Success': 'user deleted'}))
            .catch(err => {
                let error = new HttpError('Could not delete user.', 403)
                return next(error)
            })
        } else {
            let error = new HttpError('Could not delete user.', 403)
            return next(error)
        }
    } else {
        let error = new HttpError('Invalid token.', 401)
        return next(error)
    }})
}

const employeeList = async (req, res, next) => {
    const {id} = req.body;
    if (id) {
    jwt.verify(req.token, 'secret', function(err, decoded) {
        if (!err) {
            Employee.find({author: id}, async (error, result) => {
                if (!error) {
                    if (result.length > 0) {
                        let userId = result[0].userId;
                        Users.find({_id: userId}, (err, resul) => {
                            let newObj = {
                                username: resul[0].username, 
                                password: resul[0].password
                            }
                            res.json({'Data': result, 'Login': newObj})
                        })
                    } else {
                        res.json({'Data': null})
                    }
                }
            })
        } else {
            res.json({'Failure': err})
        }
    })
    } else {
        res.json({'Failure': 'No id sent.'})
    }
}



exports.deleteFunc = deleteFunc;
exports.employeeList = employeeList;