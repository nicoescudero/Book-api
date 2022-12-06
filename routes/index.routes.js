const routes = require('express').Router();
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const { configSwagger } = require('../swagger/config');

const swaggerDocs = swaggerJsDoc(configSwagger);

routes.get('/', (req, res) => res.send('Hola'));

routes.use('/book', require('./book.routes'));

routes.use('/user', require('./user.routes'));

routes.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

module.exports = routes;
