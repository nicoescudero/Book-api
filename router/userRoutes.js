const { Router } = require('express');
const route = Router();
const { User } = require('../configuration/database');


route.get('/', async (req, res) => {
    const usuario = await User.findAll()
    res.json(usuario);
});

route.get('/:userId', async (req, res) => {
    const u = await User.findOne({ where: { dni: req.params.userId } });
    res.json({ Succes: u });
})

route.post('/', (req, res) => {
    const newUser = User.create(req.body);
    res.json(newUser);
})

route.put('/:userId', async (req, res) => {
    await User.update(req.body, {
        where: { dni: req.params.userId }
    })
    res.json({ Succes: 'Updated' });
})

route.delete('/:userId', async (req, res) => {
    await User.destroy({ where: { dni: req.params.userId } });
    res.json({ Succes: 'deleted' });
})

module.exports = route;