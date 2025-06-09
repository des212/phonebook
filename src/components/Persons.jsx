const Persons = ({ persons, deleteHandler }) => {
    return (
        <ul>
            {persons.map(person =>
                <Person key={person.name} person={person} deleteHandler={deleteHandler} />
            )}
        </ul>
    )
}

const Person = ({ person, deleteHandler }) => {
    return (<li>
        {person.name} {person.number} <button onClick={() => deleteHandler(person)}>Delete</button></li>)
}
export default Persons