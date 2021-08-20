const route = require('express').Router();
const { User } = require('../configuration/database');
const bcrypt = require('bcryptjs');
const { check, validationResult } = require('express-validator');
const jwt = require('jwt-simple');
const moment = require('moment');

/**
 * @swagger
 *  components:
 *      schemas:
 *          User: 
 *              type: object
 *              required:
 *                  - userName
 *                  - email
 *                  - password
 *              properties:
 *                  id:
 *                      type: integer
 *                      description: id generated automatically
 *                  userName:
 *                      type: string
 *                      description: nickname of user
 *                  email:
 *                      type: string
 *                      description: email of user
 *                  password:
 *                      type: string
 *                      description: password of user
 *              example:
 *                  id: 1
 *                  userName: User10
 *                  email: user@example.com
 *                  password: $2a$10$YoIyUHeciH67iIf/lewjXOHVmOSAEMbywYSOYMM2nrxbqMEWCUf2C
 *          UsernotFound:
 *              type: object
 *              properties:
 *                  message:
 *                      type: string
 *                      description: message for user not found
 *              example:
 *                  message: User not found
 *          UserRequirements:
 *                      type: object
 *                      properties:
 *                          userName:
 *                              type: string
 *                          email:
 *                              type: string
 *                          password:
 *                              type: string
 *                      example:
 *                          userName: user1
 *                          email: user@example.com
 *                          password: YourPassword
 *          InvalidRequest:
 *              type: object
 *              properties:
 *                  message:
 *                      type: string
 *                      description: request message invalid
 *              example:
 *                  message: Bad Request
 * 
 *      parameters:
 *          userId:
 *              in: path
 *              name: userId
 *              required: true
 *              description: id of user
 *              schema:
 *                  type: string
 */

/**
 * @swagger
 * tags:
 *  name: User
 *  description: User Data
 */

/**
 * @swagger
 * /user:
 *  get:
 *      summary: Return a user list
 *      tags: [User]
 *      responses:
 *          200:
 *              description: successful operation
 *              content:
 *                  application/json:             
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: "#components/schemas/User"
 *          404:
 *              description: There are no users loaded
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: "#components/schemas/UsernotFound"
 *
 */

route.get('/', async (req, res) => {
    const usuarios = await User.findAll();
    (usuarios) ?
        res.json(usuarios) :
        res.status(404).json({ message: "Users not found, or doesn't exist" })
});

/**
 * @swagger
 * /user/{userId}:
 *  get:
 *      summary: Get a user by id
 *      tags: [User]
 *      parameters:
 *          - $ref: "#components/parameters/userId"
 *      responses:
 *          200:
 *              description: User successfully found
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: "#components/schemas/User"
 *          404:
 *              description: User not found
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: "#components/schemas/UsernotFound"
 */

route.get('/:userId', async (req, res) => {
    const usuario = await User.findOne({ where: { id: req.params.userId } });
    (usuario) ?
        res.json(usuario) :
        res.status(404).json({ message: 'User not found' })
})

/**
 * @swagger
 * /user:
 *  post:
 *      summary: Adds new user
 *      tags: [User]
 *      requestBody: 
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: "#components/schemas/UserRequirements"
 *      responses: 
 *              201:
 *                  description: User Created
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: object
 *                              properties:
 *                                  message:
 *                                      type: string
 *                              example:
 *                                  message: User Created
 *              400:
 *                  description: message when some aspect of the request is invalid
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: "#components/schemas/InvalidRequest"
 *              422:
 *                  description: Unprocessable Entity
 */

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

/**
 * @swagger
 * /user/login:
 *  post:
 *      summary: login and token creation
 *      tags: [User]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          email:
 *                              type: string
 *                          password:
 *                              type: string
 *                      example:
 *                          email: user@example.com
 *                          password: YourPassword
 *      responses:
 *              201:
 *                  description: Succes login & token
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: object
 *                              properties: 
 *                                  token:
 *                                      type: string
 *                                      description: token generated
 *                              example:
 *                                  token: eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2V
 *              400:
 *                  description: message when some aspect of the request is invalid
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: "#components/schemas/InvalidRequest"
 *              404:
 *                  description: User not found
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: "#components/schemas/UsernotFound"
 */

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

/**
 * @swagger
 * /user/{userId}:
 *  put:
 *      summary: Update user by id 
 *      tags: [User]
 *      parameters:
 *          - $ref: "#components/parameters/userId"
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: "#components/schemas/UserRequirements"
 *      responses:
 *          201:
 *              description: Successfully updated
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              Succes:
 *                                  type: string
 *                                  description: message for user updated
 *                          example:
 *                              Succes: User Updated
 *          400:
 *              description: message when some aspect of the request is invalid
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: "#components/schemas/InvalidRequest"
 *          404:
 *              description: Not found
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: "#components/schemas/UsernotFound"
 *          422:
 *              description: Unprocessable Entity
 */

route.put('/:userId', [
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

/**
 * @swagger
 * /user/{userId}:
 *  delete:
 *      summary: Delete a user by id
 *      tags: [User]
 *      parameters:
 *          - $ref: "#components/parameters/userId"
 *      responses:
 *          200:
 *              description: User Deleted
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              Succes:
 *                                  type: string
 *                                  description: message for user deleted
 *                          example:
 *                              Succes: User Deleted
 *          404:
 *              description: Error deleting
 *              content:
 *                  application/json:
 *                      $ref: "#components/schemas/UsernotFound"
 */

route.delete('/:userId', async (req, res) => {
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