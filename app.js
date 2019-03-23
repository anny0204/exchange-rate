const express = require('express');
const app = express();

const currencyRoutes = require('./api/routes/currencies')

app.use('/currencies', currencyRoutes);

module.exports = app;