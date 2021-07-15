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

const deleteFunc = async (req, res, next) => {
    jwt.verify(req.token, 'secret', function(err, decoded) {
    const {id} = req.body;
    if (id) {
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

exports.deleteFunc = deleteFunc;