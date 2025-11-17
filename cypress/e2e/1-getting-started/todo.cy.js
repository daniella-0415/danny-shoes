describe("User Flow Tests", () => {
  
  const user = {
    name: "Test User",
    email: "testuser@example.com",
    password: "Password123!"
  };

  beforeEach(() => {
    cy.visit("/"); // homepage or landing page
  });

  // 1️⃣ Signup Test
 // it("Signup Test", () => {
   // cy.visit("/signup");
    //cy.get("input[name='name']").type(user.name);
   // cy.get("input[name='email']").type(user.email);
    //cy.get("input[name='password']").type(user.password);
    //cy.get("button[type='submit']").click();

    // Assertion for successful signup
    //cy.url().should("include", "/login"); // redirects to login
   // cy.screenshot("Signup_Test"); // screenshot
 // });

  // 2️⃣ Login Test
  i//t("Login Test", () => {
   // cy.visit("/signin");
   // cy.get("input[name='email']").type(user.email);
   // cy.get("input[name='password']").type(user.password);
   // cy.get("button[type='submit']").click();

    // Assertion for successful login
   // cy.url().should("not.include", "/signin");
   // cy.contains("Welcome").should("exist"); // adjust based on your app
   // cy.screenshot("Login_Test"); // screenshot
 // });

  // 3️⃣ Products & Add to Cart Test
  it("Products and Add to Cart Test", () => {
    cy.login(user.email, user.password); // custom command to login if available

    cy.visit("/products");
    cy.get(".product-card").first().as("firstProduct");

    cy.get("@firstProduct").find("button.add-to-cart").click();
    cy.contains("Item added to cart").should("exist"); // confirmation message

    cy.visit("/cart");
    cy.get(".cart-item").should("have.length", 1); // cart has 1 item
    cy.screenshot("Cart_Test"); // screenshot
  });
});
