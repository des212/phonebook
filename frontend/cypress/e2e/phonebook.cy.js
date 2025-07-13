describe('Phonebook e2e tests', function () {
	beforeEach(function () {
		const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:4173'
		const BACKEND_URL = process.env.BACKEND_URL || 'http://localhost:3001'

		const person =
    {
    	name: 'Temporary Person',
    	number: '040-00000000',
    }

		//checks if Temporary Person exists and creates one if not
		cy.request('GET',`${BACKEND_URL}/api/persons`).then(
			(response) => {
				expect(response.status).to.eq(200)
				response.body.find(({ name }) => name === 'Temporary Person') ? null : cy.request('POST', `${BACKEND_URL}/api/persons`, person)
			}
		)
		cy.visit(FRONTEND_URL)
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
