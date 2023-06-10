const express = require('express');
const router = express.Router();

const Bookings = require('../../../models/bookings.js');

router.get(['/','/client'], function (req, res) {
    res.render('client/index', { name: 'Administrator'});
});


router.post('/client/bookings', function (req, res){
    // const { body: { data } } = res.body;
    console.log('Data:', req.body);
    //bookings.push(req.body)
    res.json({ code: 'OK', message: 'Saved successfully!'})
});