import React from 'react'
import { CardProps } from '../../../Types/Types'
import FlippingCard from '../../FlippingCard/FlippingCard'

const CityCard: React.FC<CardProps> = ({ data }) => {
    return (
        <FlippingCard frontContent={
            <>
                <p>{data.name}</p>
                <p>{data.sys?.country}</p>
            </>}
            backContent={
                <>
                    <label>
                        Lat:
                        <p>{data.coord?.lat}</p>
                    </label>
                    <label>
                        Long:
                        <p>{data.coord?.lon}</p>
                    </label>
                </>}
        />
    )
}

export default CityCard