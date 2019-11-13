describe('comment', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/blogs/5a422b3a1b54a676234d17f9');
  });

  it('can create comment', () => {
    cy.get('input').type('new comment');
    cy.contains('Add Reply').click();
    cy.contains('new comment');
  });
});
