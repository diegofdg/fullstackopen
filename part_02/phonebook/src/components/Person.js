import React from 'react';

const Person = ({ addPerson, newName, newNumber, handleChangeName, handleChangeNumber }) => {
    return (
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
                number:
                    <input
                        value={newNumber}
                        onChange={handleChangeNumber}
                    />
            </div>
            <div>
                <button
                    type="submit"
                >add
                </button>
            </div>
        </form>
    );
}
 
export default Person;