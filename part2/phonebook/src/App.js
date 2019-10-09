import React, { useState } from 'react';

function App() {
  const [persons, setPersons] = useState([{ name: 'Arto Hellas' }]);
  const [newName, setNewName] = useState('');

  function handlePersonAdd(e) {
    e.preventDefault();
    const newPerson = {
      name: newName,
    };
    setPersons([...persons, newPerson]);
    setNewName('');
  }

  function handleNameChange(e) {
    setNewName(e.target.value);
  }
  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={handlePersonAdd}>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map(({ name }) => (
        <p key={name}>{name}</p>
      ))}
    </div>
  );
}

export default App;
