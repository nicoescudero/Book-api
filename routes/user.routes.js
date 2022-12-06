const routes = require('express').Router();
const { generateToken } = require('../helpers/token');
const {
  get, getById, login, register, put, destroy,
} = require('../controllers/user.controller');

routes.get('/', get);
routes.get('/:userId', generateToken, getById);
routes.post('/', register);
routes.post('/login', login);
routes.put('/:userId', generateToken, put);
routes.delete('/:userId', generateToken, destroy);

module.exports = routes;
