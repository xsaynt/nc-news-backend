const {
	selectTopics,
	articleId,
	fetchArticles,
	articleComments,
	newArticleComment,
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
		.catch((err) => {
			if (err.status) {
				res.status(err.status).send({ msg: err.msg });
			} else {
				next(err);
			}
		});
};

exports.getArticles = (req, res, next) => {
	fetchArticles()
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
		.catch((err) => {
			if (err.status) {
				res.status(err.status).send({ msg: err.msg });
			} else {
				next(err);
			}
		});
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
		.catch((err) => {
			if (err.status) {
				res.status(err.status).send({ msg: err.msg });
			} else {
				next(err);
			}
		});
};
