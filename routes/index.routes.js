const routes = require('express').Router();
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const { configSwagger } = require('../swagger/config');
const { verifyToken } = require('../helpers/token');

const swaggerDocs = swaggerJsDoc(configSwagger);

routes.get('/', (req, res) => res.send('BOOK API'));

routes.use('/book', verifyToken, require('./book.routes'));

routes.use('/user', require('./user.routes'));

routes.use('/match', verifyToken, require('./userbooks.routes'));

routes.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

module.exports = routes;
