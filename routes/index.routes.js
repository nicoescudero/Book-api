const routes = require('express').Router();
const { checkToken } = require('./middleware');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const { configSwagger } = require('../swagger/config');
const swaggerDocs = swaggerJsDoc(configSwagger);

routes.get('/',(req,res) => {return res.send('Hola')});
routes.use('/book', checkToken, require('./book.routes'));
routes.use('/user', require('./user.routes'));
//swagger documentation
routes.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

module.exports = routes;