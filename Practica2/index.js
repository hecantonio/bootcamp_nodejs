const express = require('express');
const app = express();
const engine = require('ejs-locals');
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieSession = require("cookie-session");
const path = require('path');
const DB = require('./db.js');
const Bookings = require('./models/bookings.js');

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

let bookings = [
        {
            id: 0,
            first_name: "Leonardo",
            last_name: "Larrea",
            address:  "Urdesa Norte",
            city: "Guayaquil"
        },
        {
            id: 1,
            first_name: "Marco",
            last_name: "Calderon",
            address:  "Puntilla",
            city: "Samborondon"
        }
]


app.get('/admin', function (req, res) {
    res.render('admin/index', { name: 'Administrator'});
});

app.get('/admin/bookings', (req, res) => {
    res.json(bookings);
});

app.get('/admin/bookings/search', (req, res) => {

    const { first_name } = req.query;
    console.log('Firstname:', first_name)
    Bookings.getBooking(first_name, (error, object) => {
        if (error){
            return res.status(500).json({code: 'UE', message: 'Unknown Error'})
        }
        return res.json({code: 'OK', message: 'Object', data: object})
    })
});

app.delete('/admin/bookings', (req, res) => {

    const { first_name } = req.query;
    console.log('Firstname:', first_name)
    Bookings.deleteBooking(first_name, (error, object) => {
        if (error){
            return res.status(500).json({code: 'UE', message: 'Unknown Error'})
        }
        return res.json({code: 'OK', message: 'Object', data: object})
    })
})

app.post('/admin/bookings', function (req, res){
    // const { body: { data } } = res.body;
    console.log('Data:', req.body);
    Bookings.saveBooking(req.body, (error, object) => {
        if (error){
            return res.status(500).json({code: 'UE', message: 'Unknown Error'})
        }
        return res.json({ code: 'OK', message: 'Saved successfully!', data: object.toJSON()})
    })
});

app.put('/admin/bookings', function (req, res){
    // const { body: { data } } = res.body;
    console.log('Data:', req.body);
    const body = req.body;
    const { id } = req.body;
    bookings = bookings.map(b => b.id == id ? body : b);
    res.json({ code: 'OK', message: 'Saved successfully!'})
});


app.delete('/admin/bookings/:id', function (req, res){
    // const { body: { data } } = res.body;
    console.log('Deleting:', req.params);
    const { id } = req.params;
    
    bookings = bookings.filter((b)=> b.id != id);

    console.log('Data after deleting:',bookings);
    res.json({ code: 'OK', message: 'Deleted successfully!'})
});


app.get(['/','/client'], function (req, res) {
    res.render('client/index', { name: 'Administrator'});
});


app.post('/client/bookings', function (req, res){
    // const { body: { data } } = res.body;
    console.log('Data:', req.body);
    bookings.push(req.body)
    res.json({ code: 'OK', message: 'Saved successfully!'})
});

app.listen(3000, () => console.log('Example app listening on port 3000!'))
