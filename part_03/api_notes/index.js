const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const url = process.env.MONGODB_URI;

mongoose.connect(url, 
    {
        useNewUrlParser: true, 
        useUnifiedTopology: true
    }
);

const noteSchema = new mongoose.Schema(
    {
        content: String,
        date: Date,
        important: Boolean,
    }
);

noteSchema.set('toJSON', {
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString()
      delete returnedObject._id
      delete returnedObject.__v
    }
});

const Note = mongoose.model('Note', noteSchema);

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
    const id = Number(request.params.id);
    const note = Note.find(note => {
        return note.id === id;
    });
    if (note) {
        response.json(note);
    } else {
        response.status(404).end();
    }
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

    if (!body.content) {
        return response.status(400).json({ 
            error: 'content missing' 
        });
    };

    const note = {
        content: body.content,
        important: body.important || false,
        date: new Date(),
        id: generateId(),
    };

    notes = notes.concat(note);

    response.json(note);
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