const express = require('express');
const app = express();
const { getApiEndpoints } = require('../app.controller');

app.get('/api', getApiEndpoints);

module.exports = app;
