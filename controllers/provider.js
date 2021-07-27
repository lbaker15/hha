const helpers = require('./helpers/functionHelpers');
const express = require('express');
const bcrypt = require('bcrypt');
const saltRounds = 10;
var jwt = require('jsonwebtoken');
const Providers = require('../models/providers');
const Users = require('../models/users');
const Provider = require('../models/providers');
const router = express.Router();
const axios = require('axios');
const middleware = require('../middleware/auth');
const HttpError = require('../models/http-error');
let key = process.env.GOOGLE_API;

const providerList = async (req, res, next) => {
    const {id} = req.body;
    if (id) {
    jwt.verify(req.token, 'secret', function(err, decoded) {
        if (!err) {
            Providers.find({author: id}, async (error, result) => {
                if (!error) {
                    res.json({'Data': result})
                } else {
                    let error = new HttpError('Could not find providers.', 500)
                    next(error)
                }
            })
        } else {
            let error = new HttpError(err, 401)
            next(error)
        }
    })
    } else {
        let error = new HttpError('No id sent', 401)
        next(error)
    }
}

const addProvider = async (req, res, next) => {
    let { firstname, lastname, discipline, gender, genders, 
    businessAddress, userId, languages, services, 
    minAge, maxAge, age, telephone, author } = req.body;
    if (services, genders, languages, age && minAge !== null | undefined && maxAge && firstname && lastname && discipline && gender && businessAddress) {
            let newGen = await genders.map(x => String(x).toLowerCase())
            let newLang = await languages.map(g => String(g).toLowerCase())
            let newServices = await services.map(g => String(g).toLowerCase())
            let obj = {
                firstname: String(firstname).toLowerCase(),
                lastname: String(lastname).toLowerCase(),
                discipline: String(discipline).toLowerCase(),
                gender: String(gender).toLowerCase(),
                telephone: Number(telephone),
                businessAddress: String(businessAddress).toLowerCase(),
                minAge: (minAge) ? Number(minAge) : 0, 
                maxAge: (maxAge) ? Number(maxAge) : 1000, 
                age: age,
                genders: newGen,
                languages: newLang, 
                services: newServices, 
                author: author,
                userId: userId
            }
            let address;
            try {
                address = await helpers.stringReplace(obj.businessAddress)
            } catch(err) {
                let error = new HttpError('Could not convert address to lowercase', 500)
                return next(error);
            }
            let providerCoords;
            try {
                const {data} = await axios.post(`
                    https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${key}
                `)
                providerCoords = await data.results[0].geometry.location; 
                // setTimeout(async () => {
                        if (providerCoords.lat && providerCoords.lng) {
                            obj.lat = providerCoords.lat;
                            obj.lng = providerCoords.lng;
                            try {
                                let add = new Provider(obj)
                                add.save().then((data, err) => {
                                
                                    return res.json({'Data': data})
                                })
                            } catch(err) {
                                let error = new HttpError('Could not save provider.', 500)
                                return next(error);
                            }
                        } else {
                            let error = new HttpError('Address fail, no provider coords.', 500)
                            return next(error);
                        }
                    // }, 100)
            } catch(err) {
                let error = new HttpError('Address fail, address cannot be converted.', 500)
                return next(error);
            }
        } else {
            let error = new HttpError('Incomplete information form.', 422)
            return next(error);
        }
}

