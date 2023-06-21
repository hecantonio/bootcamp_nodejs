const express = require('express');
const app = express();
const engine = require('ejs-locals');
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieSession = require("cookie-session");
const path = require('path');

const db = require('./db');

const AdminBookings = require('./controllers/admin/bookings')
const ClientBookings = require('./controllers/client/bookings')

app.use(bodyParser.json({ type: 'application/json' }))

app.engine('ejs', engine);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.use(cors({origin: '*'}));

app.use(
    cookieSession({
      name: "__session",
      keys: ["practica"],
        maxAge: 24 * 60 * 60 * 100,
        sameSite: 'none'
    })
);

app.use(express.static(path.join(__dirname, "public")));


app.use('/admin', AdminBookings);
app.use('/client', ClientBookings);

app.listen(3000, () => console.log('Example app listening on port 3000!'))
