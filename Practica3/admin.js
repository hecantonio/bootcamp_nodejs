const express = require('express');
const app = express();
const engine = require('ejs-locals');
const bodyParser = require('body-parser');
const session = require('express-session');

const path = require('path');

const db = require('./db');

const AdminBookings = require('./controllers/admin/bookings')
const AdminUsers = require('./controllers/admin/users');
const { validarJWT } = require('./middlewares/validar-jwt');

app.use(bodyParser.json({ type: 'application/json' }))
// Use the session middleware
app.use(session({ 
    secret: 'Thisisthepassword', 
    resave: false,
    saveUninitialized: true
}))

app.engine('ejs', engine);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.use(validarJWT)
app.use('/users', AdminUsers)
app.use('/', AdminBookings);

app.use(express.static(path.join(__dirname, "build")));


const PORT = 3000;
app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`))
