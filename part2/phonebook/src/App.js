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
    if (persons.some(({ name }) => name.toLowerCase() === newName.toLowerCase())) {
      alert(`${newName} is already added to phonebook`);
      return;
    }
    const newPerson = {
      name: newName,
      number: newNumber,
    };

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
