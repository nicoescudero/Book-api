const express = require('express');
const app = express();
const morgan = require('morgan');

require('dotenv').config();

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//routes
app.use('/', require('./routes/index.routes'));

module.exports= app;