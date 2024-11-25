const {} = require('./app.model');
const endpointsJson = require('./endpoints.json');

exports.getApiEndpoints = (req, res) => {
	res.status(200).send({ endpoints: endpointsJson });
};

exports.getAllTopics = (req, res) => {
	const topics = endpointsJson['GET /api/topics'].exampleResponse.topics;

	res.status(200).send({ topics });
};
