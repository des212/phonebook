const express = require('express')
const app = express()
const morgan = require('morgan')
morgan.token('body', function getBody(req) {
	return JSON.stringify(req.body)
})
const cors = require('cors')
require('dotenv').config({ path: '../.env' })
const Person = require('./models/person')


const requestLogger = (request, response, next) => {
	console.log('Method:', request.method)
	console.log('Path:  ', request.path)
	console.log('Body:  ', request.body)
	console.log('---')
	next()
}
const errorHandler = (error, request, response, next) => {
	console.error(error.message)

	if (error.name === 'CastError') {
		return response.status(400).send({ error: 'malformatted id' })
	}
	else if (error.name === 'ValidationError') {
		return response.status(400).json({ error: error.message })
	}
	next(error)
}

const unknownEndpoint = (request, response) => {
	response.status(404).send({ error: 'unknown endpoint' })
}

app.use(cors())
app.use(express.json())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))
app.use(requestLogger)
app.use(express.static('dist'))

/*let persons = [
	{
		id: 1, name: "Arto Hellas", number: "040-123456"
	},
	{
		id: 2, name: "Ada Lovelace", number: "39-44-5323523"
	},
	{
		id: 3, name: "Dan Abramov", number: "12-43-234345"
	},
	{
		id: 4, name: "Mary Poppendick", number: "39-23-6423122"
	}
]*/

app.get('/', (req, res) => {
	res.send('<h1>Hello World!</h1>')
})
app.get('/info', (request, response) => {
	const currentDate = new Date()
	Person.find({}).then(people => {
		response.send(`<p>Phonebook has info for ${people.length} people</p><p>${currentDate}</p>`)
	})
})
app.get('/api/persons', (request, response) => {
	Person.find({}).then(people => {
		response.json(people)
	})
})

app.post('/api/persons', (request, response, next) => {
	const body = request.body

	if (!body.name) {
		return response.status(400).json({
			error: 'name missing'
		})
	}
	else if (!body.number) {
		return response.status(400).json({
			error: 'number missing'
		})
	}
	/*else if(Person.find(person => person.name === body.name ? true : false)){
		return response.status(400).json({
			error: 'name must be unique'
		})
	}*/
	const person = new Person({
		name: body.name,
		number: body.number,
	})

	person.save().then(savedPerson => {
		response.json(savedPerson)
	})
		.catch(error => next(error))
})

app.get('/api/persons/:id', (request, response, next) => {
	Person.findById(request.params.id).then(person => {
		if (person) {
			response.json(person)
		} else {
			response.status(404).end()
		}
	})
		.catch(error => next(error))
})

app.delete('/api/persons/:id', (request, response, next) => {
	Person.findByIdAndDelete(request.params.id)
		.then(result => { // eslint-disable-line no-unused-vars
			response.status(204).end()
		})
		.catch(error => next(error))
})

app.put('/api/persons/:id', (request, response, next) => {
	const { name, number } = request.body
	Person.findByIdAndUpdate(request.params.id, { name, number }, { new: true, runValidators: true, context: 'query' })
		.then(updatedPerson => {
			response.json(updatedPerson)
		})
		.catch(error => next(error))
})

app.get('/version', (req, res) => {
	res.send('1') // change this string to ensure a new version deployed
})

app.get('/health', (req, res) => {
	res.send('ok')
})

app.use(unknownEndpoint)
app.use(errorHandler)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`)
})
