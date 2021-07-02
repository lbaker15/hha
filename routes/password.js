const  path = require('path');
const express = require('express');
const Users = require('../models/users');
const router = express.Router();
const sendEmail = require("../utils/sendEmail");

router.post('/reset', async(req, res, next) => {
    const {id} = req.body;
    Users.find({_id: id}, async (err, result) => {
        if (!err) {
            let email = 'laelbaker@hotmail.co.uk'
            let link = result[0].password;
            await sendEmail(email, 'Subject', link)
            res.send('response')
        }
    })
})

exports.routes = router;