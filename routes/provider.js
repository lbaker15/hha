const express = require('express');
const router = express.Router();
const middleware = require('../middleware/auth');
const controller = require('../controllers/provider');
var jwt = require('jsonwebtoken');
const helpers = require('./functionHelpers');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const Providers = require('../models/providers');
const Provider = require('../models/providers');
const HttpError = require('../models/http-error');
const axios = require('axios');
let key = process.env.GOOGLE_API;

router.post('/provider-list', middleware.verifyToken, controller.providerList);
router.post('/add-provider', controller.addProvider);
router.post('/delete', middleware.verifyToken, controller.delete);
router.post('/edit', middleware.verifyToken, controller.editSelf)
//CLIENT SIDE
router.post('/get-providers', controller.getProviders);
//EDIT SELF?
router.post('/edit-provider', middleware.verifyToken, controller.edit)

exports.routes = router;