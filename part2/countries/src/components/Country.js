import React from 'react';

export default function Country({ name, capital, population, languages, flag }) {
  return (
    <div>
      <h2>{name}</h2>
      <p>capital {capital}</p>
      <p>population {population}</p>
      <h3>languages</h3>
      <ul>
        {languages.map(({ name }) => (
          <li key={name}>{name}</li>
        ))}
      </ul>
      <img style={{ width: '150px' }} src={flag} alt="" />
    </div>
  );
}
