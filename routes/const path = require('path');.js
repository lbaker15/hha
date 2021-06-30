const  path = require('path');
const express = require('express');
const rootDir = require('../util/path');
const Provider = require('../models/providers');
const router = express.Router();
const {Client} = require("@googlemaps/google-maps-services-js");
let key = 'AIzaSyCNxlh-79Og3dQ_tYpV_Vzlkx3kAPyZ6HI';

const googleMapsClient = new Client({});
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

// const instance = axios.create({
//   baseURL: 'https://some-domain.com/api/',
//   timeout: 1000,
//   headers: {'X-Custom-Header': 'foobar'}
// });

router.get('/get-providers', (req, res, next) => {
    let address = '1 Bransdale Crescent, York, YO10 3PB';
    let address2 = '19 Bransdale Crescent, York, YO10 3PB';
    let clientAddress; let providerAddress;
    googleMapsClient.geocode({
        params: {
            address: address,
            key: key
        }, timeout: 1000
    })
    .then(err => {
        if (!err) {
            console.log(response)
        //   clientAddress = response.json.results[0].geometry.location;          
        //   console.log(clientAddress)
        } else {
            console.log(err)
            res.json({'Error': err})
        }
    })
    .catch(err => console.log(err))
    // googleMapsClient.geocode({
    //     params: {
    //         address: address2,
    //         key: key
    //     }
    // })
    // .then((err, response) => {
    //     if (!err) {
    //         providerAddress = response.json.results[0].geometry.location;          
    //         getDistance(clientAddress, providerAddress)
    //         .then(data => {
    //             let num = Number(data)/1000
    //             res.json({'Data': num})
    //         })
    //         .catch(err => console.log('ERROR AT DISTANCE'))
    //       } else {
    //           res.json({'Error2': err})
    //       }
    // })
    // .catch(err => console.log('ERRORRR', err))

    
});

router.post('/add-provider', async (req, res, next) => {
    let obj = {
        name: 'Psychologist',
        discipline: 'Psychologist',
        gender: 'Female',
        businessAddress: '19 Bransdale Crescent',
        minAge: 18, maxAge: 50, genders: ['Male', 'Female'],
        languages: ['English'], services: ['Anxiety']
    }
    let add = new Provider(obj)
    await add.save().then(data => {
        return res.json({'Data': data})
    })
})

exports.routes = router;
