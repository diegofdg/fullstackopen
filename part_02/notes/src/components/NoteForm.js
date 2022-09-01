import React, { useState } from 'react';

const NoteForm = ({ createNote }) => {
	const [newNote, setNewNote] = useState('');

	const handleChange = (e) => {
		setNewNote(e.target.value);
	};

	const addNote = (e) => {
		e.preventDefault();
		createNote({
			content: newNote,
			important: false,
		});
		setNewNote('');
	};
	return (
		<div>
			<h2>Create a new note</h2>
			<form
				onSubmit={addNote}
			>
				<input
					id='textNote'
					value={newNote}
					onChange={handleChange}
				/>
				<button
					type="submit"
				>save
				</button>
			</form>
		</div>
	);
};

export default NoteForm;