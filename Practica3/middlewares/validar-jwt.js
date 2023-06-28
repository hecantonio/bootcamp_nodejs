const { response } = require('express');
const jwt = require('jsonwebtoken');

const SECRET_JWT_SEED = 'Thisismysecret';
const AUTH = { username: 'apl_consumo', password: '123456' }

const validarJWT = (req, res = response, next) => {

    let token = req.header('Authorization');

    if (!token) {
        return res.status(401).json({ code: 'UE' , message: 'Autenticación fallida'});
    }

    token = token.includes('Bearer') ? token.split(' ')[1] : token;

    try {
        const { username, password } = jwt.verify(token, SECRET_JWT_SEED);   
        console.log('JWT', { username, password });     
        if(username !== AUTH.username || password !== AUTH.password){
            return res.status(401).json({ code: 'UE' , message: 'Autenticación fallida'});
        }
    } catch (error) {
        return res.status(401).json({ code: 'UE' , message: 'Autenticación fallida'});
    }

    next();
}


module.exports = {
    validarJWT,
}
