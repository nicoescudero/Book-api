const express = require('express');
const app = express();
const morgan = require('morgan');
const middleware = require('../router/middleware');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const { options } = require('../configuration/swaggerOptions');
require('dotenv').config();

//set configuration
app.set('port', process.env.PORT || 4000);
//middleware
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
//routes
app.use('/user', require('../router/userRoutes'));
app.use('/book', middleware.checkToken, require('../router/bookRoutes'));
//swagger configuration
const swaggerDocs = swaggerJsDoc(options);
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

module.exports = app;