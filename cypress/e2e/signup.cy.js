/// <reference types="cypress" />

Cypress.on("uncaught:exception", () => false);

describe("Signup Test", () => {
  const user = {
    firstName: "Test",
    lastName: "User",
    email: "testuser@example.com",
    password: "123456",
  };

  it("User can sign up successfully", () => {
    cy.visit("http://localhost:5173/signup");

    cy.get("input[name='firstName']").type(user.firstName);
    cy.get("input[name='lastName']").type(user.lastName);
    cy.get("input[name='email']").type(user.email);
    cy.get("input[name='password']").type(user.password);

    cy.get("button[type='submit']").first().click();

    cy.contains("Signup successful!", { timeout: 10000 }).should("be.visible");
    cy.screenshot("Signup_Test");
  });
});
