import { useState, useEffect } from 'react'
import personsService from './services/Persons'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'
import Notification from './components/Notification'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterPersons, setFilterPersons] = useState('')
  const [message, setMessage] = useState('')

  //kaikkien henkiloiden haku
  useEffect(() => {
    personsService.getAll().then(allPersons => {
      console.log('promise fulfilled')
      setPersons(allPersons)
    })
  }, [])

  //vertailu funktio
  const searchArray = (person) => person.name.toLowerCase().includes(filterPersons.toLocaleLowerCase())
  //henkiloiden sijoitus muuttujaan rajauksen mukaisesti
  const personsList = filterPersons != '' ? persons.filter(searchArray) : persons

  //henkilon lisays
  const addPerson = (e) => {
    e.preventDefault()
    console.log('button clicked', e.target)
    //henkilo objekti
    const personObject = {
      name: newName,
      number: newNumber
    }
    //tarkistus funktio
    const inArray = (person) => person.name === newName
    //onko taulussa? sijoitetaan muuttujaan palautettu objekti, jos on
    const found = persons.find(inArray)
    //onko taulussa
    console.log(found)
    found !== undefined
      //onko luotu, jos on korvataan
      ? updHandler(found.id, personObject)
      //luodaan uusi
      : personsService.create(personObject).then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        //viesti
        setMessage(`Added ${newName}`)
        setTimeout(() => {
          setMessage(null)
        }, 5000)
      })
        .catch(error => {
          console.log(error.response.data)
          //viesti
          setMessage(`${JSON.stringify(error.response.data.error).substring(1, error.response.data.error.length + 1)}`)
          setTimeout(() => {
            setMessage(null)
          }, 5000)
        })
    //kentan tyhjennys
    setNewName('')
    setNewNumber('')
  }

  /* KASITTELIJAT */
  const personHandler = (e) => {
    console.log(e.target.value)
    setNewName(e.target.value)
  }

  const numberHandler = (e) => {
    console.log(e.target.value)
    setNewNumber(e.target.value)
  }

  const filterHandler = (e) => {
    console.log(e.target.value)
    setFilterPersons(e.target.value)
  }

  const delHandler = (delPerson) => {
    if (window.confirm(`Delete ${delPerson.name}`)) {
      personsService.del(delPerson.id).then(response => { // eslint-disable-line no-unused-vars
        setPersons(persons.filter(person => person.id !== delPerson.id ? true : false))
        //viesti
        setMessage(`Deleted ${delPerson.name}`)
        setTimeout(() => {
          setMessage(null)
        }, 5000)
      })
    }
  }

  const updHandler = (id, updatePerson) => {
    if (window.confirm(`${updatePerson.name} is already added to phonebook, replace the old number with a new one?`)) {
      personsService.update(id, updatePerson).then(returnedPerson => {
        setPersons(persons.map(person => person.id !== id ? person : returnedPerson))
        //viesti
        setMessage(`Updated ${updatePerson.name}`)
        setTimeout(() => {
          setMessage(null)
        }, 5000)
      })
        .catch(error => {
          if (error.response.data) {
            console.log(error.response.data)
            //viesti
            setMessage(`${JSON.stringify(error.response.data.error).substring(1, error.response.data.error.length + 1)}`)
            setTimeout(() => {
              setMessage(null)
            }, 5000)
          }
          else {
            setMessage(
              `Information of ${updatePerson.name} has already removed from server`
            )
            setTimeout(() => {
              setMessage(null)
            }, 5000)
            setPersons(persons.filter(person => person.id !== id ? true : false))
          }
        })
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} />
      <Filter value={filterPersons} handler={filterHandler} />
      <h3>Add a new</h3>
      <PersonForm submitHandler={addPerson} nameValue={newName} numberValue={newNumber} personHandler={personHandler} numberHandler={numberHandler} />
      <h3>Numbers</h3>
      <Persons persons={personsList} deleteHandler={delHandler} />
    </div>
  )
}

export default App