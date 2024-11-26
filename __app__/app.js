const express = require('express');
const app = express();
const {
	getApiEndpoints,
	getAllTopics,
	getArticlebyId,
	sortedArticles,
	getMatchingComments,
	postNewComment,
} = require('../app.controller');
const {
	postgresErrorHandler,
	customErrorHandler,
	serverErrorHandler,
} = require('../error');

app.use(express.json());

app.get('/api', getApiEndpoints);

app.get('/api/topics', getAllTopics);

app.get('/api/articles/:article_id', getArticlebyId);

app.get('/api/articles', sortedArticles);

app.get('/api/articles/:article_id/comments', getMatchingComments);

app.post('/api/articles/:article_id/comments', postNewComment);

app.all('/*', (req, res) => {
	res.status(404).send({ msg: 'Route Not Found' });
});

app.use(postgresErrorHandler);
app.use(customErrorHandler);
app.use(serverErrorHandler);

module.exports = app;
