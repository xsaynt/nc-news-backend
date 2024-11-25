const db = require('./app.model');
const endpointsJson = require('./endpoints.json');

exports.getApiEndpoints = (req, res) => {
	res.status(200).send({ endpoints: endpointsJson });
};
