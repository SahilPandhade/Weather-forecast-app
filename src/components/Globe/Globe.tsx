import React from 'react';
import { Canvas } from '@react-three/fiber';
import { Suspense } from "react"
import Earth from './components/Earth/Earth';
import { geoOrthographic } from 'd3-geo';
import { useWeatherData } from '../../hooks/useWeatherData';
const Globe: React.FC<{ cityName: string; countryCode: string }> = ({ cityName, countryCode }) => {
    const {data} = useWeatherData(cityName,countryCode)
    return (
        <div className="globe-container">
            <Canvas>
                <Suspense fallback={null}>
                    <Earth latitude={data?.coord?.lat ?? 0} longitude={data?.coord?.lon ?? 0}/>
                </Suspense>
            </Canvas>
        </div>
    );
};

export default Globe;
