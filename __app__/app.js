const express = require('express');
const app = express();
const {
	getApiEndpoints,
	getAllTopics,
	getArticlebyId,
	getArticles,
	getMatchingComments,
	postNewComment,
	newVoteValue,
	removedComment,
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

app.get('/api/articles', getArticles);

app.get('/api/articles/:article_id/comments', getMatchingComments);

app.post('/api/articles/:article_id/comments', postNewComment);

app.patch('/api/articles/:article_id', newVoteValue);

app.delete('/api/comments/:comment_id', removedComment);

app.all('/*', (req, res) => {
	res.status(404).send({ msg: 'Route Not Found' });
});

app.use(postgresErrorHandler);
app.use(customErrorHandler);
app.use(serverErrorHandler);

module.exports = app;
