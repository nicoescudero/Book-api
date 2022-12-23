const routes = require('express').Router();
const { verifyToken } = require('../helpers/token');
const { validateSchema } = require('../middlewares/validator');
const { registerSchema, loginSchema, putSchema } = require('../schemas/user.schema');
const {
  getById, login, register, put, destroy,
} = require('../controllers/user.controller');

routes.get('/', verifyToken, getById);
routes.post('/register', validateSchema(registerSchema), register);
routes.post('/login', validateSchema(loginSchema), login);
routes.put('/', verifyToken, validateSchema(putSchema), put);
routes.delete('/', verifyToken, destroy);

module.exports = routes;
