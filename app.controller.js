const {
	selectTopics,
	articleId,
	articlesDescending,
	articleComments,
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

exports.sortedArticles = (req, res, next) => {
	articlesDescending()
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
