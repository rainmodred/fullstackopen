describe('login', () => {
  before(() => {
    cy.request('POST', 'http://localhost:3001/api/testing/reset');
    cy.create();
  });
  beforeEach(() => {
    cy.visit('/login');
  });

  it('greets with Log in to application', () => {
    cy.contains('h2', 'Log in to application');
  });
  it('requires username', () => {
    cy.contains('login').click();
    cy.get('.message').should('contain', "username can't be blank");
  });
  it('requires password', () => {
    cy.get('input:first').type('test');
    cy.contains('login').click();
    cy.get('.message').should('contain', "password can't be blank");
  });
  it('requires valid username and password', function() {
    cy.get('input:first').type('test');
    cy.get('input:last').type('test2');
    cy.contains('login').click();
    cy.contains('invalid username or password');
  });
  it('user can login', function() {
    cy.get('input:first').type('test');
    cy.get('input:last').type('test');
    cy.contains('login').click();
    cy.contains('test logged in');
  });
});
