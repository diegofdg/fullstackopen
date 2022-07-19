const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

require('dotenv').config();

const Person = require('./models/Person');

const app = express();

app.use(express.static('build'));

app.use(cors());

app.use(morgan(function (tokens, req, res) {
    const name = req.body.name;
    const number = req.body.number;
    let person = JSON.stringify({ name, number });

    if (name===undefined || number===undefined) {
        person = '';
    }

    return [
        tokens.method(req, res),
        tokens.url(req, res),
        tokens.status(req, res),
        tokens.res(req, res, 'content-length'), '-',
        tokens['response-time'](req, res), 'ms',
        person
    ].join(' ')
}));

app.use(express.json());

const errorHandler = (error, request, response, next) => {
    console.error(error.message);  
    if (error.name === 'CastError') {
        return response.status(400).send({
            error: 'malformatted id'
        });
    }  
    next(error);
}

app.get('/', (request, response) => {
    response.send('<h1>Hello World!</h1>');
});

app.get('/info', async (request, response) => {
    const persons = await Person.find({});
        
    response.send(
        `<div>
            <p>Phonebook has info for ${persons.length} people</p>
        </div>
        <div>
            <p>${new Date()}</p>
        </div>`
    );
});

app.get('/api/persons', (request, response) => {
    Person
        .find({})
        .then(person => {
            response.json(person);
        })
});

app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id);
    const person = persons.find(p => {
        return p.id === id;
    });
    if (person) {
        response.json(person);
    } else {
        response.status(404).end();
    }
});

app.put('/api/persons/:id', (request, response, next) => {
    const body = request.body;    
  
    const person = {
        name: body.name,
        number: body.number,
    }
  
    Person.findByIdAndUpdate(request.params.id, person, {
        new: true
    })
        .then(updatedPerson => {
            response.json(updatedPerson);
        })
        .catch(error => {
            next(error);
        });
});

app.delete('/api/persons/:id', (request, response, next) => {
    Person
        .findByIdAndRemove(request.params.id)
        .then(result => {
            response.status(204).end();
        })
        .catch(error => {
            console.log(error);
        });
});

app.post('/api/persons', (request, response) => {
    const body = request.body;
    if (body.name === undefined || body.number === undefined) {
        return response.status(400).json({ 
            error: 'name or number missing' 
        });
    };
    const person = new Person(
        {
            name: body.name,
            number: body.number
        }
    );
    person
        .save()
        .then(savedPerson => {
            response.json(savedPerson);
        })
        .catch(error => {
            response.json(error);
        });    
});

app.use(errorHandler);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});