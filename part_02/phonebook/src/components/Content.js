import React from 'react';

const Content = ({ persons, removePerson }) => {
    return (
        <ul>
            {persons.map(person => (
                <div
                    key={person.id}
                >
                    <p>
                        {person.name} {person.number}
                        <button
                            className={person.id}
                            onClick={() => removePerson(person.id)}
                        >
                            delete
                        </button>
                    </p>
                </div>
            ))}
        </ul>
    );
}
 
export default Content;