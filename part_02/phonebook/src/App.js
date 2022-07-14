import React, { useState, useEffect } from 'react';
import Content from './components/Content';
import Filter from './components/Filter';
import Person from './components/Person';
import personService from './services/persons';

const App = () => {
    const [ allPersons, setAllPersons ] = useState([]);
    const [ filteredPersons, setFilteredPersons ] = useState([allPersons]);
    const [ newName, setNewName ] = useState('');
    const [ newNumber, setNewNumber ] = useState('');
    const [ newFilter, setNewFilter ] = useState('');
    const [ filter, setFilter] = useState(false);

    useEffect(() => {        
        personService
            .getAll()
            .then(initialPersons => {
                setAllPersons(initialPersons)
            });
    }, []);

    const addPerson = (e) => {
        e.preventDefault();

        const person = allPersons.filter( p =>
            p.name === newName
        );

        if(person.length === 0) {
            const newPerson = {
                name: newName,
                number: newNumber
            }
            personService
            .create(newPerson)
            .then(returnedPerson => {
                setAllPersons(allPersons.concat(returnedPerson));
            });
        } else {
            alert(`${newName} is already added to the phonebook`);
        }
    }

    const removePerson = (id) => {
        const person = allPersons.filter(p => p.id === id);        
        const personName = person[0].name;
        if (window.confirm(`Delete ${personName} ?`)) {
            personService
                .remove(id)
                .then(
                    personService
                        .getAll()
                        .then(initialPersons => {
                            setAllPersons(initialPersons);
                        })
                )
                .catch(error => {
                    console.log(error);
                    alert(`the person '${personName}' was already deleted from server`);
                    setAllPersons(allPersons.filter(p => p.id !== id));
                });
        }
    }

    const handleChangeFilter = (e) => {
        setNewFilter(e.target.value);
        if(newFilter.trim().length === 0){
            setFilteredPersons(allPersons);
            setFilter(false);
        } else {            
            const regex = new RegExp( newFilter, 'i' );
            const filter = () => allPersons.filter(person => person.name.match(regex));
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
                removePerson={removePerson}
            />
        :
            <Content
                persons={allPersons}
                removePerson={removePerson}
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