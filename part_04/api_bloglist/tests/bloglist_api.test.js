const mongoose = require('mongoose');
///const bcrypt = require('bcrypt');
const supertest = require('supertest');
const helper = require('./test_helper');
const app = require('../app');

const api = supertest(app);

const Blog = require('../models/Blog');
const User = require('../models/User');

let headers;
let idUser1;

describe('users test', () => {    
    jest.setTimeout(10000);

    beforeEach(async () => {
        await User.deleteMany({});
        const newUser = {
            username: 'root',
            name: 'Superuser',
            password: 'root'
        };
        await api
            .post('/api/users')
            .send(newUser);
    });

    test('register an user', async () => {
        const newUser = {
            username: 'test',
            name: 'Test User',
            password: 'test'
        };
        const result = await api
            .post('/api/users')
            .send(newUser);
        idUser1 = result.body.id;
        expect(result.statusCode).toEqual(201);
		    expect(result.body).toHaveProperty('savedUser');
	  });

    test('login root user', async () => {
        const newUser = {
            username: 'root',
            password: 'root'
        };
        const result = await api
            .post('/api/login')
            .send(newUser);
        headers = {
            'Authorization': `bearer ${result.body.token}`
        };
        expect(result.statusCode).toEqual(200);
        expect(result.body).toHaveProperty('token');
    });

    test('error when registering same user', async () => {
        const newUser = {
            username: 'root',
            name: 'Superuser',
            password: 'root'
        };
        const result = await api
            .post('/api/users')
            .send(newUser);
        expect(result.statusCode).toEqual(400);
        expect(result.body).toHaveProperty('error');
    });

    test('error when username is shorter than the minimum allowed', async () => {        
        const newUser = {
            username: 'ro',
            name: 'Superuser',
            password: 'root',
        }

        const result = await api
            .post('/api/users')
            .send(newUser)
        expect(result.statusCode).toEqual(400)
        expect(result.body).toHaveProperty('error');
        expect(result.body.error).toContain('is shorter than the minimum allowed length (3)');
    })

    test('error when password is shorter than the minimum allowed', async () => {
        const newUser = {
            username: 'newUser',
            name: 'Shorter',
            password: 'ro'
        };
        const result = await api
            .post('/api/users')
            .send(newUser);
        expect(result.statusCode).toEqual(400);
        expect(result.body).toHaveProperty('error');
        expect(result.body.error).toContain('is shorter than the minimum allowed length (3)');
    });
});

describe('get blog information', () => {  
    jest.setTimeout(10000);

    beforeEach(async () => {
        await User.deleteMany({});
        const newUser = {
            username: 'root',
            name: 'Superuser',
            password: 'root'
        };
        await api
            .post('/api/users')
            .send(newUser);

        await Blog.deleteMany({});
        const blogObjects = helper.initialBlogs.map(blog => new Blog(blog));
        const promiseArray = blogObjects.map(blog => blog.save());
        await Promise.all(promiseArray);
    });

    test('blogs are returned as json', async () => {
        await api
            .get('/api/blogs')
            .expect(200)
            .expect('Content-Type', /application\/json/);
    });
    
    test('there are two blogs', async () => {
        const response = await api
            .get('/api/blogs');	
        expect(response.body).toHaveLength(helper.initialBlogs.length);
    });

    test('the first blog is about React patterns', async () => {
        const response = await api
            .get('/api/blogs');	
        const contents = response.body.map(r => r.title);
        expect(contents).toContain('React patterns');
    });

    test('the unique identifier property of the blog posts is by default _id', async () => {
        const blogs = await Blog.find({})
        expect(blogs[0]._id).toBeDefined()
    });
});

describe('addition of a new blog', () => {
    jest.setTimeout(10000);

    beforeEach(async () => {
        await User.deleteMany({});
        const newUser = {
            username: 'root',
            name: 'Superuser',
            password: 'root'
        };
        const createUser = await api
            .post('/api/users')
            .send(newUser);
        idUser1 = createUser.body.id;     
        
        const loginUser = await api
            .post('/api/login')
            .send(newUser);
        headers = {
            'Authorization': `bearer ${loginUser.body.token}`
        };

        await Blog.deleteMany({});
        const blogObjects = helper.initialBlogs.map(blog => new Blog(blog));
        const promiseArray = blogObjects.map(blog => blog.save());
        await Promise.all(promiseArray);
    });
	
    test('a valid blog can be added ', async () => {
        const newBlog = {
            title:'Canonical string reduction',
            author:'Edsger W. Dijkstra',
            url:'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
            likes:12,
            user: idUser1
        };

        await api
            .post('/api/blogs')
            .set(headers)
            .send(newBlog)
            .expect(201)
            .expect('Content-Type', /application\/json/);

        const blogsAtEnd = await helper.blogsInDb();
        expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1);

        const contents = blogsAtEnd.map(n => n.title);
        expect(contents).toContain('Canonical string reduction');
    });

    test('if likes property is missing, it will default to 0 ', async () => {
        const newBlog = {
            title: 'First class tests',
            author: 'Robert C. Martin',
            url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
            user: idUser1
        };
    
      await api
          .post('/api/blogs')
          .set(headers)
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
            likes: 12,
            idUser1
        };
	
      await api
          .post('/api/blogs')
          .set(headers)
          .send(newBlog)		
          .expect(400);
    
	  	const blogsAtEnd = await helper.blogsInDb();
	
		  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length);
	  });	
});

afterAll(() => {
	mongoose.connection.close();
});