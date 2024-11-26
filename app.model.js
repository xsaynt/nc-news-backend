const db = require('./db/connection');

exports.selectTopics = () => {
	return db.query('SELECT * FROM topics;').then((result) => {
		return result.rows;
	});
};

exports.articleId = (article_id) => {
	return db
		.query('SELECT * FROM articles WHERE article_id = $1;', [article_id])
		.then(({ rows }) => {
			if (rows.length === 0) {
				return Promise.reject({ status: 404, msg: 'article does not exist' });
			}
			return rows[0];
		});
};

exports.articlesDescending = () => {
	return db
		.query(
			`SELECT articles.article_id, articles.title, articles.topic, articles.author, articles.created_at, articles.votes, COALESCE(COUNT(comments.comment_id),0) AS comment_count, articles.article_img_url FROM articles LEFT JOIN comments ON articles.article_id = comments.article_id GROUP BY articles.article_id ORDER BY created_at DESC;`
		)
		.then(({ rows }) => {
			rows.forEach((article) => {
				article.comment_count = Number(article.comment_count);
			});
			return rows;
		});
};

exports.articleComments = (article_id) => {
	return db
		.query(
			`SELECT * FROM comments WHERE comments.article_id = $1 ORDER BY created_at DESC;`,
			[article_id]
		)
		.then(({ rows }) => {
			if (rows.length === 0) {
				return Promise.reject({ status: 404, msg: 'article does not exist' });
			}
			return rows;
		});
};
