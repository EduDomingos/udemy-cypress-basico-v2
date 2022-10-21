/// <reference types="Cypress" />

describe('Central de Atendinebto ao Cliente TAT', function () {
    const lorem =
        'lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem'

    beforeEach('Visita a homepage', () => {
        cy.visit('./src/index.html')
    })

    it('verifica o título da aplicaçâo', function () {
        cy.title().should('eq', 'Central de Atendimento ao Cliente TAT')
    })

    it('preenche os campos obrigatórios e envia o formulário', () => {
        cy.get('#firstName').type('Eduardo')
        cy.get('#lastName').type('Domingos')
        cy.get('#email').type('domingos@gmail.com')
        cy.get('textarea').type(lorem, { delay: 0 })
        cy.contains('button', 'Enviar').click()
        cy.get('.success').should('be.visible')
    })

    it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', () => {
        cy.get('#firstName').type('Eduardo')
        cy.get('#lastName').type('Domingos')
        cy.get('#email').type('edudomingos#gmail.com')
        cy.get('textarea').type(lorem, { delay: 0 })
        cy.contains('button', 'Enviar').click()
        cy.get('.error').should('be.visible')
    })

    it('verifica que o campo de telefone só aceita caracteres do tipo numérico', () => {
        cy.get('#phone').type('Eduardo').should('have.value', '')
    })

    it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', () => {
        cy.get('#firstName').type('Eduardo')
        cy.get('#lastName').type('Domingos')
        cy.get('#email').type('edudomingos@gmail.com')
        cy.get('#phone-checkbox').check()
        cy.get('textarea').type(lorem, { delay: 0 })
        cy.contains('button', 'Enviar').click()
        cy.get('.error').should('be.visible')
    })

    it('preenche e limpa os campos nome, sobrenome, email e telefone', () => {
        cy.get('#firstName')
            .type('Eduardo')
            .should('have.value', 'Eduardo')
            .clear()
            .should('have.value', '')
        cy.get('#lastName')
            .type('Domingos')
            .should('have.value', 'Domingos')
            .clear()
            .should('have.value', '')
        cy.get('#email')
            .type('edudomingos@gmail.com')
            .should('have.value', 'edudomingos@gmail.com')
            .clear()
            .should('have.value', '')
        cy.get('#phone')
            .type('321654987')
            .should('have.value', '321654987')
            .clear()
            .should('have.value', '')
    })

    it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', () => {
        cy.contains('button', 'Enviar').click()
        cy.get('.error').should('be.visible')
    })

    it('envia o formuário com sucesso usando um comando customizado', () => {
        cy.fillMandatoryFieldsAndSubmit('Eduardo', 'Domingos')
        cy.get('.success').should('be.visible')
    })

    it('seleciona um produto (YouTube) por seu texto', () => {
        cy.get('select#product')
            .select('YouTube')
            .should('have.value', 'youtube')
    })

    it('seleciona um produto (Mentoria) por seu valor (value)', () => {
        cy.get('select#product')
            .select('mentoria')
            .should('have.value', 'mentoria')
    })

    it('seleciona um produto (Blog) por seu índice', () => {
        cy.get('select#product').select(1).should('have.value', 'blog')
    })

    it('marca o tipo de atendimento "Feedback"', () => {
        cy.get('[type="radio"]').check('feedback').should('be.checked')
    })

    it('marca o tipo de atendimento "Feedback" (de outa forma)', () => {
        cy.get('input[type="radio"][value="feedback"]')
            .check()
            .should('have.value', 'feedback')
    })

    it('marca cada tipo de atendimento', () => {
        cy.get('[type="radio"]')
            .should('have.length', 3)
            .each(radio => {
                cy.get(radio).check().should('be.checked')
            })
    })

    it('marca ambos checkboxes, depois desmarca o último', () => {
        cy.get('[type="checkbox"]')
            .check()
            .each(res => {
                cy.get(res).should('be.checked')
            })
        cy.get('[type="checkbox"]').last().uncheck().should('not.be.checked')
    })

    it('marca ambos checkboxes, depois desmarca o último (de outra forma)', () => {
        cy.get('[type="checkbox"]')
            .check()
            .should('be.checked')
            .last()
            .uncheck()
            .should('not.be.checked')
    })

    it.only('seleciona um arquivo da pasta fixtures', () => {
        cy.get('[type="file"]')
            .selectFile('cypress/fixtures/example.json')
            .should(input => {
                expect(input[0].files[0].name).to.equal('example.json')
            })
    })

    it.only('seleciona um arquivo simulando um drag-and-drop', () => {
        cy.get('[type="file"]')
            .selectFile('cypress/fixtures/example.json', {
                action: 'drag-drop'
            })
            .should(input => {
                expect(input[0].files[0].name).to.equal('example.json')
            })
    })

    it.only('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', () => {
        cy.fixture('example.json', { encoding: null }).as('myFixture')
        cy.get('[type="file"]')
            .selectFile('@myFixture')
            .should(input => {
                expect(input[0].files[0].name).to.equal('example.json')
            })
    })
})
