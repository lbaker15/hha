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
const controller = require('../controllers/employee');

router.post('/delete-employee', middleware.verifyToken, controller.deleteFunc)

router.post('/employee-list', middleware.verifyToken, controller.employeeList)

router.post('/edit-employee', middleware.verifyToken, controller.edit)

router.post('/edit-employee-profile', middleware.verifyToken, async (req, res, next) => {
    const {firstname, lastname, id, password, discipline, email, businessAddress} = req.body;
    let obj = {firstname, lastname, discipline: discipline, email, businessAddress}
    jwt.verify(req.token, 'secret', function(err, decoded) {
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
})


router.post('/add-employee', async (req, res, next) => {
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
})

exports.routes = router;