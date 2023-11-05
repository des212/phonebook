const express = require('express')
const app = express()
app.use(express.json())
const morgan = require('morgan')
morgan.token('body', function getBody (req) {
    return JSON.stringify(req.body)
  })
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))
const cors = require('cors')
app.use(cors())

let persons = [
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
]

app.get('/', (req, res) => {
    res.send('<h1>Hello World!</h1>')
})
app.get('/info', (req, res) => {
    const currentDate = new Date();
    res.send(`<p>Phonebook has info for ${persons.length} people</p><p>${currentDate}</p>`)
})
app.get('/api/persons', (req, res) => {
    res.json(persons)
})

const getRandomIntInclusive = ( min, max ) => {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min + 1) + min) // The maximum is inclusive and the minimum is inclusive
}

  
const generateId = () => {
    const rand = getRandomIntInclusive(0 , 1000)
    return rand
}

app.post('/api/persons', (request, response) => {
    const body = request.body

    if (!body.name || !body.number) {
        return response.status(400).json({
            error: 'name missing'
        })
    }
    else if(persons.find(person => person.name === body.name ? true : false)){
        return response.status(400).json({
            error: 'name must be unique'
        })
    }

    const person = {
        name: body.name,
        number: body.number,
        date: new Date(),
        id: generateId(),
    }

    persons = persons.concat(person)

    response.json(person)
})

app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const person = persons.find(person => person.id === id)
    if (person) {
        response.json(person)
    }
    else {
        response.status(404).end()
    }
})

app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter(person => person.id !== id)

    response.status(204).end()
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})