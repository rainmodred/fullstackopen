import React, { useState } from 'react';

function App() {
  const [persons, setPersons] = useState([{ name: 'Arto Hellas', number: 123456789 }]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');

  function handlePersonAdd(e) {
    e.preventDefault();
    if (persons.some(({ name }) => name.toLowerCase() === newName.toLowerCase())) {
      alert(`${newName} is already added to phonebook`);
      return;
    }
    const newPerson = {
      name: newName,
    };
    setPersons([...persons, newPerson]);
    setNewName('');
  }

  function handleNameChange(e) {
    setNewName(e.target.value);
  }
  function handleNumberChange(e) {
    setNewNumber(e.target.value);
  }
  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={handlePersonAdd}>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          number: <input value={newNumber} onChange={handleNumberChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map(({ name, number }) => (
        <p key={name}>
          {name} {number}
        </p>
      ))}
    </div>
  );
}

export default App;
