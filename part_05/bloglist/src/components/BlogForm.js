import React from 'react';

const BlogForm = ({ onSubmit, title, handleTitleChange, author, handleAuthorChange, url, handleUrlChange }) =>
    <form onSubmit={onSubmit}>
        <div>
            Title: <input value={title} onChange={handleTitleChange} />
        </div>
        <div>
            Author: <input value={author} onChange={handleAuthorChange} />
        </div>
        <div>
            Url: <input value={url} onChange={handleUrlChange} />
        </div>
        <div>
            <button type="submit">create</button>
        </div>
    </form>

export default BlogForm;