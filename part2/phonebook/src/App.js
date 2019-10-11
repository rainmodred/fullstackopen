import React, { useState, useEffect } from 'react';
import personsService from './services/persons';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';

function App() {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [filter, setFilter] = useState('');

  useEffect(() => {
    personsService.getAll().then(persons => {
      setPersons(persons);
    });
  }, []);

  function handlePersonAdd(e) {
    e.preventDefault();
    const person = persons.find(({ name }) => name === newName);

    const newPerson = {
      name: newName,
      number: newNumber,
    };

    if (person) {
      if (
        window.confirm(
          `${person.name} is already added to phonebook, replace the old number with new one?`
        )
      ) {
        const { id } = person;
        personsService.update(id, newPerson).then(returnedPerson => {
          console.log(returnedPerson);
          setPersons(persons.map(person => (person.id !== id ? person : returnedPerson)));
          setNewName('');
          setNewNumber('');
        });
      }
      return;
    }

    personsService.create(newPerson).then(person => {
      setPersons([...persons, person]);
      setNewName('');
      setNewNumber('');
    });
  }

  function handlePersonDelete(id) {
    const { name } = persons.find(person => person.id === id);

    if (window.confirm(`Delete ${name}`)) {
      personsService.deletePerson(id).then(() => {
        setPersons(persons.filter(person => person.id !== id));
      });
    }
  }

  function handleNameChange(e) {
    setNewName(e.target.value);
  }
  function handleNumberChange(e) {
    setNewNumber(e.target.value);
  }
  function handleFilterChange(e) {
    setFilter(e.target.value);
  }

  const personsToShow =
    filter === ''
      ? persons
      : persons.filter(({ name }) => name.toLowerCase().indexOf(filter.toLowerCase()) > -1);

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={filter} onChange={handleFilterChange} />
      <h2>add a new</h2>
      <PersonForm
        newName={newName}
        newNumber={newNumber}
        onSubmit={handlePersonAdd}
        onNameChange={handleNameChange}
        onNumberChange={handleNumberChange}
      />
      <h2>Numbers</h2>
      <Persons onDelete={handlePersonDelete} persons={personsToShow} />
    </div>
  );
}

export default App;
