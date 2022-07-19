const express = require('express');
const cors = require('cors');

require('dotenv').config();

const Note = require('./models/Note');

const app = express();

app.use(express.static('build'));

app.use(cors());

app.use(express.json());

const requestLogger = (request, response, next) => {
    console.log('Method:', request.method);
    console.log('Path:  ', request.path);
    console.log('Body:  ', request.body);
    console.log('---');
    next();
};

app.use(requestLogger);

app.get('/', (request, response) => {
    response.send('<h1>Hello World!</h1>');
});

app.get('/api/notes/:id', (request, response) => {
    Note
        .findById(request.params.id)
        .then(note => {
            if (note) {
                response.json(note);
            } else {
                response.status(404).send({
                    error: 'not found'
                });
            }
        })
        .catch(error => {
            console.log(error)
            response.status(400).send({
                error: 'malformatted id'
            });
        });
});
  
app.get('/api/notes', (request, response) => {
    Note
        .find({})
        .then(notes => {
            response.json(notes);
        });
});

const generateId = () => {
    const maxId = notes.length > 0
      ? Math.max(...notes.map(n => n.id))
      : 0
    return maxId + 1;
};

app.post('/api/notes', (request, response) => {
    const body = request.body;

    if (body.content === undefined) {
        return response.status(400).json({ 
            error: 'content missing' 
        });
    };

    const note = new Note(
        {
            content: body.content,
            important: body.important || false,
            date: new Date()
        }
    );

    note
        .save()
        .then(savedNote => {
            response.json(savedNote);
        });
});

app.delete('/api/notes/:id', (request, response) => {
    const id = Number(request.params.id);
    notes = notes.filter(note => {
        return note.id !== id
    });  
    response.status(204).end();
});

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
};

app.use(unknownEndpoint);

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});