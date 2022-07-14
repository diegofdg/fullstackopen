import React, { useState } from 'react';

const App = () => {
    const [ persons, setPersons ] = useState(
        [
            { 
                name: 'Arto Hellas' 
            }
        ]
    );

    const [ newName, setNewName ] = useState('');

    const addPerson = (e) => {
        e.preventDefault();

        const person = persons.filter( p =>
            p.name === newName
        );

        if(person.length === 0) {
            const newPerson = {
                name: newName
            }
            setPersons(persons.concat(newPerson));
            setNewName('');
        } else {
            alert(`${newName} is already added to the phonebook`);
        }
    }

    const handleChangeName = (e) => {     
        setNewName(e.target.value);    
    }

    return (
        <div>
            <h2>Phonebook</h2>
            <form
                onSubmit={addPerson}
            >
                <div>
                    name:
                    <input
                        value={newName} 
                        onChange={handleChangeName}
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
                {persons.map(person => (
                    <p
                        key={person.name}
                    >
                        {person.name}                
                    </p> 
                ))}
            </div>
        </div>
    );
}

export default App;