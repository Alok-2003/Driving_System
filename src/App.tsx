// App.jsx
import React from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import TruckModel from './components/TruckModel';

function App() {
  return (
    <Canvas style={{
      width: '100vw',
      height: '100vh',
    }} camera={{ position: [-500, 250, 0], fov: 90 }}>
      {/* Ambient lighting for overall illumination */}
      <ambientLight intensity={0.5} />
      {/* Add any directional lights for shadows or highlights */}
      <directionalLight position={[10, 10, 5]} intensity={1} />
      
      {/* Render the Truck model */}
      <TruckModel />
      
      {/* OrbitControls allow you to orbit around the scene with your mouse */}
      <OrbitControls />
    </Canvas>
  );
}

export default App;
