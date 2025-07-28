describe("Task Management", () => {
  beforeEach(() => {
    cy.log("Navigating to login and performing authentication");
    cy.visit("/login");
    cy.get('input[placeholder="Username"]').type("admin");
    cy.get('input[placeholder="Password"]').type("P@zzword");
    cy.get("button").contains("Login").click();
    cy.url().should("include", "/tasks");
  });

  it("should not create task with empty title and description", () => {
    cy.log("Submitting form with both fields empty");
    cy.get('input[placeholder="Title"]').clear();
    cy.get('input[placeholder="Description"]').clear();
    cy.get("button").contains("Add").click();
    cy.get(".text-red-600").should(
      "contain.text",
      "Both title and description are required."
    );
    cy.wait(500);
  });

  it("should not create task with whitespace-only input", () => {
    cy.log("Submitting form with whitespace-only title and description");
    cy.get('input[placeholder="Title"]').clear().type("     ");
    cy.get('input[placeholder="Description"]').clear().type("     ");
    cy.get("button").contains("Add").click();
    cy.get(".text-red-600").should(
      "contain.text",
      "Both title and description are required."
    );
    cy.wait(500);
  });

  it("should not create task with empty title only", () => {
    cy.log("Submitting form with empty title only");
    cy.get('input[placeholder="Title"]').clear();
    cy.get('input[placeholder="Description"]').clear().type("Only description");
    cy.get("button").contains("Add").click();
    cy.get(".text-red-600").should(
      "contain.text",
      "Both title and description are required."
    );
    cy.wait(500);
  });

  it("should not create task with empty description only", () => {
    cy.log("Submitting form with empty description only");
    cy.get('input[placeholder="Title"]').clear().type("Only Title");
    cy.get('input[placeholder="Description"]').clear();
    cy.get("button").contains("Add").click();
    cy.get(".text-red-600").should(
      "contain.text",
      "Both title and description are required."
    );
    cy.wait(500);
  });

  it("should create a new task", () => {
    cy.log("Creating a new task");
    cy.get('input[placeholder="Title"]').clear().type("My Cypress Task");
    cy.get('input[placeholder="Description"]')
      .clear()
      .type("This task was added via Cypress test");
    cy.get("button").contains("Add").click();
    cy.get(".fixed").should("contain.text", "Success");
    cy.wait(500);
    cy.get("button").contains("Close").click();
    cy.wait(300);

    cy.contains("My Cypress Task");
    cy.contains("This task was added via Cypress test");
  });

  it("should not update task with empty title and description", () => {
    cy.log("Attempting to update task with both fields empty");
    cy.get(".bg-yellow-400").contains("Edit").click();
    cy.get('input[placeholder="Title"]').clear();
    cy.get('input[placeholder="Description"]').clear();
    cy.get("button").contains("Update").click();
    cy.get(".text-red-600").should(
      "contain.text",
      "Both title and description are required."
    );
    cy.wait(500);
  });

  it("should not update task with empty title only", () => {
    cy.log("Attempting to update task with only title empty");
    cy.get(".bg-yellow-400").contains("Edit").click();
    cy.get('input[placeholder="Title"]').clear();
    cy.get('input[placeholder="Description"]')
      .clear()
      .type("Valid description");
    cy.get("button").contains("Update").click();
    cy.get(".text-red-600").should(
      "contain.text",
      "Both title and description are required."
    );
    cy.wait(500);
  });

  it("should not update task with empty description only", () => {
    cy.log("Attempting to update task with only description empty");
    cy.get(".bg-yellow-400").contains("Edit").click();
    cy.get('input[placeholder="Title"]').clear().type("Valid title");
    cy.get('input[placeholder="Description"]').clear();
    cy.get("button").contains("Update").click();
    cy.get(".text-red-600").should(
      "contain.text",
      "Both title and description are required."
    );
    cy.wait(500);
  });

  it("should edit the task and update content", () => {
    cy.log("Editing existing task with valid data");
    cy.get(".bg-yellow-400").contains("Edit").click();
    cy.get('input[placeholder="Title"]').clear().type("My Edited Task");
    cy.get('input[placeholder="Description"]')
      .clear()
      .type("This task has been edited");
    cy.get("button").contains("Update").click();
    cy.get(".fixed").should("contain.text", "Success");
    cy.wait(500);
    cy.get("button").contains("Close").click();
    cy.wait(300);
    cy.contains("My Edited Task");
    cy.contains("This task has been edited");
  });

  it("should delete the task with confirmation", () => {
    cy.log("Deleting task");
    cy.get(".space-x-2 > .bg-red-500").contains("Delete").click();
    
    cy.get(".fixed").should("contain.text", "Delete Task");
    cy.wait(300);
    cy.get(".bg-red-600").contains("Delete").click();
    cy.wait(500);
    cy.contains("My Edited Task").should("not.exist");
  });
});
