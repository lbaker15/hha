const  path = require('path');
const express = require('express');
const Users = require('../models/users');
const router = express.Router();
const axios = require('axios')
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
const middleware = require('../middleware/auth');
const Providers = require('../models/providers');
const Employee = require('../models/employee');
const saltRounds = 10;

router.post('/signup', async (req, res, next) => {
    let {name, password, admin} = req.body;
    bcrypt.hash(password, saltRounds, function(err, hash) {
        let obj = {name, password: hash}
        Users.create(obj).then(result => {
            if (result) {
                res.json({'Success': 'User created'})
            }
        })
    });
    
})

router.post('/login', async (req, res, next) => {
    let {name, password} = req.body;
    Users.find({name: name}, (err, result) => {
        let val = result;
        if (result) {
            bcrypt.compare(password, result[0].password, function(err, result) {
                if (result) {
                    //SEND TOKEN
                    console.log('HERE', val)
                    let token = jwt.sign({ data: 'bar' }, 'secret', { expiresIn: '1h' });
                    let obj = {'Token': token, 'Id': val[0]._id, 'Name': val[0].name, 'Priv': val[0].admin }
                    res.json(obj)
                } else {
                    //PASSWORD DOESNT MATCH
                    res.json({'Failure': 'Password incorrect'})
                }
            });
        } else {
            //CANNOT FIND USER
            res.json({'Failure': 'User incorrect'})
        }
    })
})

router.post('/provider-list', middleware.verifyToken, async (req, res, next) => {
    const {id} = req.body;
    if (id) {
    jwt.verify(req.token, 'secret', function(err, decoded) {
        if (!err) {
            Providers.find({author: id}, async (error, result) => {
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

router.post('/delete', middleware.verifyToken, async (req, res, next) => {
    const {id} = req.body;
    if (id) {
    jwt.verify(req.token, 'secret', function(err, decoded) {
        if (!err) {
            Providers.deleteOne({_id: id}, (err, result) => {
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

router.post('/edit', middleware.verifyToken, async (req, res, next) => {
    const obj = req.body;
    console.log('obj', obj)
    if (obj.id) {
    jwt.verify(req.token, 'secret', function(err, decoded) {
        if (!err) {
            Providers.updateOne({_id: obj.id}, obj, 
                (err, result) => {
                    console.log(result)
                    if (!err) {
                        console.log(result)
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