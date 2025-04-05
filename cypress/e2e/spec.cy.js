// Government user E2E test
// Longer term in a booming city location
it('Government User Story', () => {
    cy.visit('http://127.0.0.1:5500/index.html')
  
    cy.get('#graph-title').type('Liverpool Data Projection')
    cy.get('#graph-title').should('have.value', 'Liverpool Data Projection')

    cy.get('#start-year').type('2024')
    cy.get('#start-year').should('have.value', '2024')

    cy.get('#end-year').type('2060')
    cy.get('#end-year').should('have.value', '2060')

    cy.get("#generate-button").click()
})
  

// Corporate user E2E test
// Shorter term in a more suburban location
it('Corporate User Story', () => {
    cy.visit('http://127.0.0.1:5500/index.html')
  
    cy.get('#graph-title').type('Best Cookie Store Location Armidale')
    cy.get('#graph-title').should('have.value', 'Best Cookie Store Location Armidale')

    cy.get('#start-year').type('2024')
    cy.get('#start-year').should('have.value', '2024')

    cy.get('#end-year').type('2044')
    cy.get('#end-year').should('have.value', '2044')

    cy.get("#generate-button").click()
})
  