const {
	selectTopics,
	articleId,
	fetchArticles,
	articleComments,
	newArticleComment,
	updatedVotes,
	deleteComment,
	allUsers,
} = require('./app.model');
const endpointsJson = require('./endpoints.json');

exports.getApiEndpoints = (req, res, next) => {
	res.status(200).send({ endpoints: endpointsJson });
};

exports.getAllTopics = (req, res, next) => {
	selectTopics()
		.then((topic) => {
			res.status(200).send({ topic });
		})
		.catch(next);
};

exports.getArticlebyId = (req, res, next) => {
	const article_id = req.params.article_id;

	articleId(article_id)
		.then((article) => {
			res.status(200).send({ article });
		})
		.catch(next);
};

exports.getArticles = (req, res, next) => {
	const { sort_by = 'created_at', order = 'desc', topic } = req.query;

	fetchArticles(sort_by, order, topic)
		.then((articles) => {
			res.status(200).send({ articles });
		})
		.catch(next);
};

exports.getMatchingComments = (req, res, next) => {
	const article_id = req.params.article_id;
	articleComments(article_id)
		.then((article) => {
			res.status(200).send(article);
		})
		.catch(next);
};

exports.postNewComment = (req, res, next) => {
	const { article_id } = req.params;
	const { username, body } = req.body;

	if (!username || !body) {
		return res.status(400).send({ msg: `bad request` });
	}
	newArticleComment(article_id, { username, body })
		.then((newComment) => {
			res
				.status(201)
				.send({ username: newComment.author, body: newComment.body });
		})
		.catch(next);
};

exports.newVoteValue = (req, res, next) => {
	const { article_id } = req.params;
	const { inc_votes } = req.body;

	if (!article_id || !inc_votes) {
		return res.status(400).send({ msg: `bad request` });
	}
	updatedVotes({ inc_votes }, article_id)
		.then((newVotes) => {
			console.log(newVotes);
			res.status(200).send(newVotes);
		})
		.catch(next);
};

exports.removedComment = (req, res, next) => {
	const comment_id = req.params.comment_id;

	deleteComment(comment_id)
		.then((removedRow) => {
			if (removedRow === 0) {
				return res.status(404).send({ msg: 'Comment not found' });
			}
			return res.status(204).send();
		})
		.catch(next);
};

exports.getAllUsers = (req, res, next) => {
	allUsers()
		.then((allUsers) => {
			console.log(allUsers);
			res.status(200).send(allUsers);
		})
		.catch(next);
};
