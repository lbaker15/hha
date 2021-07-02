const  path = require('path');
const express = require('express');
const Users = require('../models/users');
const router = express.Router();
const sendEmail = require("../util/sendEmail");

router.post('/reset', async(req, res, next) => {
    const {id} = req.body;
    Users.find({_id: id}, async (err, result) => {
        if (!err) {
            let email = 'lbaker@bws.digital'
            let link = result[0].password;
            console.log('LINK', link)
            await sendEmail(email, 'Subject', link)
            res.send('response')
        }
    })
})

exports.routes = router;