import axios from 'axios'
const baseUrl = 'https://phonebook-jgkw.onrender.com/api/persons'
//const baseUrl = 'http://localhost:3001/api/persons'

const getAll = () => {
	const request = axios.get(baseUrl)
	return request.then(response => response.data)
}

const create = newObject => {
	const request = axios.post(baseUrl, newObject)
	return request.then(response => response.data)
}

const del = (id) => {
	console.log(`Deleting person ${id}`)
	const request = axios.delete(`${baseUrl}/${id}`)
	return request.then(response => response.data)
}

const update = (id, updateObject) => {
	const request = axios.put(`${baseUrl}/${id}`, updateObject)
	return request.then(response => response.data)
}

export default {
	getAll: getAll,
	create: create,
	del: del,
	update: update
}