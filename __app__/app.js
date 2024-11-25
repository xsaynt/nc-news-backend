const express = require('express');
const app = express();
const { getApiEndpoints, getAllTopics } = require('../app.controller');

app.use(express.json());

app.get('/api', getApiEndpoints);

app.get('/api/topics', getAllTopics);

app.all('/*', (req, res) => {
	res.status(404).send({ msg: 'Route Not Found' });
});

module.exports = app;
