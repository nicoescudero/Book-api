const route = require('express').Router();
const { User } = require('../configuration/database');
const bcrypt = require('bcryptjs');
const { check, validationResult } = require('express-validator');
const jwt = require('jwt-simple');
const moment = require('moment');

/**
 * components:
 *   schemas:
 *      User:
 *          type: object
 *          properties:
 *              id:
 *                type: integer
 *                description: id generated automatically
 *              username:
 *                type: string
 *                description: nickname of user
 *              email:
 *                type: string
 *                description: email of user
 *              password:
 *                type:string
 *                description: password of user
 *          example:
 *              id: 1
 *              userName: frank48
 *              email: frankCastle1990@example.com
 *              password: $2a$10$YoIyUHeciH67iIf/lewjXOHVmOSAEMbywYSOYMM2nrxbqMEWCUf2C
 */

/**
 * @swagger
 * /user/:
 *  get:
 *      summary: Return a user list
 *      responses:
 *          200:
 *              description: user list
 *              content:
 *                  application/json
 *              
 * */
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

route.post('/login', async (req, res) => {
    const user = await User.findOne({ where: { email: req.body.email } })
    if (user) {
        const descrypted = bcrypt.compareSync(req.body.password, user.password);
        if (descrypted)
            res.json({ token: generateToken(user) });
        else
            res.json({ error: 'The password entered is not valid' })
    } else
        res.json({ error: 'The e-mail entered is not valid' })
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