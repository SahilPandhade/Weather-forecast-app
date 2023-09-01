import React from 'react'
import FlippingCard from '../../FlippingCard/FlippingCard'
import { CardProps } from '../../../Types/Types';
const WeatherInfoCard: React.FC<CardProps> = ({ data }) => {
    return (
        <FlippingCard frontContent={
            <>
                {data.weather && <>
                    <p>{data.weather[0]?.main}{' '}<img src={`https://openweathermap.org/img/wn/${data.weather[0]?.icon}@2x.png`} alt='Weather-icon' /> </p>
                </>}
            </>}
            backContent={
                <>
                    {data.weather && <>
                        <label>Description: </label>
                        <p>{data.weather[0]?.description}</p>
                    </>
                    }
                </>}
        />
    )
}

export default WeatherInfoCard