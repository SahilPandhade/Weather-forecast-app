import React, { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { Suspense } from "react"
import Earth from './components/Earth/Earth';
import { useWeatherData } from '../../hooks/useWeatherData';
import Loader from '../Loader/Loader';
const Globe: React.FC<{ cityName: string; countryCode: string }> = ({ cityName, countryCode }) => {
    const { data } = useWeatherData(cityName, countryCode)
    const [texturesLoaded, setTexturesLoaded] = useState(false);
    const handleGlobeLoaded = () => {
        setTexturesLoaded(true)
        console.log(texturesLoaded)
    }
    return (
        <div className="globe-container">
            {!texturesLoaded && (<Loader />) }
           <Canvas>
                <Suspense fallback={null}>
                    <Earth latitude={data?.coord?.lat ?? 0} longitude={data?.coord?.lon ?? 0} handleGlobeLoaded={handleGlobeLoaded} />
                </Suspense>
            </Canvas>
        </div>
    );
};

export default Globe;
