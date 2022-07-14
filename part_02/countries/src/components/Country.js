import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Country = ({ country }) => {
    const [ weather, setWeather ] = useState([]);
    const { name, capital, population, languages, flag } = country;
    const newPopulation = new Intl.NumberFormat().format(population);
    const kelvin = 273.15;
    
    useEffect(() => {
        axios
            .get(`https://api.openweathermap.org/data/2.5/weather?q=${capital}&appid=${process.env.REACT_APP_API_KEY}`)
            .then(response => {
                const apiResponse = response.data;
                setWeather(apiResponse);
                console.log(apiResponse);
                
            })
            .catch(error => {
                console.log('fail: ', error);
        });
    },[capital]);

    if(weather.main){
        return (
            <div>
                <h1>{name}</h1>
                <p><strong>capital: </strong>{capital}</p>
                <p><strong>population: </strong>{newPopulation}</p>
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
                <img
                    src={flag}
                    alt="Country flag"
                ></img>
                <h2>Weather in {capital}</h2>
                <p><strong>temperature: </strong>{parseFloat(weather.main.temp-kelvin,10).toFixed(2)} °C</p>
                <p><strong>weather description: </strong>{weather.weather[0].description}</p>
                <img
                    src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}.png`}
                    alt="weather icon"
                ></img>
                <p><strong>wind:</strong> {weather.wind.speed} meter/sec, direction {weather.wind.deg}°</p>
            </div>
        );
    }

    return (
        <div>
            <h1>{name}</h1>
            <p><strong>capital: </strong>{capital}</p>
            <p><strong>population: </strong>{newPopulation}</p>
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
            <img 
                src={flag} 
                alt="Country flag"
            >
            </img>
        </div>
    );
}

export default Country;