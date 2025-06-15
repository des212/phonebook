const Persons = ({ persons, deleteHandler }) => {
	return (
		<ul className="persons">
			{persons.map(person =>
				<Person key={person.name} person={person} deleteHandler={deleteHandler} />
			)}
		</ul>
	)
}

const Person = ({ person, deleteHandler }) => {
	return (<li className="person">
		<span id={`name-${person.id}`} className="name">{person.name}</span> <span id={`number-${person.id}`} className="number">{person.number}</span> <button id={`delete-${person.id}`} className="delete" onClick={() => deleteHandler(person)}>Delete</button></li>)
}
export default Persons