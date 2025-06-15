import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Persons from './Persons'


describe('Phonebook persons component tests', () => {
	let container
	let mockHandler
	beforeEach(() => {
		const personsList = [
			{
				name: 'Arto Hellas',
				number: '040-123456',
				id: 1
			},
			{
				name: 'Ada Lovelace',
				number: '39-44-5323523',
				id: 2
			},
			{
				name: 'Dan Abramov',
				number: '12-43-234345',
				id: 3
			},
			{
				name: 'Mary Poppendieck',
				number: '39-23-6423122',
				id: 4
			}
		]
		mockHandler = vi.fn()

		container = render(<Persons persons={personsList} deleteHandler={mockHandler} />).container
	})
	test('Renders persons', () => {
		const name = container.querySelector('#name-1')
		expect(name).toHaveTextContent('Arto Hellas')
	})
	test('Clicking the delete calls event handler once', async () => {
		screen.debug()
		const user = userEvent.setup()
		const button = container.querySelector('#delete-3')
		await user.click(button)
		console
		expect(mockHandler.mock.calls).toHaveLength(1)
	})
})