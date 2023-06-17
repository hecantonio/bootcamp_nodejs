const express = require('express');
const app = express();
const engine = require('ejs-locals');
const bodyParser = require('body-parser');
const session = require('express-session');

const path = require('path');

//const db = require('./db');

const AdminBookings = require('./controllers/admin/bookings')

app.use(bodyParser.json({ type: 'application/json' }))


app.use(session({
    secret: 'Thiismypassword',
    cookie: { maxAge: 60000 }
}))


app.engine('ejs', engine);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.use('/', AdminBookings);

app.use(express.static(path.join(__dirname, "build")));

const PORT = 3000;
app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`))
