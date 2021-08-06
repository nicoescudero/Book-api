const { Router } = require('express');
const route = Router();
const { User } = require('../configuration/database');


route.get('/', async (req, res) => {
    const usuario = await User.findAll()
    console.log(usuario);
    res.json(usuario);
});

route.post('/', (req, res) => {
    const newUser = User.create(req.body);
    res.json(newUser);
})
module.exports = route;