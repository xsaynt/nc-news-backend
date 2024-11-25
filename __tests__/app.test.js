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
			.then(({ body: { topics } }) => {
				expect(topics).toMatchObject([
					{ slug: expect.any(String), description: expect.any(String) },
				]);
			});
	});
});
