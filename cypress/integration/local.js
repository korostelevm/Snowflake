
context('Assertions', () => {
  beforeEach(() => {
    var app_url = Cypress.env("APP_URL");
    if (!app_url) {
      app_url = 'http://127.0.0.1:8080/';
    }
    cy.visit(app_url)
    Cypress.Commands.overwrite('log', (subject, message) => cy.task('log', message));

  })

  describe('Make A Cake', () => {
    it('bake', function() {
    var fill = cy.get('[data-cy=icing_svg]').invoke('attr','fill')
    cy.get('[data-cy=icing]').click()
    var new_fill = cy.get('[data-cy=icing_svg]').invoke('attr','fill')
    expect(new_fill).to.not.equal(fill)

    cy.get('[data-cy=icing]').click()
    cy.get('[data-cy=icing]').click()
    cy.get('[data-cy=cherry]').click()
    cy.get('[data-cy=toppings]').click()
    cy.get('[data-cy=toppings]').click()
    cy.get('[data-cy=filling]').click()
    
    cy.get('[data-cy=cherry]').click()
    var fill = cy.get('[data-cy=cherry]').invoke('attr','fill')
    cy.get('[data-cy=cherry]').click()
    var new_fill = cy.get('[data-cy=cherry]').invoke('attr','fill')
    expect(new_fill).to.not.equal(fill)

    cy.get('[data-cy=top]').click()
    cy.get('[data-cy=toppings]').click()
    cy.get('[data-cy=filling]').click()
    cy.get('[data-cy=filling]').click()
    cy.get('[data-cy=filling]').click()
    cy.get('[data-cy=more_filling]').click()
    cy.get('[data-cy=more_filling]').click()
    cy.get('[data-cy=more_filling]').click()
    cy.get('[data-cy=base]').click()
    cy.get('[data-cy=base]').click()
    cy.get('[data-cy=base]').click()
   })
  })

})
