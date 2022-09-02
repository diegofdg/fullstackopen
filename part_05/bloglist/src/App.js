import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import Blog from './components/Blog';
import Notification from './components/Notification';
import BlogForm from './components/BlogForm';
import LoginForm from './components/LoginForm';
import Togglable from './components/Togglable';
import blogService from './services/blogs';
import loginService from './services/login';

const App = () => {
	const blogFormRef = useRef();
	const [blogs, setBlogs] = useState([]);
	const [successMessage, setSuccessMessage] = useState(null);
	const [errorMessage, setErrorMessage] = useState(null);
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [user, setUser] = useState(null);

	useEffect(() => {
		getAllBlogs();
	}, []);

	useEffect(() => {
		const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser');
		if (loggedUserJSON) {
			const user = JSON.parse(loggedUserJSON);
			setUser(user);
			blogService.setToken(user.token);
		}
	}, []);

	const getAllBlogs = async () => {
		const blogs = await blogService.getAll();
		blogs.sort((a, b) => (a.likes > b.likes) ? -1 : 1);
		setBlogs(blogs);
	};

	const handleLogin = async(e) => {
		e.preventDefault();
		try {
			const user = await loginService.login({ username, password });
			window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user));
			blogService.setToken(user.token);
			setUser(user);
			setUsername('');
			setPassword('');
		} catch (error) {
			setErrorMessage('wrong username or password');
			setTimeout(() => {
				setErrorMessage(null);
			}, 5000);
		}
	};

	const handleLogout = async (e) => {
		e.preventDefault();
		window.localStorage.removeItem('loggedBlogappUser');
		setUser(null);
	};

	const addBlog = async ( blogObject ) => {
		blogFormRef.current.toggleVisibility();

		try {
			await blogService.create(blogObject);
			setSuccessMessage(`a new blog ${blogObject.title} by ${blogObject.author} added`);
			setErrorMessage(null);
			getAllBlogs();
			setTimeout(() => {
				setSuccessMessage(null);
			}, 5000);
		} catch(error) {
			setErrorMessage(`cannot add blog ${blogObject.title} by ${blogObject.author}`);
			setTimeout(() => {
				setErrorMessage(null);
			}, 5000);
		}
	};

	const updateBlog = async (BlogToUpdate) => {
		try {
			const updatedBlog = await blogService.update(BlogToUpdate);
			setBlogs(blogs.map(blog => blog.id !== BlogToUpdate.id ? blog : updatedBlog));
			getAllBlogs();
		} catch(error) {
			setErrorMessage(`Cannot update blog ${BlogToUpdate.title}`);
			setTimeout(() => {
				setErrorMessage(null);
			}, 5000);
		}
	};

	const deleteBlog = async (BlogToDelete) => {
		try {
			if (window.confirm(`delete ${BlogToDelete.title} by ${BlogToDelete.author}?`)) {
				await blogService.remove(BlogToDelete.id);
				setSuccessMessage(`blog ${BlogToDelete.title} was successfully deleted`);
				setBlogs(blogs.filter(blog => blog.id !== BlogToDelete.id));
				setErrorMessage(null);
				setTimeout(() => {
					setSuccessMessage(null);
				}, 5000);
			}
		} catch(error) {
			setErrorMessage(`cannot delete blog ${BlogToDelete.title} by ${BlogToDelete.author}`);
			setTimeout(() => {
				setErrorMessage(null);
			}, 5000);
		}
	};

	const loginForm = () => (
		<Togglable
			buttonLabel="log in"
		>
			<LoginForm
				handleLogin={handleLogin}
				username={username}
				setUsername={setUsername}
				setPassword={setPassword}
				password={password}
			/>
		</Togglable>
	);

	const blogForm = () => (
		<Togglable
			buttonLabel="create new blog"
			ref={blogFormRef}
		>
			<BlogForm
				createBlog={addBlog}
			/>
		</Togglable>
	);

	return (
		<div>
			<h1>Blogs</h1>
			<Notification
				errorMessage={errorMessage}
				successMessage={successMessage}
			/>
			{user === null
				? loginForm()
				: <div>
					<p>
						{user.name} logged-in
						<button
							onClick={handleLogout}
							type="submit"
						>logout
						</button>
					</p>
					{blogForm()}
				</div>
			}
			<ul>
				{blogs.map(blog =>
					<Blog
						key={blog.id}
						blog={blog}
						updateBlog={updateBlog}
						deleteBlog={deleteBlog}
					/>
				)}
			</ul>
		</div>
	);
};

export default App;