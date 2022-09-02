const storageKey = 'loggedBlogappUser';
let id;

Cypress.Commands.add('login', ({ username, password }) => {
	cy
		.request('POST', 'http://localhost:3001/api/login', {
			username, password
		})
		.then(({ body }) => {
			localStorage.setItem('loggedBlogappUser', JSON.stringify(body));
			cy.visit('http://localhost:3000');
		});
});

Cypress.Commands.add('createBlog', ({ title, author, url }) => {
	cy.request({
		url: 'http://localhost:3001/api/blogs',
		method: 'POST',
		body: { title, author, url },
		headers: {
			'Authorization': `bearer ${JSON.parse(localStorage.getItem(storageKey)).token}`
		}
	}).then(({ body }) => {
		id = body.id;
	});

	cy.visit('http://localhost:3000');
});

Cypress.Commands.add('deleteBlog', () => {
	console.log(id);
	cy.request({
		url: `http://localhost:3001/api/blogs/${id}`,
		method: 'DELETE',
		headers: {
			'Authorization': `bearer ${JSON.parse(localStorage.getItem(storageKey)).token}`
		}
	});

	cy.visit('http://localhost:3000');
});