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

test('a valid blog can be added ', async () => {
	const newBlog = {
		title: 'Canonical string reduction',
		author: 'Edsger W. Dijkstra',
		url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
		likes: 12
	};

	await api
		.post('/api/blogs')
		.send(newBlog)
		.expect(201)		
		.expect('Content-Type', /application\/json/);

	const blogsAtEnd = await helper.blogsInDb();
	expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1);

	const contents = blogsAtEnd.map(n => n.title);
	expect(contents).toContain(
		'Canonical string reduction'
	);
});

test('if likes property is missing, it will default to 0 ', async () => {
	const newBlog = {
		title: 'First class tests',
		author: 'Robert C. Martin',
		url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
	};

	await api
		.post('/api/blogs')
		.send(newBlog)		
		.expect(201)
		.expect('Content-Type', /application\/json/);

	const blogsAtEnd = await helper.blogsInDb();
	const addedBlog = await blogsAtEnd.find(blog => blog.title === 'First class tests');
	expect(addedBlog.likes).toBe(0);
});

test('if title and url are missing, respond with error 400 (bad request)', async () => {
	const newBlog = {
		author: 'Edsger W. Dijkstra',
		likes: 12
	};

	await api
		.post('/api/blogs')
		.send(newBlog)		
		.expect(400);

	const blogsAtEnd = await helper.blogsInDb();

	expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length);
});

afterAll(() => {
	mongoose.connection.close();
});