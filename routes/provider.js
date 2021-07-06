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
let key = 'AIzaSyCNxlh-79Og3dQ_tYpV_Vzlkx3kAPyZ6HI';

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

router.post('/add-provider', async (req, res, next) => {
    let { firstname, lastname, discipline, gender, genders, 
    businessAddress, languages, services, 
    minAge, maxAge, age, telephone, author } = req.body;
        console.log(
            firstname, lastname, discipline, 
            gender, genders, businessAddress,
            languages, services, minAge, maxAge,
            age, telephone, author
            )
    if (firstname && lastname && discipline && gender && businessAddress) {
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
                minAge: (minAge) ? Number(minAge) : 0, maxAge: (maxAge) ? Number(maxAge) : 1000, age: age,
                genders: newGen,
                languages: newLang, 
                services: newServices, 
                author: author
            }
            let address = await helpers.stringReplace(obj.businessAddress)
            let providerCoords;
            try {
                const {data} = await axios.post(`
                    https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${key}
                `)
                providerCoords = await data.results[0].geometry.location;
                    // setTimeout(async () => {
                        if (providerCoords) {
                            obj.lat = providerCoords.lat;
                            obj.lng = providerCoords.lng;
                            let add = new Provider(obj)
                            await add.save().then(data => {
                                return res.json({'Data': data})
                            })
                        } else {
                            return res.json({'Failure': 'Address fail, no provider coords.'})
                        }
                    // }, 100)
            } catch(err) {
                return res.json({'Failure': 'Address fail, address cannot be converted.'})
            }
        } else {
            return res.json({'Failure': 'Incomplete information form.'})
        }
})

//CLIENT SIDE
router.post('/get-providers', async (req, res, next) => {
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
});

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