const mongoose = require("mongoose");

if (process.argv.length !== 3 && process.argv.length !== 5) {
    console.log('Please provide the password as an argument: node mongo.js <password>');
    process.exit(1);
}
const password = process.argv[2];

const url = `mongodb+srv://root:${password}@cluster0.juttt.mongodb.net/phonebook?retryWrites=true&w=majority`;

mongoose.connect(url, 
    {
        useNewUrlParser: true, 
        useUnifiedTopology: true
    }
);

const personSchema = new mongoose.Schema(
    {
        name: String,
        number: String
    }
);

const Person = mongoose.model("Person", personSchema);

if (process.argv.length === 3) {
    console.log("phonebook:");
    Person
        .find({})
        .then(result => {
            result.forEach(p => {
                console.log(p.name, p.number);
            });
        mongoose.connection.close();
        });
    return;
} else if (process.argv.length === 5){
    const name = process.argv[3];
    const number = process.argv[4];

    const person = new Person(
        {
            name,
            number
        }
    );

    person
        .save()
        .then(item => {
            console.log(`Added ${item.name} number ${item.number} to phonebook`);
            mongoose.connection.close();
        });
    return;
}