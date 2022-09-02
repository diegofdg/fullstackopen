import React, { useState } from 'react';
import PropTypes from 'prop-types';

const BlogForm = ({ createBlog }) => {
	const [title, setTitle] = useState('');
	const [author, setAuthor] = useState('');
	const [url, setUrl] = useState('');

	const handleTitleChange = (e) => {
		setTitle(e.target.value);
	};

	const handleAuthorChange = (e) => {
		setAuthor(e.target.value);
	};

	const handleUrlChange = (e) => {
		setUrl(e.target.value);
	};

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
	};

	return (
		<div>
			<form
				onSubmit={addBlog}
			>
				<h1>create new</h1>
				<div>
                    Title:
					<input
						id='title'
						value={title}
						onChange={handleTitleChange}
					/>
				</div>
				<div>
                    Author:
					<input
						id='author'
						value={author}
						onChange={handleAuthorChange}
					/>
				</div>
				<div>
                    Url:
					<input
						id='url'
						value={url}
						onChange={handleUrlChange}
					/>
				</div>
				<div>
					<button
						id='create-button'
						type="submit"
					>create
					</button>
				</div>
			</form>
		</div>
	);
};

BlogForm.propTypes = {
	createBlog: PropTypes.func.isRequired
};

export default BlogForm;