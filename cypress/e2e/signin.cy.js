/// <reference types="cypress" />

Cypress.on("uncaught:exception", () => false);

describe("Signin Test", () => {
  const user = {
    email: "testuser@example.com",
    password: "123456",
  };

  it("User can sign in successfully", () => {
    cy.visit("http://localhost:5173/signin");

    cy.get("input[name='email']").type(user.email);
    cy.get("input[name='password']").type(user.password);

    cy.get("button[type='submit']").first().click();

    cy.contains("Login successful!", { timeout: 10000 }).should("be.visible");
    cy.screenshot("Login_Test");
  });
});
