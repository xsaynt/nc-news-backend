const express = require('express');
const app = express();
const { getApiEndpoints, getAllTopics } = require('../app.controller');
const {
	postgresErrorHandler,
	customErrorHandler,
	serverErrorHandler,
} = require('../error');

app.use(express.json());

app.get('/api', getApiEndpoints);

app.get('/api/topics', getAllTopics);

app.all('/*', (req, res) => {
	res.status(404).send({ msg: 'Route Not Found' });
});

app.use(postgresErrorHandler);
app.use(customErrorHandler);
app.use(serverErrorHandler);

module.exports = app;
