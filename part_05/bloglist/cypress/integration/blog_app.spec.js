describe('Blog app', function() {
	beforeEach(function() {
		cy.request('POST', 'http://localhost:3001/api/testing/reset');
		const user = {
			name: 'Superuser Blog',
			username: 'root',
			password: 'root'
		};
		cy.request('POST', 'http://localhost:3001/api/users/', user);
		cy.visit('http://localhost:3000');
	});

	it('Login form is shown', function() {
		cy.contains('username');
		cy.contains('password');
		cy.contains('log in');
	});

	describe('Login',function() {
		it('succeeds with correct credentials', function() {
			cy.contains('log in').click();
			cy.get('#username').type('root');
			cy.get('#password').type('root');
			cy.get('#login-button').click();
			cy.contains('Superuser Blog logged-in');
		});

		it('login fails with wrong password', function() {
			cy.contains('log in').click();
			cy.get('#username').type('root');
			cy.get('#password').type('wrong');
			cy.get('#login-button').click();

			cy.get('.error')
				.should('contain', 'wrong username or password')
				.and('have.css', 'color', 'rgb(255, 0, 0)')
				.and('have.css', 'border-bottom-style', 'solid');
			cy.get('html').should('not.contain', 'Superuser Blog logged-in');
		});
	});

	describe('when logged in', function() {
		beforeEach(function() {
			cy.login({ username: 'root', password: 'root' });
		});

		it('a new blog can be created', function() {
			cy.contains('create new blog').click();
			cy.createBlog({ title: 'React patterns', author: 'Michael Chan', url: 'https://reactpatterns.com/', likes: 0, });
			cy.contains('React patterns - Michael Chan');
		});

		it('user can like a blog', function() {
			cy.contains('create new blog').click();
			cy.createBlog({ title: 'React patterns', author: 'Michael Chan', url: 'https://reactpatterns.com/', likes: 0, });
			cy.contains('React patterns - Michael Chan');
			cy.contains('view').click();
			cy.contains('0');
			cy.get('#like-button').click();
			cy.contains('1');
		});

		it('user who created a blog can delete it', function() {
			cy.contains('create new blog').click();
			cy.createBlog({ title: 'React patterns', author: 'Michael Chan', url: 'https://reactpatterns.com/', likes: 0, });
			cy.contains('React patterns - Michael Chan');
			cy.contains('view').click();
			cy.deleteBlog();
			cy.get('html').should('not.contain', 'React patterns - Michael Chan');
		});
	});

	describe('and multiple blogs exist', function () {
		beforeEach(function () {
			cy.login({ username: 'root', password: 'root' });
			cy.createBlog({
				title: 'Blog from Cypress - number 1',
				author: 'Cypress author',
				url: 'http://cypresstestingblogapp.com',
				likes: 0,
			})
				.then(() =>
					cy.createBlog({
						title: 'Blog from Cypress - number 2',
						author: 'Cypress author',
						url: 'http://cypresstestingblogapp.com',
						likes: 1,
					})
				)
				.then(() =>
					cy.createBlog({
						title: 'Blog from Cypress - number 3',
						author: 'Cypress author',
						url: 'http://cypresstestingblogapp.com',
						likes: 2,
					})
				);
		});

		it('blogs are ordered by number of likes', function () {
			cy.get('.blog>div>p.blog-title').then((blogs) => {
				expect(blogs[0].textContent).to.contains('Blog from Cypress - number 3');
				expect(blogs[1].textContent).to.contains('Blog from Cypress - number 2');
				expect(blogs[2].textContent).to.contains('Blog from Cypress - number 1');
			});
		});
	});
});