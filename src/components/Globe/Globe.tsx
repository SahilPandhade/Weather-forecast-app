import React from 'react';
import { Canvas } from '@react-three/fiber';
import {Suspense} from "react"
import Earth from './components/Earth/Earth';
const Globe: React.FC<{ cityName: string; countryCode: string }> = ({ cityName, countryCode }) => {
  return (
    <div className="globe-container">
        <Canvas>
            <Suspense fallback={null}>
                <Earth/>
            </Suspense>
        </Canvas>
    </div>
  );
};

export default Globe;
