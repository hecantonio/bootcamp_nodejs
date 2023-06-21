const express = require('express');
const router = express.Router();

const Users = require('./../../../models/users');
//const Users = require('../users');

router.post('/login', (req, res) => {
    const { email, password } = req.body;
    console.log('Email:', email, ' Password:', password);
    Users.getUserByEmail(email, (err, item) => {
        if (err) {
            return res.status(500).json({ code: 'UE', message: 'Unknown Error!' })
        }
        req.session.user = { email, password };
        res.json({ code: 'OK', message: 'Login Success!' })
    })

})

router.get('/', (req, res) => {
    return Users.getUser((error, elems) => {
        if (error) {
            return res.status(500).json({ code: 'UE', message: 'Unknown error' })
        }
        res.json(elems);
    });
});

router.post('/', function (req, res) {
    const { user } = req.body;
    console.log('Data:', user);

    return Users.createUser(user, (error, b) => {
        if (error) {
            return res.status(500).json({ code: 'UE', message: 'Unkwown error' })
        }
        res.json({ code: 'OK', message: 'Saved successfully!', data: b.toJSON() })
    });
});


router.delete('/:id', function (req, res) {
    // const { body: { data } } = res.body;
    console.log('Deleting:', req.params);
    const { id } = req.params;

    Users.deleteUser(id, (error, b) => {
        if (error) {
            return res.status(500).json({ code: 'UE', message: 'Unkwown error' })
        }
        res.json({ code: 'OK', message: 'Deleted successfully!', data: b.toJSON() })
    });
});

module.exports = router;
