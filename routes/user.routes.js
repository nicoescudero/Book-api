const routes = require('express').Router();
const middleware = require('./middleware');
const { get, getById, login, register, put, destroy } = require('../controllers/user.controller');

routes.get('/', get);
routes.get('/:userId', getById);
routes.post('/', register);
routes.post('/login', login);
routes.put('/:userId',middleware.checkToken, put);
routes.delete('/:userId',middleware.checkToken, destroy);

module.exports = routes;