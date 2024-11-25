const db = require('./db/connection');

exports.selectTopics = () => {
	return db.query('SELECT * FROM topics').then((result) => {
		return result.rows;
	});
};

exports.articleId = (article_id) => {
	return db
		.query('SELECT * FROM articles WHERE article_id = $1;', [article_id])
		.then(({ rows }) => {
			if (rows.length === 0) {
				return Promise.reject({ status: 404, msg: 'article does not exist' });
			} else if (typeof rows[0].article_id !== 'number') {
				return Promise.reject({ status: 400, msg: 'Invalid input' });
			}
			return rows[0];
		});
};
