const db = require('./db/connection');

exports.selectTopics = () => {
	return db.query('SELECT * FROM topics;').then((result) => {
		return result.rows;
	});
};

exports.articleId = (article_id) => {
	return db
		.query(
			`SELECT articles.*, COALESCE(COUNT(comments.comment_id),0) AS comment_count 
			FROM articles 
			LEFT JOIN comments 
			ON articles.article_id = comments.article_id 
			WHERE articles.article_id = $1
			GROUP BY articles.article_id;`,
			[article_id]
		)
		.then(({ rows }) => {
			if (rows.length === 0) {
				return Promise.reject({ status: 404, msg: 'not found' });
			}
			rows.forEach((article) => {
				article.comment_count = Number(article.comment_count);
			});
			return rows[0];
		});
};

exports.fetchArticles = (sort_by, order, topic) => {
	const validColumns = ['title', 'topic', 'author', 'created_at', 'votes'];
	const validOrder = ['asc', 'desc'];

	let sortBy;
	if (validColumns.includes(sort_by)) {
		sortBy = sort_by;
	}

	let sortOrder;
	if (validOrder.includes(order)) {
		sortOrder = order;
	}

	let query = `SELECT articles.article_id, 
			        articles.title, 
					articles.topic, 
					articles.author, 
					articles.created_at, 
					articles.votes, 
					COALESCE(COUNT(comments.comment_id),0) AS comment_count, 
					articles.article_img_url 
			FROM articles 
			LEFT JOIN comments ON articles.article_id = comments.article_id`;

	let topicParam = [];

	if (topic) {
		query += ` WHERE articles.topic = $1 `;
		topicParam.push(topic);
	}
	query += ` GROUP BY articles.article_id 
			ORDER BY ${sortBy} ${sortOrder};`;
	return db.query(query, topicParam).then(({ rows }) => {
		rows.forEach((article) => {
			article.comment_count = Number(article.comment_count);
		});

		if (rows.length === 0) {
			const err = new Error('not found');
			err.status = 404;
			err.msg = 'not found';
			throw err;
		}
		return rows;
	});
};

exports.getArticleComments = (article_id) => {
	return db
		.query(
			`SELECT * FROM comments WHERE comments.article_id = $1 ORDER BY created_at DESC;`,
			[article_id]
		)
		.then(({ rows }) => {
			if (rows.length === 0) {
				return Promise.reject({ status: 404, msg: 'not found' });
			}
			return rows;
		});
};

exports.newArticleComment = (article_id, comment_data) => {
	const { username, body } = comment_data;

	if (!username || !body) {
		return Promise.reject({
			status: 400,
			msg: 'bad request',
		});
	}

	return db
		.query('SELECT * FROM users WHERE username = $1', [username])
		.then(({ rows }) => {
			if (rows.length === 0) {
				return db.query(
					'INSERT INTO users (username) VALUES ($1) RETURNING *',
					[username]
				);
			}
			return rows[0];
		})
		.then(() => {
			return db.query(
				`INSERT INTO comments (article_id, author, body)
			  VALUES ($1, $2, $3)
			  RETURNING *;`,
				[article_id, username, body]
			);
		})
		.then(({ rows }) => {
			return rows[0];
		});
};

exports.updatedVotes = (updatedVotes, article_id) => {
	const { inc_votes } = updatedVotes;

	return db
		.query(
			`UPDATE articles
							 SET votes = votes + $1
							 WHERE article_id = $2
							 AND (votes + $1) >= 0
							 RETURNING *;`,
			[inc_votes, article_id]
		)
		.then(({ rows }) => {
			if (rows.length === 0) {
				return Promise.reject({
					status: 404,
					msg: 'not found',
				});
			}
			return rows[0];
		});
};

exports.deleteComment = (comment_id) => {
	return db
		.query(`DELETE FROM comments WHERE comment_id = $1;`, [comment_id])
		.then(({ rowCount }) => {
			return rowCount;
		});
};

exports.allUsers = () => {
	return db.query(`SELECT * FROM users;`).then(({ rows }) => {
		if (rows.length === 0) {
			const err = new Error('not found');
			err.status = 404;
			err.msg = 'not found';
			throw err;
		}
		return rows;
	});
};
