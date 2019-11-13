// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })
Cypress.Commands.add('login', () => {
  const user = {
    name: 'test user',
    username: 'test',
    password: 'test',
  };
  cy.request('POST', 'http://localhost:3001/api/login/', user).then(resp => {
    console.log(resp.body);
    window.localStorage.setItem('loggedUser', JSON.stringify(resp.body));
  });
});

Cypress.Commands.add('create', () => {
  const user = {
    name: 'test user',
    username: 'test',
    password: 'test',
  };
  cy.request('POST', 'http://localhost:3001/api/users/', user);
});
