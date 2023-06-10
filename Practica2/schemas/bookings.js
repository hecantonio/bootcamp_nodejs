const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    first_name: String,
    last_name: String,
    address:  String,
    city: String
}, {
    methods: {
        findByFirstName: async () =>{
            console.log('This:',  this.first_name)
            return await Bookings.find({ first_name: this.first_name });
        }
    }
});

bookingSchema.set('toJSON', {
    transform: (document, returnedOject) => {
        returnedOject.id = document._id
        delete returnedOject._id;
    } 
})


const Bookings = new mongoose.model('booking', bookingSchema);


module.exports = Bookings;