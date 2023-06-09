const express = require('express');
//const engine = require('ejs-locals')

const app = express();

//app.engine('ejs', engine);
app.set('view engine', 'pug');
//app.set('view engine', 'ejs');

app.set('views', __dirname + '/views');

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

app.get('/', (req, res) => {
    const { nombre, edad, nacionalidad, genero, estatura } = req.query;
    res.render('pug/index', { 
        nombre, 
        edad, 
        nacionalidad, 
        genero, 
        estatura 
    })
})
/*
app.get('/admin', (req, res) => {
    const name = req.query.name;
    console.log('name: ' + name);
    res.render('ejs/admin/index', { name })
});
*/
app.get('/admin/data', (req, res) => {
    res.json(data);
});

app.post('/admin/data', (req, res) => {
    const item = req.body.item;
    data.push(item);
    res.json({ code: 'ok', message: 'Success!' });
});

app.listen(3000, () => {
    console.log('Ready in port 3000!')
});
