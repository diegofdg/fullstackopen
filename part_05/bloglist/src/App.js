import React, { useState, useEffect } from 'react';
import './App.css';
import Blog from './components/Blog';
import blogService from './services/blogs';
import loginService from './services/login';
import Notification from './components/Notification';
import BlogForm from './components/BlogForm';

const App = () => {
    const [blogs, setBlogs] = useState([]);
    const [successMessage, setSuccessMessage] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [user, setUser] = useState(null);
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [url, setUrl] = useState('');

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
        setBlogs(blogs);
    }

    const handleLogin = async(e) => {
        e.preventDefault();
        try {
            const user = await loginService.login({
                username, password
            });
            window.localStorage.setItem(
                'loggedBlogappUser', JSON.stringify(user)
            );
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
    }

    const handleLogout = async (e) => {
        e.preventDefault();
        window.localStorage.removeItem('loggedBlogappUser');
        setUser(null);
    }

    const handleTitleChange = (e) => {
        setTitle(e.target.value);
    }
    
    const handleAuthorChange = (e) => {
        setAuthor(e.target.value);
    }
    
    const handleUrlChange = (e) => {
        setUrl(e.target.value);
    }

    const addBlog = async (e) => {
        e.preventDefault();
        const BlogToAdd = {
            title,
            author,
            url
        }
    
        try {
            await blogService.create(BlogToAdd);
            setTitle('');
            setAuthor('');
            setUrl('');
            setSuccessMessage(`a new blog ${BlogToAdd.title} by ${BlogToAdd.author} added`);           
            setErrorMessage(null);
            getAllBlogs();
            setTimeout(() => {
                setSuccessMessage(null);
            }, 5000);
        } catch(error) {
            setErrorMessage(`cannot add blog ${BlogToAdd.title} by ${BlogToAdd.author}`);
            setTimeout(() => {                
                setErrorMessage(null);
            }, 5000);
        }
    }

    if (user === null) {
        return (
            <div>
                <h2>Log in to application</h2>
                <Notification
                    errorMessage={errorMessage}
                    successMessage={successMessage}
                />
                <form 
                    onSubmit={handleLogin}
                >
                    <div>username
                        <input
                            type="text"
                            value={username}
                            name="Username"
                            onChange={({ target }) => setUsername(target.value)}
                        />
                    </div>
                    <div>password
                        <input
                            type="password"
                            value={password}
                            name="Password"
                            onChange={({ target }) => setPassword(target.value)}
                        />
                    </div>
                    <button
                        type="submit"
                    >login
                    </button>
                </form>
            </div>
        );
    }                                         

    return (
        <div>
            <h2>Add new blog</h2>
            <Notification
                errorMessage={errorMessage}
                successMessage={successMessage}
            />
            <p>
                {user.name} logged-in
                    <button
                        onClick={handleLogout}
                        type="submit"
                    >logout
                    </button>            
            </p>
            <BlogForm
                onSubmit={addBlog}
                title={title}
                handleTitleChange={handleTitleChange}
                author={author}
                handleAuthorChange={handleAuthorChange}
                url={url}
                handleUrlChange={handleUrlChange}
            />
            <ul>
                {blogs.map(blog =>
                    <Blog
                        key={blog.id}
                        blog={blog}
                    />
                )}
            </ul>
        </div>
    )
}

export default App;