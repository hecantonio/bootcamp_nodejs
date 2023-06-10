const mongoose = require('mongoose');

//const password = 'RfII1K1caoBJYJVr';
//const url = `mongodb+srv://leonardolarrea1:${password}@bootcamp-espol.qlecbal.mongodb.net/carwash?retryWrites=true&w=majority`

const url = 'mongodb://127.0.0.1:27017/bootcamp_db';

mongoose.connect(url)
    .then(() => {
        console.log('Database connected!');
    })
    .catch((error) => {
        console.log('Error connecting:', error);
    });

