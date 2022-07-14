import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Filter = ({ newFilter, handleFilterChange, handleSearch }) => {
    return (
        <div>
            find countries
            <input
                value={newFilter}
                onChange={handleFilterChange}
            />
            <button
                onClick={handleSearch}
            >
                filter
            </button>
        </div>
    );
}

const Content = ({ countries }) => {
    if (countries.length > 10) {
        return (
            <p>
                Too many matches, specify another filter
            </p>
        );
    } else if ((countries.length > 1 && countries.length < 10) || countries.length === 0) {
        return (
            <ul>
                {countries.map((country) =>
                    <li
                        key={country.alpha3Code}
                    >
                        {country.name}
                    </li>
                )}
            </ul>
        );
    } else {
        return (
            <Country
                country={countries[0]}
            />
        );
    }
}

const Country = ({ country }) => {    
    const { name, capital, population, languages, flag } = country;
    const newPopulation = new Intl.NumberFormat().format(population)
    return (
        <div>
            <h1>{name}</h1>
            <p>capital: {capital}</p>
            <p>population: {newPopulation}</p>
            <h2>Spoken languages</h2>
            <ul>
                {languages.map(language => 
                    <li 
                        key={language.name}
                    >
                        {language.name}
                    </li>
                )}
            </ul>
            <img src={flag} alt="Country flag"></img>            
        </div>
    );
}

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
          />
      </div>
    );
}

export default App;