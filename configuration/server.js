const express = require('express');
const app = express();
const morgan = require('morgan');
require('dotenv').config();
//set configuration
app.set('port', process.env.PORT || 4000);
//middleware
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
//routes
app.use('/user', require('../router/routes'));
app.get('/', (req, res) => res.send('Hola!'));
module.exports = app;