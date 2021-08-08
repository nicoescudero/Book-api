const route = require('express').Router();
const { User } = require('../configuration/database');
const bcrypt = require('bcryptjs');
const { check, validationResult } = require('express-validator');

route.get('/', async (req, res) => {
    const usuario = await User.findAll()
    res.json(usuario);
});

route.get('/:userId', async (req, res) => {
    const u = await User.findOne({ where: { id: req.params.userId } });
    res.json({ Succes: u });
})

route.post('/', [
    check('userName', ' You userName is required').notEmpty(),
    check('email', 'Email address is required').isEmail(),
    check('password', 'Password is required').notEmpty(),
    check('password', '').isLength({ min: 5 })
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() })
    }

    req.body.password = await bcrypt.hashSync(req.body.password, 10);
    const newUser = User.create(req.body);
    res.json(newUser);
})

route.put('/:userId', async (req, res) => {
    await User.update(req.body, {
        where: { id: req.params.userId }
    })
    res.json({ Succes: 'Updated' });
})

route.delete('/:userId', async (req, res) => {
    await User.destroy({ where: { id: req.params.userId } });
    res.json({ Succes: 'deleted' });
})

module.exports = route;