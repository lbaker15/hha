const  path = require('path');
const express = require('express');
const rootDir = require('../util/path');
const Provider = require('../models/providers');
const router = express.Router();
const axios = require('axios');
const Employee = require('../models/employee');
const Users = require('../models/users');
let key = 'AIzaSyCNxlh-79Og3dQ_tYpV_Vzlkx3kAPyZ6HI';

var rad = function(x) {
  return x * Math.PI / 180;
};
var getDistance = function(p1, p2) {
    return new Promise((res, rej) => {
        var R = 6378137; // Earth’s mean radius in meter
        var dLat = rad(p2.lat - p1.lat);
        var dLong = rad(p2.lng - p1.lng);
        var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
          Math.cos(rad(p1.lat)) * Math.cos(rad(p2.lat)) *
          Math.sin(dLong / 2) * Math.sin(dLong / 2);
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        var d = R * c;
        res(d); // returns the distance in km
    })
};

const stringReplace = (string) => {
    if (string.includes(' ')) {
        let newString = string.replace(' ', '+')
        return stringReplace(newString)
    } else {
        return string;
    }
}

router.post('/get-providers', async (req, res, next) => {
    let {address, distanceLimit, treatment, age, gender, language} = req.body; //IF NOT PROVIDED SET THESE TO DEFAULT
    //SET DEFAULT ADDRESS? DISTANCE LIMIT?
    distanceLimit = (!distanceLimit) ? 1000 : distanceLimit;
    address = (!address) ? '19 Bransdale Crescent, York, YO10 3PB' : address;
    let addressEdit = await stringReplace(address)
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
                let data = await getDistance(obj, clientAddress)
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

router.post('/get-profile', async (req, res, next) => {
    let {id} = req.body;
    Users.find({_id: id}, async (err, result) => {
        console.log(result)
        res.json({'res': result})
    })
})

router.post('/add-employee', async (req, res, next) => {
    let {
        username, password, firstname, 
        lastname, discipline,
        businessAddress, email, author
    } = req.body;
    let obj = {username: String(username).toLowerCase(), password: String(password).toLowerCase(), lastname: String(lastname).toLowerCase(), firstname: String(firstname).toLowerCase(), discipline, businessAddress: String(businessAddress).toLowerCase(), email, author}
    let add = new Employee(obj)
    await add.save().then(data => {
        return res.json({'Data': data})
    })
})

router.post('/add-provider', async (req, res, next) => {
    let { firstname, lastname, discipline, gender, genders, 
        businessAddress, languages, services, 
        minAge, maxAge, age, telephone, author } = req.body;
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
    let address = await stringReplace(obj.businessAddress)
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
                    return res.json({'Address Fail': 'No provider coords'})
                }
            // }, 100)
    } catch(err) {
        console.log(err)
    }
})

exports.routes = router;
