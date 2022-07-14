import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Filter from './components/Filter';
import Content from './components/Content';

function App() {
    const [countries, setCountries] = useState([]);
    const [allCountries, setAllCountries] = useState([]);
    const [newFilter, setNewFilter] = useState('');    

    useEffect(() => {
        axios
            .get('https://restcountries.com/v2/all')
            .then(response => {
                setAllCountries(response.data);
            });
    }, []);

    const handleFilterChange = (event) => {
        setNewFilter(event.target.value);
    }

    const handleSearch = () => {
        const regex = new RegExp( newFilter, 'i' );
        const filteredCountries = () => allCountries.filter(country => country.name.match(regex));
        setCountries(filteredCountries);
    }

    return (
      <div>
          <Filter
              newFilter={newFilter}
              handleFilterChange={handleFilterChange}
              handleSearch={handleSearch}
          />
          <Content
              countries={countries}
              setCountries={setCountries}
          />
      </div>
    );
}

export default App;