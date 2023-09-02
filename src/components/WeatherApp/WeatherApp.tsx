import React, { useState } from 'react'
import './WeatherApp.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import LocationData from '../LocationData/LocationData';
import Globe from '../Globe/Globe';
const WeatherApp = () => {
    const [inputValue, setInputValue] = useState('');
    const [cityName, setCityName] = useState<string>('');
    const [countryCode, setCountryCode] = useState<string>('')
    const [error, setError] = useState('');
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
        setError('');
    }
    const handleSearch = () => {
        const inputParts = inputValue.split(',');

        if (inputParts.length !== 2) {
            setError('Please enter city name and country code separated by a comma.');
            return;
        }
        const [newCityName, newCountryCode] = inputParts;

        if (!newCityName.trim() || !newCountryCode.trim()) {
            setError('Both city name and country code are required.');
            return;
        }
        setCityName(newCityName.trim());
        setCountryCode(newCountryCode.trim())
    };

    return (
        <>
            <div className='weather-app-container'>
                <div className='weather-app-title'>Weather Forecasting App</div>
                <div className='city-input-container'>
                    <input name='city-input'
                        placeholder='Enter the City Name,Country Code'
                        value={inputValue}
                        onChange={handleInputChange}
                    />
                    <button className='search-btn' onClick={handleSearch} disabled={inputValue === ''}>Search <FontAwesomeIcon icon={faMagnifyingGlass} /></button>
                    {error && <div className='error-message'>{error}</div>}
                </div>

            </div>
            {cityName && countryCode &&
                <>
                    <LocationData cityName={cityName} countryCode={countryCode} />
                    
                </>
            }
            <Globe cityName={cityName} countryCode={countryCode} />
        </>
    )
}

export default WeatherApp