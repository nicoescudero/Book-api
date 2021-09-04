const route = require('express').Router();
const { User } = require('../configuration/database');
const bcrypt = require('bcryptjs');
const { check, validationResult } = require('express-validator');
const jwt = require('jwt-simple');
const moment = require('moment');
const middleware = require('../router/middleware');

route.get('/', async (req, res) => {
    const usuarios = await User.findAll();
    (usuarios) ?
        res.json(usuarios) :
        res.status(404).json({ message: "Users not found, or doesn't exist" })
});

route.get('/:userId', async (req, res) => {
    const usuario = await User.findOne({ where: { id: req.params.userId } });
    (usuario) ?
        res.json(usuario) :
        res.status(404).json({ message: 'User not found' })
})

route.post('/', [
    check('userName', ' You userName is required').notEmpty(),
    check('email', 'Email address is required').isEmail(),
    check('password', 'Password is required').notEmpty(),
    check('password', 'Minimum number of characters: 5').isLength({ min: 5 })
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() })
    }

    if (Object.keys(req.body).length < 4) {
        req.body.password = await bcrypt.hashSync(req.body.password, 10);
        User.create(req.body);
        res.status(201).json({ message: 'User Created' });
    } else
        res.status(400).json({ message: 'Error, Invalid Request' })
})

route.post('/login', [
    check('email', 'Email address is required').isEmail(),
    check('password', 'Password is required').notEmpty(),
    check('password', 'Minimun number of characteres: 5').isLength({ min: 5 })
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() })
    }
    if (Object.keys(req.body).length < 3) {
        const user = await User.findOne({ where: { email: req.body.email } })
        if (user) {
            const descrypted = bcrypt.compareSync(req.body.password, user.password);
            if (descrypted)
                res.status(201).json({ token: generateToken(user) });
            else
                res.status(400).json({ error: 'The password entered is not valid' })
        } else
            res.status(404).json({ message: 'User not found' })
    }
    else
        res.status(400).json({ message: 'Error, Invalid Request' });
})

route.put('/:userId',middleware.checkToken ,[
    check('userName', ' You userName is required').notEmpty(),
    check('email', 'Email address is required').isEmail(),
    check('password', 'Password is required').notEmpty(),
    check('password', 'Minimun number of characteres: 5').isLength({ min: 5 })
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() })
    }
    if (Object.keys(req.body).length < 4) {
        const usuario = await User.findOne({ where: { id: req.params.userId } })
        if (usuario) {
            req.body.password = await bcrypt.hashSync(req.body.password, 10);
            usuario.update(req.body);
            res.status(201).json({ Succes: 'User Updated' });
        }
        else
            res.status(404).json({ message: 'User not found' });
    }
    else
        res.status(400).json({ message: 'Error, Invalid Form' });
})

route.delete('/:userId',middleware.checkToken, async (req, res) => {
    const usuario = await User.findOne({ where: { id: req.params.userId } })
    if (usuario) {
        usuario.destroy();
        res.json({ Succes: 'User Deleted' });
    } else
        res.status(404).json({ message: 'User not found' });
})

//token
const generateToken = (user) => {
    const data = {
        userID: user.id,
        createdAt: moment().unix(),
        expiredAt: moment().add(5, 'minutes').unix()
    }
    return jwt.encode(data, process.env.KEY);
}

module.exports = route;