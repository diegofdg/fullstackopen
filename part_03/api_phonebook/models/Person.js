/* eslint-disable no-mixed-spaces-and-tabs */
const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const url = process.env.MONGODB_URI;

mongoose
	.connect(url,
		{
			useNewUrlParser: true,
			useUnifiedTopology: true
		}
	)
	.then(result => {
		console.log('connected to MongoDB');
	})
	.catch((error) => {
		console.log('error connecting to MongoDB:', error.message);
	});

const personSchema = new mongoose.Schema(
	{
		name:
            {
            	type: String,
            	minlength: 8,
            	required: true,
            	unique: true
            },
		number: String
	}
);

personSchema.set('toJSON', {
	transform: (document, returnedObject) => {
		returnedObject.id = returnedObject._id.toString();
		delete returnedObject._id;
		delete returnedObject.__v;
	}
});

personSchema.plugin(uniqueValidator);

module.exports = mongoose.model('Person', personSchema);