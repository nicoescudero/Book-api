const express = require('express');
const morgan = require('morgan');

const app = express();

require('dotenv').config();

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// routes
app.use('/', require('./routes/index.routes'));

module.exports = app;
