// App.js
import React, { useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import TruckModel from './components/TruckModel';

const App = () => {
  const [gyro, setGyro] = useState({ x: 0, y: 0, z: 0 });
  // Optionally, you can also store acceleration if needed:
  const [accel, setAccel] = useState({});

  useEffect(() => {
    const ws = new WebSocket('ws://localhost:8080'); // WebSocket server address

    ws.onopen = () => {
      console.log('Connected to WebSocket server');
    };

    ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        console.log('Received WebSocket data:', data);
        if (data.gyro) setGyro(data.gyro);
        if (data.accel) setAccel(data.accel);
      } catch (error) {
        console.error('Error parsing WebSocket message:', error);
      }
    };

    ws.onclose = () => {
      console.log('WebSocket connection closed');
    };

    ws.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    return () => {
      ws.close();
    };
  }, []);

  return (
    <Canvas style={{width:'100vw',height:'100vh'}} camera={{ position: [-500, 150, 0], fov: 90 }}>
      {/* Basic lighting */}
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      
      {/* Truck Model receives gyro data as a prop */}
      <TruckModel gyro={gyro} />

      <OrbitControls />
    </Canvas>
  );
};

export default App;
