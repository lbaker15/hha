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
                    let userId = result[0].userId;
                    Users.find({_id: userId}, (err, resul) => {
                        let newObj = {
                            username: resul[0].username, 
                            password: resul[0].password
                        }
                        res.json({'Data': result, 'Login': newObj})
                    })
                    
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
    const {firstname, lastname, id, discipline, email, businessAddress} = req.body;
    let obj = {firstname, lastname, discipline: discipline, email, businessAddress}
    console.log('ID', id)
    jwt.verify(req.token, 'secret', function(err, decoded) {
        if (!err) {
            Employee.updateOne({_id: id}, {$set: obj}, 
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