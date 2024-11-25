const { selectTopics } = require('./app.model');
const endpointsJson = require('./endpoints.json');

exports.getApiEndpoints = (req, res) => {
	res.status(200).send({ endpoints: endpointsJson });
};

exports.getAllTopics = (req, res) => {
	selectTopics().then((topic) => {
		res.status(200).send({ topic });
	});
};
