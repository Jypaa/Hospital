describe('forntpage check', () => {
  it('get to frontpage', () => {
    cy.visit('http://localhost:5173/')
    cy.get('h3').should('contain', 'Patientor')
  })
})

describe('Log in as admin and add entry', () => {
  it('get to patient page', () => {
    cy.visit('http://localhost:5173')
    cy.get('.Login').click()
    cy.get('input:first').type('admin')
    cy.get('input:last').type('1234')
    cy.get('.ModalLogin').click()
    cy.get('h6').should('contain', 'Patient list')
  })
  it('get to patient page', () => {
    cy.visit('http://localhost:5173')
    cy.get('.Login').click()
    cy.get('input:first').type('admin')
    cy.get('input:last').type('1234')
    cy.get('.ModalLogin').click()
    cy.get('a').contains('John McClane').click()
  })
  it('add entry to patient', () => {
    cy.visit('http://localhost:5173')
    cy.get('.Login').click()
    cy.get('input:first').type('admin')
    cy.get('input:last').type('1234')
    cy.get('.ModalLogin').click()
    cy.get('a').contains('John McClane').click()
    cy.get('.newEntry').click()
    cy.get('.HealthCheckType').eq(1).click()
    cy.contains('ul li', 'HealthCheck').click()
    cy.get('.HealtCheckDescription').eq(1).click().type('kaikki kunnossa');
    cy.get('.HealthCheckDate').eq(1).click().type('2021-01-01');
    cy.get('.HealthCheckSpecialist').eq(1).click().type('admin');
    cy.get('.HealthCheckCodes').eq(1).click()
    cy.get('input[type="checkbox"]').eq(0).check();
    cy.get('body').click()
    cy.get('.HealthCheckRating').eq(1).click().type('0');
    cy.get('.healthCheckSubmit').eq(1).click()
    cy.get('p').should('contain', 'kaikki kunnossa')
   
  })
  it('Check if entry is added', () => {
    cy.visit('http://localhost:5173')
    cy.get('.Login').click()
    cy.get('input:first').type('jmcclane')
    cy.get('input:last').type('1234')
    cy.get('.ModalLogin').click()
    cy.get('p').should('contain', 'kaikki kunnossa')
  })
})