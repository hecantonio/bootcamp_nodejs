const express = require('express');
const router = express.Router();

const Bookings = require('./../../../models/bookings');
//const Users = require('../users');


router.get('/', function (req, res) {
    if(req.session.user){
        return res.render('admin/index', { name: 'Administrator'});
    }
    //res.status(403).json({ code: 'UA', message: 'Forbidden'})
    return res.render('admin/login');
});

router.post('/login', (req, res) => {
    const { email, password } = req.body;

    console.log('Email:', email, ' Password:', password);
    res.json({ code: 'OK', message: 'Login Success!'})
})

router.get('/bookings', (req, res) => {
    return Bookings.getBooking((error, elems)=> {
        if (error) {
            return res.status(500).json({ code: 'UE', message: 'Unknown error'})
        }
        res.json(elems);
    });
});

router.post('/bookings', function (req, res){
    const body = req.body;
    console.log('Data:', body);
    
    return Bookings.createBooking(body, (error, b) => {
        if(error){
            return  res.status(500).json({ code: 'UE', message: 'Unkwown error'})
        }
        res.json({ code: 'OK', message: 'Saved successfully!', data: b.toJSON()})
    });
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
    
    Bookings.deleteBooking(id, (error, b) => {
        if (error) {
            return  res.status(500).json({ code: 'UE', message: 'Unkwown error'})
        }
        res.json({ code: 'OK', message: 'Deleted successfully!', data: b.toJSON()})
    });
});


//router.use('/users', Users);


module.exports = router;
