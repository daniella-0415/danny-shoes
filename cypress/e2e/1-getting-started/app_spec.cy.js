/// <reference types="cypress" />

Cypress.on("uncaught:exception", () => false);

describe("User Flow Tests", () => {
  const user = {
    firstName: "Test",
    lastName: "User",
    email: "testuser@example.com",
    password: "123456",
  };

  it("Signup Test", () => {
    cy.visit("http://localhost:5173/signup");

    cy.get("input[name='firstName']").type(user.firstName);
    cy.get("input[name='lastName']").type(user.lastName);
    cy.get("input[name='email']").type(user.email);
    cy.get("input[name='password']").type(user.password);

    cy.get("button[type='submit']").first().click();

    // Wait for backend response
    cy.contains("Signup successful!", { timeout: 10000 }).should("be.visible");
    cy.screenshot("Signup_Test");
  });

  it("Signin Test", () => {
    cy.visit("http://localhost:5173/signin");

    cy.get("input[name='email']").type(user.email);
    cy.get("input[name='password']").type(user.password);

    cy.get("button[type='submit']").first().click();

    cy.contains("Login successful!", { timeout: 10000 }).should("be.visible");
    cy.screenshot("Login_Test");
  });

  it("Products and Add to Cart Test", () => {
    // Login first
    cy.visit("http://localhost:5173/signin");
    cy.get("input[name='email']").type(user.email);
    cy.get("input[name='password']").type(user.password);
    cy.get("button[type='submit']").first().click();

    // Go to Products page
    cy.visit("http://localhost:5173/products");

    // Wait for products to load
    cy.get(".product-item", { timeout: 10000 }).should("have.length.greaterThan", 0);

    cy.get(".product-item").first().as("firstProduct");

    cy.get("@firstProduct").find("h3").invoke("text").as("productName");

    cy.get("@firstProduct").contains("Add to Cart").click();

    cy.wait(500);

    cy.visit("http://localhost:5173/cart");

    cy.get("@productName").then((name) => {
      cy.get(".cart-page").should("contain.text", name);
    });

    cy.screenshot("AddToCart_Validated");
  });
});
