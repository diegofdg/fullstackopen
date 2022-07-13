import React, { useState } from 'react';
import Note from './components/Note';

const App = (props) => {
    const [notes, setNotes] = useState(props.notes);
    const [newNote, setNewNote] = useState('');

    const addNote = (e) => {
        e.preventDefault();
        const noteObject = {
            content: newNote,
            date: new Date().toISOString(),
            important: Math.random() < 0.5,
            id: notes.length + 1,
        };
        setNotes(notes.concat(noteObject));
        setNewNote('');
    }

    const handleNoteChange = (e) => {
        setNewNote(e.target.value);
    }
    return (
        <div>
            <h1>Notes</h1>
            <ul>
                {notes.map(note =>
                    <Note
                        key={note.id}
                        note={note}
                    />
                )}
            </ul>
            <form
                onSubmit={addNote}
            >
                <input 
                    value={newNote} 
                    onChange={handleNoteChange}
                />
                <button
                    type="submit"
                >
                    save
                </button>
            </form> 
        </div>
    );
}

export default App;