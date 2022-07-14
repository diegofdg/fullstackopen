import React, { useState } from 'react';
import Content from './components/Content';
import Filter from './components/Filter';
import Person from './components/Person';

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
    const [ filter, setFilter] = useState(false);

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
        setNewFilter(e.target.value);
        if(newFilter.trim().length === 0){
            setFilteredPersons(persons);
            setFilter(false);
        } else {            
            const regex = new RegExp( newFilter, 'i' );
            const filter = () => persons.filter(person => person.name.match(regex));
            setFilteredPersons(filter);            
            setFilter(true);
        }
    }

    const handleChangeName = (e) => {     
        setNewName(e.target.value);    
    }

    const handleChangeNumber = (e) => {
        setNewNumber(e.target.value);
    }

    const componente = (filter)
        ?
            <Content
                persons={filteredPersons}
            />
        :
            <Content
                persons={persons}
            />

    return (
        <div>
            <h2>Phonebook</h2>
            <Filter
                newFilter={newFilter}
                handleChangeFilter={handleChangeFilter}
            />
            
            <h2>Add a new</h2>
            <Person
                addPerson={addPerson}
                newName={newName}
                newNumber={newNumber}
                handleChangeName={handleChangeName}
                handleChangeNumber={handleChangeNumber}
            />
            
            <h2>Numbers</h2>
            {componente}
            
        </div>
    );
}

export default App;