const getProviders = async (req, res, next) => {
    let {address, distanceLimit, treatment, age, gender, language} = req.body; //IF NOT PROVIDED SET THESE TO DEFAULT
    //SET DEFAULT ADDRESS? DISTANCE LIMIT?
    distanceLimit = (!distanceLimit) ? 1000 : distanceLimit;
    address = (!address) ? '19 Bransdale Crescent, York, YO10 3PB' : address;
    let addressEdit = await helpers.stringReplace(address)
    let clientAddress; let providerAddress;
    try {
        const {data} = await axios.post(`
            https://maps.googleapis.com/maps/api/geocode/json?address=${addressEdit}&key=${key}
        `)
        clientAddress = data.results[0].geometry.location;
    } catch(err) {
        console.log(err)
    }
    //DEFINE PARAMS 
    let array = new Array;
    let checkBit = () => {
        let a = [{'services': (treatment) ? treatment.toLowerCase() : treatment}, {'genders': (gender) ? gender.toLowerCase() : gender}, 
        {'languages': (language) ? language.toLowerCase() : language}, {'age': age}]
        let defined = a.filter(x => {
            return Object.values(x)[0] !== undefined;
        })
        let obj = {}
        Promise.all(
            defined.map(x => {
                if (Object.keys(x)[0] === 'age') {
                    return obj = {...obj, 
                        minAge: {$lte: Object.values(x)[0]},
                        maxAge: {$gte: Object.values(x)[0]}
                    }
                } else {
                    let key = Object.keys(x)[0];
                    let value = Object.values(x)[0];
                    return obj = {...obj, [key]: value}
                }
            })
        )
        return obj;
    }
    let val = await checkBit()
    //CHECK OTHER CONDITIONS HERE - PROVIDERS GENDER, AGE, TREATMENT E
    Provider.find(
        val
    , async (err, result) => {
        console.log('RESULT', result)
        if (result) {       
            let promises = result.map(async (x) => {
                let obj = {'lat': x.lat, 'lng': x.lng}
                let data = await helpers.getDistance(obj, clientAddress)
                let km = Number(data)/1000
                if (km < distanceLimit) {
                    return array.push(x)
                } else { return }
            })
            Promise.all(promises).then(() => {
                res.json({'Data': array})
            })
        }
    })
}

const deleteF = async (req, res, next) => {
    console.log('deleteF fired edit')
    const {id} = req.body;
    if (id) {
        jwt.verify(req.token, 'secret', function(err, decoded) {
            if (!err) {
                Providers.find({_id: id}, (err, result) => {
                    if (result[0]) {
                    let userId = result[0].userId;
                        Users.deleteOne({_id: userId}, (err, result2) => {
                            if (!err) {
                                Providers.deleteOne({_id: id}, (err, result) => {
                                    if (!err) {
                                        console.log(result)
                                        res.json({'Success': 'user deleted'})
                                    } else {
                                        let error = new HttpError('Could not delete provider.', 500)
                                        next(error)
                                    }
                                })
                            } else {
                                let error = new HttpError('Could not delete user.', 500)
                                next(error)
                            }
                        })
                    } else {
                        let error = new HttpError('Could not find provider.', 500)
                        next(error)
                    }
                })
            } else {
                let error = new HttpError(err, 401)
                next(error)
            }
        })
    } else {
        let error = new HttpError('No id sent', 401)
        next(error)
    }
}

const editSelf = async (req, res, next) => {
    const obj = req.body;
    console.log('obj here', obj)
    if (obj.id) {
    jwt.verify(req.token, 'secret', function(err, decoded) {
        if (!err) {
            Providers.updateOne({userId: obj.id}, obj, 
                (err, result) => {
                    if (!err) {
                        res.json({'Success': 'user changed'})
                    }
            })
        } else {
            res.json({'Failure': err})
        }
    })
    } else {
        let error = new HttpError('No id sent', 401)
        next(error)
    }
}

const edit = async (req, res, next) => {
    const obj = req.body;
    console.log('edit', obj)
    if (obj.id) {
    jwt.verify(req.token, 'secret', function(err, decoded) {
        if (!err) {
            Providers.updateOne({_id: obj.id}, obj, 
                (err, result) => {
                    if (!err) {
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
}

exports.providerList = providerList;
exports.addProvider = addProvider;
exports.getProviders = getProviders;
exports.delete = deleteF;
exports.edit = edit;
exports.editSelf = editSelf;