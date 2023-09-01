import React from 'react'
import './LocationData.css'
import { useWeatherData } from '../../hooks/useWeatherData';
import FlippingCard from '../FlippingCard/FlippingCard';
interface LocationProps {
    cityName: string;
    countryCode: string;
}

const LocationData: React.FC<LocationProps> = ({ cityName, countryCode }) => {
    const { data, loading, error } = useWeatherData(cityName, countryCode);
    if (loading) {
        return <div className='loading'>Loading...</div>;
    }

    if (error) {
        return <div className='error'>Error: {error}</div>;
    }

    if (!data) {
        return null;
    }
    return (
        <div className="weather-data-card">
            <FlippingCard frontContent={
                <>
                    <h2>{data.name}</h2>
                    <p>{data.sys?.country}</p>
                </>}
                backContent={
                    <>
                        <p>Lat: {data.coord?.lat}</p>
                        <p>Long: {data.coord?.lon}</p>
                    </>}
            />
            <FlippingCard frontContent={
                <>
                    {data.weather && <>
                        <p>{data.weather[0]?.main}  <img src={`https://openweathermap.org/img/wn/${data.weather[0]?.icon}@2x.png`} /> </p> 
                    </>}
                </>}
                backContent={
                    <>
                        {data.weather && <p>{"Description: " + data.weather[0]?.description}</p>}
                    </>}
            />
            <FlippingCard frontContent={
                <>{"Temp: " + data.main?.temp+" K"}</>}
                backContent={
                    <>
                        <p>Temp min: {data.main?.temp_min+" K"}</p>
                        <p>Temp max: {data.main?.temp_max+" K"}</p>
                    </>}
            />
            <FlippingCard frontContent={
                <><p>Pressure: {data.main?.pressure+" hPa"}</p><p>Humidity: {data.main?.humidity+" %"}</p></>}
                backContent={
                    <>
                        <p>Rain (1h): {data.rain?.['1h'] ?? 'NA'}</p>
                        <p>Rain (3h): {data.rain?.['3h'] ?? 'NA'}</p>
                        <p>Clouds(all): {data.clouds?.all+" %"}</p>
                    </>
                }
            />
        </div>
    )
}

export default LocationData