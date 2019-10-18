const mongoose = require('mongoose');

if (process.argv.length < 3) {
  console.log('give password as argument');
  process.exit(1);
}

const password = process.argv[2];

const url = `mongodb+srv://fullstack:${password}@cluster0-npwal.mongodb.net/phonebook?retryWrites=true&w=majority`;

mongoose.connect(url, { useNewUrlParser: true });

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
});

const Person = mongoose.model('Person', personSchema);

if (process.argv.length < 4) {
  Person.find({}).then(result => {
    console.log(`phonebook:`);
    result.forEach(({ name, number }) => {
      console.log(name, number);
    });
    mongoose.connection.close();
    process.exit(1);
  });
}

const person = new Person({
  name: process.argv[3],
  number: process.argv[4],
});

person.save().then(({ name, number }) => {
  console.log(`added ${name} number ${number} to phonebook`);
  mongoose.connection.close();
});
// const note = new Note({
//   content: 'HTML is Easy',
//   date: new Date(),
//   important: true,
// });

// note.save().then(response => {
//   console.log('note saved!');
//   mongoose.connection.close();
// });
