import React, { useRef } from 'react'
import { OrbitControls, Stars } from '@react-three/drei'
import * as THREE from 'three'
import EarthDayMap from '../../../../assets/8k_earth_daymap.jpg'
import EarthNormalMap from '../../../../assets/8k_earth_normal_map.jpg'
import EarthSpecularMap from '../../../../assets/8k_earth_specular_map.jpg'
import EarthCloudsMap from '../../../../assets/8k_earth_clouds.jpg'
import { useFrame, useLoader } from '@react-three/fiber'
import { Mesh, TextureLoader } from 'three'

const Earth = () => {
    const earthRef = useRef<Mesh>(null)
    const cloudsRef = useRef<Mesh>(null)
    const [colorMap, normalMap, specularMap, cloudsMap] = useLoader(TextureLoader, [EarthDayMap, EarthNormalMap, EarthSpecularMap, EarthCloudsMap])
    
    useFrame(({clock})=>{
        const elapsedTime = clock.getElapsedTime();
        if(earthRef.current && cloudsRef.current){
            earthRef.current.rotation.y = elapsedTime / 6;
            cloudsRef.current.rotation.y = elapsedTime / 6;
        }
    })
    return (
        <>
            {/* <ambientLight intensity={5} /> */}
            <pointLight color="#f6f3ea" position={[2,0,5]} intensity={10}/>
            <Stars radius={300} depth={60} count={1000} factor={7} saturation={0} fade={true} />
            <mesh ref={cloudsRef} position={[0,0,3]}>
                <sphereGeometry args={[1.005, 32, 32]} />
                <meshPhongMaterial
                    map={cloudsMap}
                    opacity={0.4}
                    depthWrite={true}
                    transparent={true}
                    side={THREE.DoubleSide} />
            </mesh>
            <mesh ref={earthRef} position={[0,0,3]}>
                <sphereGeometry args={[1, 32, 32]} />
                <meshPhongMaterial specularMap={specularMap} />
                <meshStandardMaterial
                    map={colorMap}
                    normalMap={normalMap}
                    metalness={0.4}
                    roughness={0.7} />
                {/* <OrbitControls
                    enableZoom
                    enableRotate
                    zoomSpeed={0.6}
                    /> */}
            </mesh>
        </>
    )
}

export default Earth