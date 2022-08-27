const mongoose = require('mongoose');
const supertest = require('supertest');
const helper = require('./test_helper');
const app = require('../app');

const api = supertest(app);

const Blog = require('../models/Blog');

beforeEach(async () => {
	await Blog.deleteMany({});

	const blogObjects = helper.initialBlogs
		.map(blog => new Blog(blog));

	const promiseArray = blogObjects.map(blog => blog.save());
	await Promise.all(promiseArray);
});

test('blogs are returned as json', async () => {
	await api
		.get('/api/blogs')
		.expect(200)
		.expect('Content-Type', /application\/json/);
});

test('the unique identifier property of the blog posts is by default _id', async () => {
	const blogs = await Blog.find({});
	expect(blogs[0]._id).toBeDefined();
});

afterAll(() => {
	mongoose.connection.close();
});