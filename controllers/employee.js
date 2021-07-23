const path = require('path');
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
            let promise1 = helpers.employeeFindDelete(id);
            let promise2 = helpers.employeeDelete(id);
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
    jwt.verify(req.token, 'secret', function(err, decoded) {
    const {id} = req.body;
    if (id) {
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
    } else {
        res.json({'Failure': 'No id sent.'})
    }
    })
}

const edit = async (req, res, next) => {
    jwt.verify(req.token, 'secret', function(err, decoded) {
    const {firstname, lastname, id, password, discipline, email, businessAddress} = req.body;
    let obj = {firstname, lastname, discipline: discipline, email, businessAddress}
        if (!err) {
            Employee.updateOne({_id: id}, {$set: obj}, 
                (err, result) => {
                    Employee.find({_id: id}, (err, result) => {
                        if (result.length > 0) {
                            let userId = result[0].userId;
                            bcrypt.hash(password, saltRounds, function(err, hash) {
                                Users.updateOne({_id: userId}, {password: hash}, (err, result) => {
                                    if (!err) {
                                        res.json({'Success': 'user changed'})
                                    }
                                })
                            })
                        } else {
                            res.json({'Failure': 'user not changed'})
                        }
                    })
            })
        } else {
            res.json({'Failure': err})
        }
    })
}

const editProfile = async (req, res, next) => {
    jwt.verify(req.token, 'secret', function(err, decoded) {
    const {firstname, lastname, id, password, discipline, email, businessAddress} = req.body;
    let obj = {firstname, lastname, discipline: discipline, email, businessAddress}
        if (!err) {
            Employee.updateOne({userId: id}, {$set: obj}, 
                (err, result) => {
                    Employee.find({userId: id}, (err, result) => {
                        if (result.length > 0) {
                            let userId = id;
                            bcrypt.hash(password, saltRounds, function(err, hash) {
                                Users.updateOne({_id: userId}, {password: hash}, (err, result) => {
                                    if (!err) {
                                        res.json({'Success': 'user changed'})
                                    }
                                })
                            })
                        } else {
                            res.json({'Failure': 'user not changed'})
                        }
                    })
            })
        } else {
            res.json({'Failure': err})
        }
    })
}

const add = async (req, res, next) => {
    let {
        firstname, 
        lastname, discipline, userId,
        businessAddress, email, author
    } = req.body;
    let obj = {userId, lastname: String(lastname).toLowerCase(), firstname: String(firstname).toLowerCase(), discipline, businessAddress: String(businessAddress).toLowerCase(), email, author}
    let add = new Employee(obj)
    await add.save().then(data => {
        return res.json({'Data': data})
    })
}

exports.deleteFunc = deleteFunc;
exports.employeeList = employeeList;
exports.edit = edit;
exports.editProfile = editProfile;
exports.add = add;