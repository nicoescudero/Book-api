const { Router } = require('express');
const route = Router();
const { User } = require('../configuration/database');


route.get('/', async (req, res) => {
    const usuario = await User.findAll()
    const resultado = JSON.stringify(usuario);
    console.log(resultado);
});

module.exports = route;

/*



*/