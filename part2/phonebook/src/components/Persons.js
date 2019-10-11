import React from 'react';

export default function Persons({ persons }) {
  return (
    <>
      {persons.map(({ name, number }) => (
        <p key={name}>
          {name} {number}
        </p>
      ))}
    </>
  );
}
