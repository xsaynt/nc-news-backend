const endpointsJson = require('../endpoints.json');
const request = require('supertest');
const db = require('../db/seeds/seed');
const app = require('../__app__/app');
const data = require('../db/data/test-data');
const dbConnection = require('../db/connection');
/* Set up your test imports here */

/* Set up your beforeEach & afterAll functions here */

afterAll(() => {
	return dbConnection.end();
});

beforeEach(() => {
	return db(data);
});

describe('GET /api', () => {
	test('200: Responds with an object detailing the documentation for each endpoint', () => {
		return request(app)
			.get('/api')
			.expect(200)
			.then(({ body: { endpoints } }) => {
				expect(endpoints).toEqual(endpointsJson);
			});
	});
});

describe('GET /api/topics', () => {
	test('200: Responds with an array of objects with the properties slug and description', () => {
		return request(app)
			.get('/api/topics')
			.expect(200)
			.then(({ body: { topic } }) => {
				topic.forEach((topics) => {
					const keys = Object.keys(topics);
					expect(keys.length).toBe(2);

					expect(topics).toHaveProperty('slug', expect.any(String));
					expect(topics).toHaveProperty('description', expect.any(String));
				});
			});
	});
});

describe('GET /api/articles/:article_id', () => {
	test('200: Responds with an article of the chosen ID', () => {
		return request(app)
			.get('/api/articles/3')
			.expect(200)
			.then(({ body: { article } }) => {
				expect(article).toMatchObject({
					article_id: 3,
					title: 'Eight pug gifs that remind me of mitch',
					topic: 'mitch',
					author: 'icellusedkars',
					body: 'some gifs',
					created_at: '2020-11-03T09:12:00.000Z',
					article_img_url:
						'https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700',
				});
			});
	});
	test('400: Returns an invalid input message when provided anything but a number', () => {
		return request(app)
			.get('/api/articles/tester')
			.expect(400)
			.then(({ body }) => {
				expect(body.msg).toBe('Invalid input');
			});
	});
	test('404: Returns a message advising the article does not exist when passed a number that is not a current article', () => {
		return request(app)
			.get('/api/articles/9999')
			.expect(404)
			.then(({ body }) => {
				expect(body.msg).toBe('article does not exist');
			});
	});
});

describe('GET /api/articles', () => {
	test('200: Returns an array of all articles sorted in descending order without a body property', () => {
		return request(app)
			.get('/api/articles')
			.expect(200)
			.then(({ body: { articles } }) => {
				expect(articles).toHaveLength(13);
				articles.forEach((article) => {
					expect(article).toHaveProperty('article_id', expect.any(Number));
					expect(article).toHaveProperty('title', expect.any(String));
					expect(article).toHaveProperty('topic', expect.any(String));
					expect(article).toHaveProperty('author', expect.any(String));
					expect(article).toHaveProperty('created_at', expect.any(String));
					expect(article).toHaveProperty('votes', expect.any(Number));
					expect(article).toHaveProperty('comment_count', expect.any(Number));
					expect(article).toHaveProperty('article_img_url', expect.any(String));
				});
				expect(articles).toBeSortedBy('created_at', { descending: true });
			});
	});
	test('');
});
