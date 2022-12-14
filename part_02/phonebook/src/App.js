import React, { useState, useEffect } from 'react';
import Content from './components/Content';
import Filter from './components/Filter';
import Person from './components/Person';
import personService from './services/persons';
import Notification from './components/Notification';

const App = () => {
    const [ allPersons, setAllPersons ] = useState([]);
    const [ filteredPersons, setFilteredPersons ] = useState([allPersons]);
    const [ newName, setNewName ] = useState('');
    const [ newNumber, setNewNumber ] = useState('');
    const [ newFilter, setNewFilter ] = useState('');
    const [ filter, setFilter] = useState(false);
    const [message, setMessage] = useState(null);

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
                setNewName('');
                setNewNumber('');
                setMessage(`Added ${newName}`);
                    setTimeout(() => {
                        setMessage(null);
                        personService
                            .getAll()
                            .then(initialPersons => {
                                setAllPersons(initialPersons)
                            });
                    }, 5000);
            })
            .catch(error => {
                console.log(error);                
                setMessage(`[ERROR] ${error}`);
                setTimeout(() => {
                    setMessage(null);
                }, 5000);
            });
            
        } else if (window.confirm(`${person[0].name} is already added to the phonebook, replace the old number with a new one ?`)) {
            const newPerson = person[0];
            const updatedPerson = {
                ...newPerson,
                number: newNumber
            }
            personService
                .update(updatedPerson.id, updatedPerson)
                .then(returnedPerson => {                    
                    setAllPersons(allPersons.map(personItem => {
                        if(personItem.id !== newPerson.id ){
                            return personItem
                        } else {
                            return returnedPerson
                        }
                    }));
                    setNewName('');
                    setNewNumber('');
                    setMessage(`Updated ${newName}`);
                        setTimeout(() => {
                            setMessage(null);
                            personService
                                .getAll()
                                .then(initialPersons => {
                                setAllPersons(initialPersons)
                            });
                        }, 5000);
                })
                .catch(error => {
                    console.log(error);
                    setMessage(`[ERROR] ${person[0].name} ${error.response.statusText}`);
                    setTimeout(() => {
                        setMessage(null);
                    }, 5000);                  
                })
        }
    }

    const removePerson = (id) => {
        const person = allPersons.filter(p => p.id === id);        
        const personName = person[0].name;
        if (window.confirm(`Delete ${personName} ?`)) {
            personService
                .remove(id)
                .then(                    
                    setMessage(`${person[0].name} was successfully deleted`)
                )
                .then(
                    setTimeout(() => {
                        setMessage(null);
                        personService
                            .getAll()
                            .then(initialPersons => {
                                setAllPersons(initialPersons);
                            })
                    }, 5000)
                )
                .catch(error => {
                    console.log(error);
                    setMessage(`[ERROR] ${person[0].name} ${error.response.statusText}`)
                    setTimeout(() => {
                        setMessage(null);
                    }, 5000);                  
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
            <Notification
                message={message}
            />
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