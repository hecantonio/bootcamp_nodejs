const mongoose = require('mongoose');


//const URL = `mongodb+srv://leonardolarrea1:RfII1K1caoBJYJVr@cluster0.ntz7wrc.mongodb.net/?retryWrites=true&w=majority`;
const URL = 'mongodb+srv://bootcamp:bootcamp@cluster0.beimaw4.mongodb.net/?retryWrites=true&w=majority';
mongoose.connect(URL)
.then(() => {
    console.log('Database connected!');
})
.catch((error)=> {
    console.log('Error connecting:', error);
});



// const bookings = mongoose.Schema({
//     first_name: String,
//     last_name: String,
//     address: String,
//     city: String
// });


// const Bookings = new mongoose.model('booking', bookings);

// const newbooking = new Bookings({
//     first_name: 'Leonardo',
//     last_name: 'Larrea',
//     address: 'Kennedy Norte',
//     city: 'Guayaquil'
// })
// .save()
// .then((b) => {
//     console.log('Booking:', b);
// })
// .catch((error) => {
//     console.log('Error:', error);
// })
// Bookings.find({ first_name: 'Eduardo'})
// .then((b) => {
//  console.log('Booking:', b)
// })
// .catch((error) => {
//  console.log('Error:', error);
// })




