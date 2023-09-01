import React, { useEffect } from 'react'
import './LocationData.css'
import { useWeatherData } from '../../hooks/useWeatherData';
import FlippingCard from '../FlippingCard/FlippingCard';
import WeatherInfoCard from '../cards/WeatherInfoCard/WeatherInfoCard';
import TemperatureCard from '../cards/TemperatureCard/TemperatureCard';
import PressureCard from '../cards/PressureCard/PressureCard';
import CityCard from '../cards/CityCard/CityCard';
interface LocationProps {
    cityName: string;
    countryCode: string;
}

const LocationData: React.FC<LocationProps> = ({ cityName, countryCode }) => {
    const { data, loading, error,rateLimitExceeded } = useWeatherData(cityName, countryCode);

    if (loading) {
        return <div className='loading'>Loading...</div>;
    }

    if (error) {
        return <div className='error'>Error: {error}</div>;
    }
    if (rateLimitExceeded) {
        return <div className='error'>API Limit Exceeded: {error}</div>;
    }

    if (!data) {
        return null;
    }
    return (
        <div className="weather-data-card">
            <CityCard data={data} />
            <WeatherInfoCard data={data} />
            <TemperatureCard data={data} />
            <PressureCard data={data} />
        </div>
    )
}

export default LocationData