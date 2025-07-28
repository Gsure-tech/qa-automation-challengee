describe("Login Page", () => {
  beforeEach(() => {
    cy.visit("/login");
    cy.log("Navigated to /login page");
  });

  it("should login successfully with valid credentials", () => {
    cy.log("Typing valid username and password");
    cy.get('input[placeholder="Username"]').type("admin");
    cy.get('input[placeholder="Password"]').type("P@zzword");

    cy.log("Clicking Login button");
    cy.get("button").contains("Login").click();
    cy.wait(500);

    cy.log("Asserting successful login and redirection to dashboard");
    cy.url().should("include", "/tasks");
    cy.contains("Task Manager");
  });

  it("should show error for wrong username and password", () => {
    cy.log("Typing incorrect username and password");
    cy.get('input[placeholder="Username"]').type("admin123");
    cy.get('input[placeholder="Password"]').type("wrongpass");

    cy.log("Attempting login with invalid credentials");
    cy.get("button").contains("Login").click();
    cy.wait(500);
    cy.get(".text-lg").contains("Login Failed");
    cy.get(".fixed").should("contain.text", "Invalid credentials");
    cy.get("button").contains("Close").click();
  });

  it("should show error for correct username and wrong password", () => {
    cy.log("Typing correct username and wrong password");
    cy.get('input[placeholder="Username"]').type("admin");
    cy.get('input[placeholder="Password"]').type("wrongpass");

    cy.log("Submitting login form");
    cy.get("button").contains("Login").click();
    cy.wait(500);
    cy.get(".text-lg").contains("Login Failed");
    cy.get(".fixed").should("contain.text", "Invalid credentials");
    cy.get("button").contains("Close").click();
  });

  it("should show error for wrong username and correct password", () => {
    cy.log("Typing wrong username and correct password");
    cy.get('input[placeholder="Username"]').type("admin123");
    cy.get('input[placeholder="Password"]').type("P@zzword");

    cy.log("Attempting to login");
    cy.get("button").contains("Login").click();
    cy.wait(500);

    cy.get(".text-lg").contains("Login Failed");
    cy.get(".fixed").should("contain.text", "Invalid credentials");
    cy.get("button").contains("Close").click();
  });

  it("should not allow login with empty fields", () => {
    cy.log("Clicking login without filling any input");
    cy.get("button").contains("Login").click();
    cy.wait(300);

    cy.get(".fixed").should(
      "contain.text",
      "Username and Password are required"
    );
    cy.get("button").contains("Close").click();
  });

  it("should not allow login with only username", () => {
    cy.log("Typing only username");
    cy.get('input[placeholder="Username"]').type("admin");

    cy.log("Attempting to submit form without password");
    cy.get("button").contains("Login").click();
    cy.wait(300);

    cy.get(".text-lg").contains("Login Failed");
    cy.get(".fixed").should("contain.text", "Password is required");
    cy.get("button").contains("Close").click();
  });

  it("should not allow login with only password", () => {
    cy.log("Typing only password");
    cy.get('input[placeholder="Password"]').type("P@zzword");

    cy.log("Attempting to submit form without username");
    cy.get("button").contains("Login").click();
    cy.wait(300);

    cy.get(".text-lg").contains("Login Failed");
    cy.get(".fixed").should("contain.text", "Username is required");
    cy.get("button").contains("Close").click();
  });

  it("should not allow login with whitespace only input", () => {
    cy.log("Typing whitespace-only values in both fields");
    cy.get('input[placeholder="Username"]').type("     ");
    cy.get('input[placeholder="Password"]').type("     ");

    cy.log("Submitting login with invalid whitespace input");
    cy.get("button").contains("Login").click();
    cy.wait(300);

    cy.get(".text-lg").contains("Login Failed");
    cy.get(".fixed").should(
      "contain.text",
      "Username and Password are required"
    );
    cy.get("button").contains("Close").click();
  });
});
