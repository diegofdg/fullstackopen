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
			cy.createBlog({ title: 'React patterns', author: 'Michael Chan', url: 'https://reactpatterns.com/' });
			cy.contains('React patterns - Michael Chan');
		});
	});
});