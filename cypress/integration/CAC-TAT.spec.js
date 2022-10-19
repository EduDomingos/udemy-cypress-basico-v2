/// <reference types="Cypress" />

describe('Central de Atendinebto ao Cliente TAT', function(){
  const lorem = 'lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum '

  beforeEach('Visita a homepage', ()=>{
    cy.visit('./src/index.html')

  })
  
  it('verifica o título da aplicaçâo', function(){
    cy.title().should('eq', 'Central de Atendimento ao Cliente TAT')

  })

  it('preenche os campos obrigatórios e envia o formulário', ()=>{
    cy.get('#firstName').type('Eduardo')
    cy.get('#lastName').type('Domingos')
    cy.get('#email').type('edudomingos@gmail.com')
    cy.get('textarea').type(lorem, {delay: 0})
    cy.contains('button', 'Enviar').click()
    cy.get('.success').should('be.visible')

  })

  it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', ()=>{
    cy.get('#firstName').type('Eduardo')
    cy.get('#lastName').type('Domingos')
    cy.get('#email').type('edudomingos#gmail.com')
    cy.get('textarea').type(lorem, {delay: 0})
    cy.contains('button', 'Enviar').click()
    cy.get('.error').should('be.visible')

  })

  it('verifica que o campo de telefone só aceita caracteres do tipo numérico', ()=>{
    cy.get('#phone').type('Eduardo').should('have.value', '')

  })

  it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', ()=>{
    cy.get('#firstName').type('Eduardo')
    cy.get('#lastName').type('Domingos')
    cy.get('#email').type('edudomingos@gmail.com')
    cy.get('#phone-checkbox').click()
    cy.get('textarea').type(lorem, {delay: 0})
    cy.contains('button', 'Enviar').click()
    cy.get('.error').should('be.visible')

  })

  it('preenche e limpa os campos nome, sobrenome, email e telefone', ()=>{
    cy.get('#firstName').type('Eduardo').should('have.value', 'Eduardo').clear().should('have.value', '')
    cy.get('#lastName').type('Domingos').should('have.value', 'Domingos').clear().should('have.value', '')
    cy.get('#email').type('edudomingos@gmail.com').should('have.value', 'edudomingos@gmail.com')
      .clear().should('have.value', '')
    cy.get('#phone').type('321654987').should('have.value', '321654987').clear().should('have.value', '')

  })

  it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', ()=>{
    cy.contains('button', 'Enviar').click()
    cy.get('.error').should('be.visible')

  })

  it('envia o formuário com sucesso usando um comando customizado', ()=>{
    cy.fillMandatoryFieldsAndSubmit('Eduardo', 'Domingos')
    cy.get('.success').should('be.visible')

  })
})