import React from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import TruckModel from './components/TruckModel';

const App = () => {
  return (
    <Canvas style={{ height: '100vh', width: '100vw' }} camera={{ position: [0, -50, -500], fov: 90 }}>
      {/* Lighting Setup */}
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} intensity={1} />
      
      {/* Render the Truck Model */}
      <TruckModel />
      
      {/* Add OrbitControls to allow user interaction */}
      <OrbitControls />
    </Canvas>
  );
};

export default App;

// this is trial -2