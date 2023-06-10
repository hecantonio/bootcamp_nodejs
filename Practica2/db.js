const mongoose = require('mongoose');

const password = 'RfII1K1caoBJYJVr';

//const url = `mongodb+srv://leonardolarrea1:${password}@bootcamp-espol.qlecbal.mongodb.net/carwash?retryWrites=true&w=majority`
const url = 'mongodb://localhost:27017';

mongoose.connect(url)
.then(() => {
    console.log('Database connected!');

    // const bookingSchema = new mongoose.Schema({
    //     first_name: String,
    //     last_name: String,
    //     address:  String,
    //     city: String
    // });
    
    // const Bookings = new mongoose.model('booking', bookingSchema);
    
    
    // const neeBooking = new Bookings({
    //     first_name: 'Marco',
    //     last_name: 'Calderon',
    //     address:  'kennedy',
    //     city: 'Guayaquil'
    // }).save().then((data) => {
    //     console.log('Saved!: ', data);
    // }).catch((error)=> {
    //     console.log('Error:', error);
    // })
})
.catch((error) => {
    console.log('DB Error:', error);
});



