const routes = require('express').Router();
const { verifyToken } = require('../helpers/token');
const {
  getById, login, register, put, destroy,
} = require('../controllers/user.controller');

routes.get('/', verifyToken, getById);
routes.post('/register', register);
routes.post('/login', login);
routes.put('/', verifyToken, put);
routes.delete('/', verifyToken, destroy);

module.exports = routes;
