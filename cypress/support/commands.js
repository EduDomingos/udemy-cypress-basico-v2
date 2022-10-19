Cypress.Commands.add('fillMandatoryFieldsAndSubmit', function(firstName = 'exemplo', lastName = 'exemplo', validEmail = 'exemplo@exemplo.com'){
  cy.get('#firstName').type(firstName)
  cy.get('#lastName').type(lastName)
  cy.get('#email').type(validEmail)
  cy.get('textarea').type('Teste')
  cy.contains('button', 'Enviar').click()
})