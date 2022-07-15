const express = require('express');
const morgan = require('morgan');

const app = express();

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

let persons = [  
    {
        "name": "Arto Hellas",
        "number": "040-123456",
        "id": 1
      },
      {
        "name": "Ada Lovelace",
        "number": "39-44-5323523",
        "id": 2
      },
      {
        "name": "Dan Abramov",
        "number": "12-43-234345",
        "id": 3
      },
      {
        "name": "Mary Poppendieck",
        "number": "39-23-6423122",
        "id": 4
      }
];

app.get('/', (request, response) => {
    response.send('<h1>Hello World!</h1>');
});

app.get('/info', (request, response) => {
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
    response.json(persons);
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

app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id);
    persons = persons.filter(p => {
        return p.id !== id;
    });  
    response.status(204).end();
});

const generateId = () => {
    const min = 1000000;
    const max = 9999999;
    const id = Math.floor(Math.random() * (max - min + 1) + min);
    return id;
}

app.post('/api/persons', (request, response) => {
    const body = request.body;      
    if (!body.name || !body.number) {
        return response.status(400).json({
            error: 'name or number missing'
        });
    };

    const person = persons.find(p => p.name === body.name);
    if (person) {
        response.status(404).send({
            error: 'name must be unique'
        });
    } else {
        const newPerson = {
            name: body.name,
            number: body.number,
            id: generateId(),
        };
        persons = persons.concat(newPerson);
        response.json(newPerson);
    }
});

const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});