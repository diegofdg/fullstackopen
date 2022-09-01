describe('Note app', function() {
	beforeEach(function() {
		cy.request('POST', 'http://localhost:3001/api/testing/reset');
		const user = {
			name: 'Superuser Notes',
			username: 'root',
			password: 'root'
		};
		cy.request('POST', 'http://localhost:3001/api/users/', user);
		cy.visit('http://localhost:3000');
	});

	it('front page can be opened', function() {
		cy.visit('http://localhost:3000');
		cy.contains('Notes');
		cy.contains('Note app, Department of Computer Science, University of Helsinki 2022');
	});

	it('login form can be opened', function() {
		cy.contains('log in').click();
	});

	it('user can log in', function() {
		cy.contains('log in').click();
		cy.get('#username').type('root');
		cy.get('#password').type('root');
		cy.get('#login-button').click();
		cy.contains('Superuser Notes logged-in');
	});

	describe('when logged in', function() {
		beforeEach(function() {
			cy.contains('log in').click();
			cy.get('#username').type('root');
			cy.get('#password').type('root');
			cy.get('#login-button').click();
		});

		it('a new note can be created', function() {
			cy.contains('new note').click();
			cy.get('#textNote').type('a note created by cypress');
			cy.contains('save').click();
			cy.contains('a note created by cypress');
		});
	});
});