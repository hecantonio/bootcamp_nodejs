const express = require('express');
const router = express.Router();

router.get('/', function (req, res) {
    res.render('client/index', { name: 'Administrator'});
});


router.post('/bookings', function (req, res){
    // const { body: { data } } = res.body;
    console.log('Data:', req.body);
    bookings.push(req.body)
    res.json({ code: 'OK', message: 'Saved successfully!'})
});

module.exports = router;