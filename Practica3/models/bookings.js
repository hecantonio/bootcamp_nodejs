const Bookings = require('./../schemas/bookings');

function getBooking(cb) {
    Bookings.find({})
    .then((elems) => {
        return cb(null, elems);
    })
    .catch((error) => {
        console.log('Error:', error);
        return cb(error);
    })
}


function createBooking(b, cb) {
    new Bookings(b)
    .save()
    .then((elem) => {
        return cb(null, elem);
    })
    .catch((error) => {
        console.log('Error:', error);
        return cb(error);
    });
}

function deleteBooking(id, cb) {
    Bookings.findOneAndRemove({ _id: id})
    .then((elem) => {
        return cb(null, elem);
    })
    .catch((error) => {
        console.log('Error:', error);
        return cb(error);
    })
}

exports.getBooking = getBooking;
exports.createBooking = createBooking;
exports.deleteBooking = deleteBooking;