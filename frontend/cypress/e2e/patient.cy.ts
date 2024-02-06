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

describe('Register as user', () => {
  it('get to register page', () => {
    cy.visit('http://localhost:5173')
    cy.get('.Register').click()
    cy.get('.name_register').type('testi')
    cy.get('.ssn_register').type('126489-2265')
    cy.get('.dateOfBirth_register').type('2021-01-01')
    cy.get('.occupation_register').type('poliisi')
    cy.get('.gender_register').click()
    cy.contains('ul li', 'male').click()
    cy.get('.username_register').type('testaaja')
    cy.get('.password_register').type('1234')
    cy.get('.register_register').click()
    cy.contains('h1', 'testi')
    cy.contains('p', 'ssn: 126489-2265')
    cy.contains('p', 'occupation: poliisi')
  })
  it('add entry to patient', () => {
    cy.visit('http://localhost:5173')
    cy.get('.Login').click()
    cy.get('input:first').type('admin')
    cy.get('input:last').type('1234')
    cy.get('.ModalLogin').click()
    cy.get('a').contains('testi').click()
    cy.get('.newEntry').click()
    cy.get('.HealthCheckType').eq(1).click()
    cy.contains('ul li', 'HealthCheck').click()
    cy.get('.HealtCheckDescription').eq(1).click().type('kaikki kunnossa');
    cy.get('.HealthCheckDate').eq(1).click().type('2021-01-01');
    cy.get('.HealthCheckSpecialist').eq(1).click().type('testaaja');
    cy.get('.HealthCheckCodes').eq(1).click()
    cy.get('input[type="checkbox"]').eq(0).check();
    cy.get('body').click()
    cy.get('.HealthCheckRating').eq(1).click().type('0');
    cy.get('.healthCheckSubmit').eq(1).click()
    cy.get('p').should('contain', 'kaikki kunnossa')
    cy.get('.Logout').click()
    cy .get('.Login').click()
    cy.get('input:first').type('testaaja')
    cy.get('input:last').type('1234')
    cy.get('.ModalLogin').click()
    cy.get('p').should('contain', 'kaikki kunnossa')
  })
})
