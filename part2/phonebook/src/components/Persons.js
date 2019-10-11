import React from 'react';

export default function Persons({ persons, onDelete }) {
  return (
    <>
      {persons.map(({ name, number, id }) => (
        <p key={id}>
          {name} {number}
          <button onClick={() => onDelete(id)}>delete</button>
        </p>
      ))}
    </>
  );
}
