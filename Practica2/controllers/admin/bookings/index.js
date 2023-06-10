const express = require('express');
const router = express.Router();

const Bookings = require('../../../models/bookings.js');

router.get('/', function (req, res) {
    res.render('admin/index', { name: 'Administrator'});
});

router.get('/admin/bookings', (req, res) => {
    res.json(bookings);
});

router.get('/bookings/search', (req, res) => {

    const { first_name } = req.query;
    console.log('Firstname:', first_name)
    Bookings.getBooking(first_name, (error, object) => {
        if (error){
            return res.status(500).json({code: 'UE', message: 'Unknown Error'})
        }
        return res.json({code: 'OK', message: 'Object', data: object})
    })
});

router.delete('/bookings', (req, res) => {

    const { first_name } = req.query;
    console.log('Firstname:', first_name)
    Bookings.deleteBooking(first_name, (error, object) => {
        if (error){
            return res.status(500).json({code: 'UE', message: 'Unknown Error'})
        }
        return res.json({code: 'OK', message: 'Object', data: object})
    })
})

router.post('/bookings', function (req, res){
    // const { body: { data } } = res.body;
    console.log('Data:', req.body);
    Bookings.saveBooking(req.body, (error, object) => {
        if (error){
            return res.status(500).json({code: 'UE', message: 'Unknown Error'})
        }
        return res.json({ code: 'OK', message: 'Saved successfully!', data: object.toJSON()})
    })
});

router.put('/bookings', function (req, res){
    // const { body: { data } } = res.body;
    console.log('Data:', req.body);
    const body = req.body;
    const { id } = req.body;
    bookings = bookings.map(b => b.id == id ? body : b);
    res.json({ code: 'OK', message: 'Saved successfully!'})
});


router.delete('/bookings/:id', function (req, res){
    // const { body: { data } } = res.body;
    console.log('Deleting:', req.params);
    const { id } = req.params;
    
    Bookings.deleteBookingById(id, (err, elem) => {
        if(err){
            return res.status(500).json({code: 'UE', message: 'Unknown Error'})
        }else{
            console.log('Data after deleting:',elem);
            res.json({ code: 'OK', message: 'Deleted successfully!', data: elem})
        }
    })    
});
