const mongoose = require('mongoose')
require('dotenv').config({ path : '../.env' })

if(process.argv.length < 3){
	console.log('give password as argument or use plain MONGODB_URL env variable directly prompting "node mongo.js env"')
	process.exit(1)
}

const password = process.argv[2]

const uri = process.env.MONGODB_URL
const url = process.argv[2] === 'env' ? uri : uri.replace(/\:{1}\w+\@{1}/, `:${password}@`) // eslint-disable-line no-useless-escape
console.log('connecting to ', url)
mongoose.set('strictQuery', false)
mongoose.connect(url)

const personSchema = new mongoose.Schema({
	name: String,
	number: String,
})

const Person = mongoose.model('Person', personSchema)

if (process.argv.length === 5) {
	const person = new Person({
		name: process.argv[3],
		number: process.argv[4],
	})

	person.save().then(result => { // eslint-disable-line no-unused-vars
		console.log(`Added ${person.name} number ${person.number} to phonebook!`)
		mongoose.connection.close()
	})
}

if (process.argv.length === 3) {
	console.log('phonebook:')
	Person.find({}).then(result => {
		result.forEach(person => {
			console.log(`${person.name} ${person.number}`)
		})
		mongoose.connection.close()
	})
}
