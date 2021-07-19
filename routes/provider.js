const helpers = require('./functionHelpers');
const express = require('express');
const bcrypt = require('bcrypt');
const saltRounds = 10;
var jwt = require('jsonwebtoken');
const Providers = require('../models/providers');
const Provider = require('../models/providers');
const router = express.Router();
const axios = require('axios');
const middleware = require('../middleware/auth');
const HttpError = require('../models/http-error');
const controller = require('../controlers/provider');
let key = process.env.GOOGLE_API;

router.post('/provider-list', middleware.verifyToken, controller.providerList);
router.post('/add-provider', controller.addProvider);
router.post('/delete', middleware.verifyToken, controller.delete);
router.post('/edit', middleware.verifyToken, controller.edit)

//CLIENT SIDE
router.post('/get-providers', controller.getProviders);

//EDIT SELF?
router.post('/edit-provider', middleware.verifyToken, controller.editSelf)

exports.routes = router;