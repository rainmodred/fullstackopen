describe('Blog app', () => {
  beforeEach(() => {
    cy.request('POST', 'http://localhost:3001/api/testing/reset');
    cy.create();
    cy.login();
    cy.visit('http://localhost:3000');
  });
  it('front page can be opened', () => {
    cy.contains('blogs');
  });
  it('can create new blog', () => {
    cy.contains('new blog').click();
    cy.get('input[name=title]').type('new blog');
    cy.get('input[name=author]').type('test');
    cy.get('input[name=url]').type('test.com');
    cy.contains('create').click();
    cy.contains('added');
  });
});
