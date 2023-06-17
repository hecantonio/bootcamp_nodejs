const express = require('express');
const app = express();
const engine = require('ejs-locals');
const bodyParser = require('body-parser');
const session = require('express-session');

const path = require('path');

//const db = require('./db');

const ClientBookings = require('./controllers/client/bookings')

app.use(bodyParser.json({ type: 'application/json' }))

const middFecha = (req, res, next) => {
    const date = new Date();
    console.log('Time: ' + date);
    next();
}

app.use(session({
    secret: 'Thiismypassword',
    cookie: { maxAge: 60000 }
}))

app.use(middFecha);

app.use((req, res, next) => {
    const { user } = req.session;
    console.log('User is', user);
    next();
});

app.use((req, res, next) => {
    const user = {
        name: 'Hector',
        last: 'Jimenez'
    }
    req.session.user = user;
    next();
});

app.engine('ejs', engine);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, "build")));

app.use('/', ClientBookings);

const PORT = 3002;
app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`))
