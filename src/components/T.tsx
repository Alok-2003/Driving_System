import React, { useRef } from 'react';
import { useGLTF } from '@react-three/drei';

const TruckModel = () => {
  const truckRef = useRef();

  // Load the GLB model from the public folder
  const { scene } = useGLTF('/truck2.glb');

  // Adjust the model's scale and position as needed
  scene.scale.set(1, 1, 1);
  scene.position.set(0, 0, 0);
  
  return <primitive object={scene} ref={truckRef} dispose={null} />;
};

export default TruckModel;


// this is trial -2