/// <reference types="Cypress" />

import 'chai'

describe('Central de Atendinebto ao Cliente TAT', function () {
    const lorem =
        'lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem'

    const timeLapse = 3000

    beforeEach('Visita a homepage', () => {
        cy.visit('./src/index.html')
    })

    it('verifica o título da aplicaçâo', function () {
        cy.title().should('eq', 'Central de Atendimento ao Cliente TAT')
    })

    it('preenche os campos obrigatórios e envia o formulário', () => {
        cy.clock()
        cy.get('#firstName').type('Eduardo')
        cy.get('#lastName').type('Domingos')
        cy.get('#email').type('domingos@gmail.com')
        cy.get('textarea').type(lorem, { delay: 0 })
        cy.contains('button', 'Enviar').click()
        cy.get('.success').should('be.visible')
        cy.tick(timeLapse)
        cy.get('.success').should('not.be.visible')
    })

    it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', () => {
        cy.clock()
        cy.get('#firstName').type('Eduardo')
        cy.get('#lastName').type('Domingos')
        cy.get('#email').type('edudomingos#gmail.com')
        cy.get('textarea').type(lorem, { delay: 0 })
        cy.contains('button', 'Enviar').click()
        cy.get('.error').should('be.visible')
        cy.tick(timeLapse)
        cy.get('.error').should('not.be.visible')
    })

    it('verifica que o campo de telefone só aceita caracteres do tipo numérico', () => {
        cy.get('#phone').type('Eduardo').should('have.value', '')
    })

    it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', () => {
        cy.clock()
        cy.get('#firstName').type('Eduardo')
        cy.get('#lastName').type('Domingos')
        cy.get('#email').type('edudomingos@gmail.com')
        cy.get('#phone-checkbox').check()
        cy.get('textarea').type(lorem, { delay: 0 })
        cy.contains('button', 'Enviar').click()
        cy.get('.error').should('be.visible')
        cy.tick(timeLapse)
        cy.get('.error').should('not.be.visible')
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
        cy.clock()
        cy.contains('button', 'Enviar').click()
        cy.get('.error').should('be.visible')
        cy.tick(timeLapse)
        cy.get('.error').should('not.be.visible')
    })

    it('envia o formuário com sucesso usando um comando customizado', () => {
        cy.clock()
        cy.fillMandatoryFieldsAndSubmit('Eduardo', 'Domingos')
        cy.get('.success').should('be.visible')
        cy.tick(timeLapse)
        cy.get('.success').should('not.be.visible')
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

    it('seleciona um arquivo da pasta fixtures', () => {
        cy.get('[type="file"]')
            .selectFile('cypress/fixtures/example.json')
            .should(input => {
                expect(input[0].files[0].name).to.equal('example.json')
            })
    })

    it('seleciona um arquivo simulando um drag-and-drop', () => {
        cy.get('[type="file"]')
            .selectFile('cypress/fixtures/example.json', {
                action: 'drag-drop'
            })
            .should(input => {
                expect(input[0].files[0].name).to.equal('example.json')
            })
    })

    it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', () => {
        cy.fixture('example.json', { encoding: null }).as('myFixture')
        cy.get('[type="file"]')
            .selectFile('@myFixture')
            .should(input => {
                expect(input[0].files[0].name).to.equal('example.json')
            })
    })

    it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', () => {
        cy.get('a').should('have.attr', 'target', '_blank')
    })

    it('acessa a página da política de privacidade removendo o target e então clicanco no link', () => {
        cy.get('a').invoke('removeAttr', 'target').click()
        cy.contains('CAC TAT').should('be.visible')
    })

    it('testa a página da política de privacidade de forma independente', () => {
        cy.visit('./src/privacy.html')
        cy.get('#title').should(
            'have.text',
            'CAC TAT - Política de privacidade'
        )
    })

    it('preenche o textarea simulando o ctrl+v', () => {
        const longText = Cypress._.repeat('0123456789', 30)
        cy.get('#open-text-area')
            .invoke('val', longText)
            .should('have.value', longText)
    })

    it('exibe e esconde as mensagens de sucesso e erro usando o .invoke()', () => {
        cy.get('.success')
            .should('not.be.visible')
            .invoke('show')
            .should('be.visible')
            .and('contain', 'Mensagem enviada com sucesso.')
            .invoke('hide')
            .should('not.be.visible')
        cy.get('.error')
            .should('not.be.visible')
            .invoke('show')
            .should('be.visible')
            .and('contain', 'Valide os campos obrigatórios!')
            .invoke('hide')
            .should('not.be.visible')
    })

    it('preenche a area de texto usando o comando invoke', () => {
        cy.get('#open-text-area')
            .invoke('val', lorem)
            .should('have.value', lorem)
    })

    it('faz uma requisição HTTP', () => {
        cy.request(
            'GET',
            'https://cac-tat.s3.eu-central-1.amazonaws.com/index.html'
        ).should(res => {
            expect(res.status).eq(200)
            expect(res.statusText).eq('OK')
            expect(res.body).contains('CAC TAT')
        })
    })

    it('faz uma requisição HTTP, alternativo', () => {
        cy.request(
            'GET',
            'https://cac-tat.s3.eu-central-1.amazonaws.com/index.html'
        ).should(res => {
            const { status, statusText, body } = res
            expect(status).eq(200)
            expect(statusText).eq('OK')
            expect(body).includes('CAC TAT')
        })
    })

    it.only('🐈', () => {
        cy.get('#cat').invoke('show').should('be.visible')
    })
})
