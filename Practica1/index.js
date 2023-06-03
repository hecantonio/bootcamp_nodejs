const express = require('express');
const engine = require('ejs-locals')

const app = express();

app.engine('ejs', engine);
//app.set('view engine', 'pug');
app.set('view engine', 'ejs');

app.set('views', __dirname + '/views')

/* app.get('/', (req, res) => {
    const name = req.query.name;
    res.render('pug/index', { name })
}) */

app.get('/admin', (req, res) => {
    const name = req.query.name;
    res.render('ejs/admin/index', { name })
});

app.get('/admin/data', (req, res) => {
    const data = {
        data: [
            [
                "1",
                "Urdesa Norte",
                "Héctor",
                "Data"
            ]
        ]
    };
    res.json(data);
});

app.listen(3000, () => {
    console.log('Ready in port 3000!')
});
