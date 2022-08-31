import React, { useState } from 'react';

const BlogForm = ({ createBlog }) => {
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [url, setUrl] = useState('');
    
    const handleTitleChange = (e) => {
        setTitle(e.target.value);
    }
    
    const handleAuthorChange = (e) => {
        setAuthor(e.target.value);
    }
    
    const handleUrlChange = (e) => {
        setUrl(e.target.value);
    }

    const addBlog = (e) => {
        e.preventDefault();
        createBlog({
            title,
            author,
            url
        });
        setTitle('');
        setAuthor('');
        setUrl('');
    }

    return (
        <div>            
            <form
                onSubmit={addBlog}
            >
                <h1>create new</h1>
                <div>
                    Title:
                    <input
                        value={title}
                        onChange={handleTitleChange}
                    />
                </div>
                <div>
                    Author:
                    <input
                        value={author}
                        onChange={handleAuthorChange}
                    />
                </div>
                <div>
                    Url:
                    <input
                        value={url}
                        onChange={handleUrlChange}
                    />
                </div>
                <div>
                    <button
                        type="submit"
                    >create
                    </button>
                </div>
            </form>
        </div>
    );
}

export default BlogForm;