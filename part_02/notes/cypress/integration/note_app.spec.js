describe('Note app', function() {
	beforeEach(function() {
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
});