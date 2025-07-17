import axios from 'axios'

const VITE_BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3001'

const getAll = () => {
	const request = axios.get(`${VITE_BACKEND_URL}/api/persons`)
	return request.then(response => response.data)
}

const create = newObject => {
	const request = axios.post(`${VITE_BACKEND_URL}/api/persons`, newObject)
	return request.then(response => response.data)
}

const del = (id) => {
	console.log(`Deleting person ${id}`)
	const request = axios.delete(`${VITE_BACKEND_URL}/api/persons/${id}`)
	return request.then(response => response.data)
}

const update = (id, updateObject) => {
	const request = axios.put(`${VITE_BACKEND_URL}/api/persons/${id}`, updateObject)
	return request.then(response => response.data)
}

export default {
	getAll: getAll,
	create: create,
	del: del,
	update: update
}