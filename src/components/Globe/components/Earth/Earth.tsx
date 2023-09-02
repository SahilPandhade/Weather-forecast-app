import React, { useEffect, useRef, useState } from 'react'
import { Stars } from '@react-three/drei'
import * as THREE from 'three'
import EarthDayMap from '../../../../assets/8k_earth_daymap.jpg'
import EarthNormalMap from '../../../../assets/8k_earth_normal_map.jpg'
import EarthSpecularMap from '../../../../assets/8k_earth_specular_map.jpg'
import EarthCloudsMap from '../../../../assets/8k_earth_clouds.jpg'
import { useFrame, useLoader, useThree } from '@react-three/fiber'
import { Mesh, TextureLoader } from 'three'
import Loader from '../../../Loader/Loader'
interface Props {
    latitude: number;
    longitude: number;
    handleGlobeLoaded:()=>void;
}
const Earth: React.FC<Props> = ({ latitude, longitude,handleGlobeLoaded }) => {
    const earthRef = useRef<Mesh>(null)
    const cloudsRef = useRef<Mesh>(null)
    const markerRef = useRef<Mesh>(null);
    const [colorMap, normalMap, specularMap, cloudsMap] = useLoader(TextureLoader, [EarthDayMap, EarthNormalMap, EarthSpecularMap, EarthCloudsMap])

    const earthRadius = 1;
    //const [rotationStopped, setRotationStopped] = useState(false);
    const xRef = useRef(0);
    const yRef = useRef(0);
    const zRef = useRef(0);

    useEffect(() => {
        const latRad = latitude * (Math.PI / 180);
        const lonRad = -longitude * (Math.PI / 180);
        xRef.current = Math.cos(latRad) * Math.cos(lonRad) * earthRadius;
        yRef.current = Math.sin(latRad) * earthRadius;
        zRef.current = Math.cos(latRad) * Math.sin(lonRad) * earthRadius;
        handleGlobeLoaded()
    }, [latitude, longitude]);

    useFrame(({ clock }) => {
        const elapsedTime = clock.getElapsedTime();

        if (earthRef.current && cloudsRef.current) {
            earthRef.current.rotation.y = elapsedTime / 3;
            cloudsRef.current.rotation.y = elapsedTime / 3;
        }
        if (markerRef.current) {
            markerRef.current.position.set(xRef.current, yRef.current, zRef.current);
        }
    })

    return (
        <>
            <ambientLight intensity={5} />
                {/* <pointLight color="#f6f3ea" position={[2,0,3]} intensity={10}/> */}
                <Stars radius={300} depth={60} count={1000} factor={7} saturation={0} fade={true} />
                <mesh ref={cloudsRef} position={[0, 0, 3]}>
                    <sphereGeometry args={[1.005, 32, 32]} />
                    <meshPhongMaterial
                        map={cloudsMap}
                        opacity={0.4}
                        depthWrite={true}
                        transparent={true}
                        side={THREE.DoubleSide} />
                </mesh>
                <mesh ref={earthRef} position={[0, 0, 3]}>
                    <sphereGeometry args={[1, 32, 32]} />
                    <meshPhongMaterial specularMap={specularMap} />
                    <meshStandardMaterial
                        map={colorMap}
                        normalMap={normalMap}
                        metalness={0.4}
                        roughness={0.7} />
                    <mesh ref={markerRef}>
                        <sphereGeometry args={[0.015, 32, 32]} />
                        <meshBasicMaterial color="red" />
                    </mesh>
                    {/* <OrbitControls /> */}
                </mesh>
        </>
    )
}

export default Earth