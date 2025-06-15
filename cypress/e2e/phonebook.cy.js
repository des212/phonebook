describe('Phonebook e2e tests', function () {
	beforeEach(function () {
		const person =
    {
    	name: 'Temporary Person',
    	number: '040-00000000',
    }
    //checks if Temporary Person exists and creates one if not
		cy.request('GET', 'https://phonebook-jgkw.onrender.com/api/persons').then(
			(response) => {
				expect(response.status).to.eq(200)
				response.body.find(({ name }) => name === 'Temporary Person') ? null : cy.request('POST', 'https://phonebook-jgkw.onrender.com/api/persons', person)
			}
		)
		cy.visit('http://localhost:5173')
	})
	it('Front page can be opened', function () {
		cy.contains('Phonebook')
		cy.contains('Add a new')
	})
	it('Temporary Person can be found', function () {
		cy.get('.filter-persons').type('Temporary Person')
		cy.get('.persons').find('li').should('have.length', 1)
		cy.get('.persons').find('li').contains('Temporary Person')
	})
	it('Temporary Person can be deleted', function () {
		cy.get('.persons').find('li').contains('Temporary Person').parent('.person').contains('Delete').click()
		cy.get('.persons').find('li').contains('Temporary Person').should('not.exist')
	})
})