const express = require('express');
const router = express.Router();

const Bookings = require('./../../../models/bookings');
const Users = require('./../../../models/users');


router.get('/', (req, res) => {
    console.log('User:', req.session.user)
    if (req.session.user) {
        return res.render('admin/index', { name: 'Administrator'});
    }
    return res.render('admin/login');
});

router.post('/login', (req, res) => {

    const { 
        email, 
        password
    } = req.body;

    console.log('Email:', email, 'Password:', password);

    Users.getUserByEmail(email, (error, user) => {
        if(error) {
            return  res.status(500).json({ code: 'UE' , message: 'Unknown Error!'})
        }
        console.log('User:', user)
        if (user.password == password) {

            req.session.user = user.toJSON();

            return req.session.save(function (err) {
                if (err) return  res.status(500).json({ code: 'UE' , message: 'Unknown Error!'})
                console.log('Success:', user)
                // return res.json({ code: 'OK', message: 'Login successful!'})
                return res.redirect('/');
            });
        }
        
        return res.status(421).json({ code: 'PF' , message: 'Email or password is incorrect!'})
    });
});

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


module.exports = router;
