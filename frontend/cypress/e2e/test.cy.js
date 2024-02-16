// Purpose: To test the functionality of the app
describe('The Home Page', () => {
    it('successfully loads', () => {
        cy.visit('http://localhost:3000')
    })
})

describe('The Category page', () => {
    it('successfully loads', () => {
        cy.visit('http://localhost:3000/categories')
    })
})

describe('The Quiz page', () => {
    it('successfully loads', () => {
        cy.visit('http://localhost:3000/quiz')
    })
})

describe('The Result page', () => {
    it('successfully loads', () => {
        cy.visit('http://localhost:3000/result')
    })
})

describe('check if page is responsive', () => {
    it('checks if page is responsive', () => {
        cy.viewport(320, 480)
        cy.visit('http://localhost:3000')
        cy.viewport(1280, 800)
        cy.visit('http://localhost:3000')
    })
})

describe('check if error message shows up when form is not filled out', () => {
    it('checks if error message shows up when form is not filled out', () => {
        cy.visit('http://localhost:3000/categories')
        cy.get('form').submit()
        cy.get('div[class="col mb-4"]').contains('Please fill in all the fields').should('be.visible')
    })
})


describe('checks if page is redirected to the correct page', () => {
    it('checks if page is redirected to the correct page', () => {
        cy.visit('http://localhost:3000/categories')
        cy.log('filling out topic category')
        cy.get('form').within($form => {
            cy.get('#topic').type('aws')
            cy.get('li').contains('aws').click()
            cy.get('#expertise').type('novice')
            cy.get('li').contains('novice').click()
            cy.get('#numquestions').type('5')
            cy.get('li').contains('5').click()
            cy.get('#questionstyle').type('master oogway')
            cy.get('li').contains('master oogway').click()
        })
        cy.get('form').submit()

        cy.wait(5000)
        cy.url().should('include', '/quiz')




    })
})

describe(`checks if error message shows up if user doesn't fill out form `, () => {
    it('checks for error message', () => {
        cy.visit('http://localhost:3000/categories')
        cy.log('filling out topic category')
        cy.get('form').within($form => {
            cy.get('#topic').type('aws')
            cy.get('li').contains('aws').click()
            cy.get('#expertise').type('novice')
            cy.get('li').contains('novice').click()
            cy.get('#numquestions').type('5')
            cy.get('li').contains('5').click()
            cy.get('#questionstyle').type('master oogway')
            cy.get('li').contains('master oogway').click()
        })
        cy.get('form').submit()

        cy.wait(5000)
        cy.get('button').click()
        cy.get('div[class="col s12 header-5"]').contains('Please enter an answer before submitting.').should('be.visible')




    })
})