const  path = require('path');
const express = require('express');
const Users = require('../models/users');
const router = express.Router();
const nodemailer = require("nodemailer");
const sendGridTransport = require('nodemailer-sendgrid-transport');


const transporter = nodemailer.createTransport(sendGridTransport({
    auth: {
        api_key: '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'
    }
}))
      


router.post('/reset', async(req, res, next) => {
    const {id} = req.body;
    Users.find({_id: id}, async (err, result) => {
        if (!err) {
            console.log(result)
            // transporter.sendMail({
            //     to: 'laelbaker@hotmail.co.uk',
            //     from: 'lbaker@bws.digital',
            //     subject: 'Signup',
            //     html: `
            //     <h1>
            //     test
            //     </h1>
            //     `
            // }, (err, res) => {
            //     console.log(res)
            // })
            res.send('response')
        }
    })
})

exports.routes = router;