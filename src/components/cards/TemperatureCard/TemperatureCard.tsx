import React from 'react'
import { CardProps } from '../../../Types/Types'
import FlippingCard from '../../FlippingCard/FlippingCard'

const TemperatureCard: React.FC<CardProps> = ({ data }) => {
    return (
        <FlippingCard frontContent={
            <><p>Temp: </p><p>{data.main?.temp + " K"}</p></>}
            backContent={
                <>
                    <label>
                        Temp min:
                        <p>{data.main?.temp_min + " K"}</p>
                    </label>
                    <label>
                        Temp max:
                        <p>{data.main?.temp_max + " K"}</p>
                    </label>
                </>}
        />
    )
}

export default TemperatureCard