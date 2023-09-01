import React from 'react'
import FlippingCard from '../../FlippingCard/FlippingCard'
import { CardProps } from '../../../Types/Types'

const PressureCard: React.FC<CardProps> = ({ data }) => {
    return (
        <FlippingCard frontContent={
            <>
                <label>Pressure: <p>{data.main?.pressure}{' '}hPa</p></label>

                <label>Humidity: <p>{data.main?.humidity}{' %'}</p></label>
            </>
        }
            backContent={
                <>
                    <label>Rain (1h): <p>{data.rain?.['1h'] ?? 'NA'}</p></label>
                    <label>Rain (3h): <p>{data.rain?.['3h'] ?? 'NA'}</p></label>
                    <label>Clouds(all): <p>{data.clouds?.all + " %"}</p></label>
                </>
            }
        />
    )
}

export default PressureCard