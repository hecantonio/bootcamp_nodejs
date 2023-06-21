const mongoose = require('mongoose');

const bookings = mongoose.Schema({
    first_name: String,
    last_name: String,
    address: String,
    city: String
});

const Bookings = new mongoose.model('booking', bookings);

module.exports = Bookings;