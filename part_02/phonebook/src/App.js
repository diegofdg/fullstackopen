import React, { useState } from 'react';

const App = () => {
    const [ persons, setPersons ] = useState(
        [
            { 
                name: 'Arto Hellas',
                number: '040-123456'
            },
            {
                name: 'Ada Lovelace',
                number: '39-44-5323523'
            },
            {
                name: 'Dan Abramov',
                number: '12-43-234345'
            },
            {
                name: 'Mary Poppendieck',
                number: '39-23-6423122'
            }
        ]
    );

    const [ filteredPersons, setFilteredPersons ] = useState([]);
    const [ newName, setNewName ] = useState('');
    const [ newNumber, setNewNumber ] = useState('');
    const [ newFilter, setNewFilter ] = useState('');

    const addPerson = (e) => {
        e.preventDefault();

        const person = persons.filter( p =>
            p.name === newName
        );

        if(person.length === 0) {
            const newPerson = {
                name: newName,
                number: newNumber
            }
            setPersons(persons.concat(newPerson));
            setNewName('');
            setNewNumber('');
        } else {
            alert(`${newName} is already added to the phonebook`);
        }
    }

    const handleChangeFilter = (e) => {
        console.log(filteredPersons);
        setNewFilter(e.target.value);
        const regex = new RegExp( newFilter, 'i' );
        const filter = () => persons.filter(person => person.name.match(regex));
        setFilteredPersons(filter);
    }   

    const handleChangeName = (e) => {     
        setNewName(e.target.value);    
    }

    const handleChangeNumber = (e) => {
        setNewNumber(e.target.value);
    }

    return (
        <div>
            <h2>Phonebook</h2>
            <div>
                filter shown with 
                <input 
                    value={newFilter} 
                    onChange={handleChangeFilter} 
                />
            </div>
            <form
                onSubmit={addPerson}
            >
                <h2>add a new</h2>
                <div>
                    name:
                    <input
                        value={newName} 
                        onChange={handleChangeName}
                    />
                </div>
                <div>
                    number: 
                        <input
                            value={newNumber} 
                            onChange={handleChangeNumber}
                        />
                </div>
                <div>
                    <button 
                        type="submit"
                    >
                        add
                    </button>
                </div>
            </form>
            <h2>Numbers</h2>
            <div>
                {filteredPersons.length > 0 
                    ?
                        <div>
                            {filteredPersons.map(person => (
                                <p
                                    key={person.name}
                                >
                                    {person.name} {person.number}                
                                </p>
                            ))}
                        </div>
                    : 
                        <div>
                            {persons.map(person => (
                                <p
                                    key={person.name}
                                >
                                    {person.name}
                                </p>
                            ))}
                        </div>
                    }
            </div>
        </div>
    );
}

export default App;