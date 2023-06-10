const Bookings = require('./../schemas/bookings');

function getBooking(first_name, cb) {

    Bookings.find({first_name: first_name})
    .then((booking) => {
        console.log('Booking:', booking)
       return cb(null, booking);
    })
    .catch((error) => {
        console.log('Error:', error); 
        return cb(error);
    });
}

function saveBooking(data, cb) {
    const {
        first_name,
        last_name,
        address,
        city
    } = data;

    new Bookings({
        first_name,
        last_name,
        address,
        city
    }).save().then((booking) => {
        return cb(null, booking);
    }).catch((error)=> {
        console.log('Error:', error);
        return cb(error);
    })
}

function deleteBooking(first_name, cb) {
    Bookings.findOneAndRemove({first_name: first_name})
    .then((booking) => {
        console.log('Booking:', booking)
       return cb(null, booking);
    })
    .catch((error) => {
        console.log('Error:', error); 
        return cb(error);
    });
}

function deleteBookingById(first_name, cb) {
    Bookings.findOneAndRemove({_id: id})
    .then((booking) => {
        console.log('Booking:', booking)
       return cb(null, booking);
    })
    .catch((error) => {
        console.log('Error:', error); 
        return cb(error);
    });
}

exports.getBooking = getBooking;
exports.saveBooking = saveBooking;
exports.deleteBooking = deleteBooking;
exports.deleteBookingById = deleteBookingById;
