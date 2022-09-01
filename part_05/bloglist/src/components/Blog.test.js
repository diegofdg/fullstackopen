import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';
import Blog from './Blog';

describe('Blog component tests', () => {
	let blog = {
		title:'React patterns',
		author:'Michael Chan',
		url:'https://reactpatterns.com/',
		likes:7
	};
	let mockUpdateBlog = jest.fn();
	let mockDeleteBlog = jest.fn();

	test('renders title and author', () => {
		const component = render(
			<Blog blog={blog} updateBlog={mockUpdateBlog} deleteBlog={mockDeleteBlog} />
		);
		expect(component.container).toHaveTextContent(
			'React patterns - Michael Chan'
		);
	});
});