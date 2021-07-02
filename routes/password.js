const  path = require('path');
const express = require('express');
const Users = require('../models/users');
const router = express.Router();
const nodemailer = require("nodemailer");
const sendGridTransport = require('nodemailer-sendgrid-transport');
const bcrypt = require('bcrypt');
const saltRounds = 10;


const transporter = nodemailer.createTransport(sendGridTransport({
    auth: {
        api_key: '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'
    }
}))

let rootUrl = 'localhost:3000'

router.post('/reset', async(req, res, next) => {
    const {id, username} = req.body;
    Users.find({_id: id, username: username}, async (err, result) => {
        if (!err) {
            //let email = result[0].email | 'laelbaker@hotmail.co.uk';
            let email = 'laelbaker@hotmail.co.uk'
            let link = `/reset-link/${id}`
            transporter.sendMail({
                to: email,
                from: 'lbaker@bws.digital',
                subject: 'Signup',
                html: `
                <h3>
                Please visit this link to reset your password: 
                </h3>
                <a href="${rootUrl + link}">${rootUrl + link}</a>
                
                `
            }, (err, resp) => {
                if (!err) {
                    res.send('response')
                }
            })
        }
    })
})

router.post('/change', async (req, res, next) => {
    const {id, password} = req.body;
    bcrypt.hash(password, saltRounds, function(err, hash) {
        Users.updateOne({_id: id}, {password: hash}, (err, result) => {
            if (!err) {
                res.json({'Success': 'Password changed'})
            } else {
                res.json({'Failure': err})
            }
        })
    })
})

exports.routes = router;