const { selectTopics, articleId } = require('./app.model');
const endpointsJson = require('./endpoints.json');

exports.getApiEndpoints = (req, res, next) => {
	res.status(200).send({ endpoints: endpointsJson });
};

exports.getAllTopics = (req, res) => {
	selectTopics().then((topic) => {
		res.status(200).send({ topic });
	});
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
