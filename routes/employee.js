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

router.post('/edit-employee-profile', middleware.verifyToken, controller.editProfile)

router.post('/add-employee', controller.add)

exports.routes = router;