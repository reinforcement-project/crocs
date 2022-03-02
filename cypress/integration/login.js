describe("Login form", () => {
  it("can log me in", () => {
    cy.visit("http://localhost:8080/")

    cy.get(".ButtonGroup__GroupElement-sc-1vz6lai-0 > :nth-child(1)").click()

    cy.get('[for="email-input"] > [data-testid="input-component"]')
      .click()
      .type("admin@test.com")

    cy.get('[for="password-input"] > [data-testid="input-component"]')
      .click()
      .type("123")

    cy.get(".Button__SubmitButton-sc-rsr8vc-4").click()

    cy.url().should("include", "/main")
  })
})
