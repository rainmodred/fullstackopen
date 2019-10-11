import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Country from './components/Country';

function App() {
  const [countries, setCounties] = useState([]);
  const [search, setSearch] = useState('');
  useEffect(() => {
    axios.get('https://restcountries.eu/rest/v2/all').then(response => {
      setCounties(response.data);
    });
  }, []);

  function handleSearch(e) {
    setSearch(e.target.value);
  }

  function handleCounrtySelect(name) {
    setSearch(name);
  }

  const filter = countries.filter(
    ({ name }) => name.toLowerCase().indexOf(search.toLowerCase()) > -1
  );

  function renderCountries() {
    if (filter.length === 1) {
      return <Country {...filter[0]} />;
    }
    if (filter.length <= 10) {
      return filter.map(({ name }) => {
        return (
          <p key={name}>
            {name} <button onClick={() => handleCounrtySelect(name)}>show</button>
          </p>
        );
      });
    }
    if (filter.length > 10) return <p>Too many matches, specify another filter</p>;
  }

  return (
    <>
      <div>
        <label>
          find countries <input value={search} onChange={handleSearch} />
        </label>
      </div>
      {renderCountries()}
    </>
  );
}

export default App;
