// TruckModel.jsx
import React from 'react';
import { useGLTF } from '@react-three/drei';

const TruckModel = () => {
  // The URL points to the model in the public directory.
  const { scene } = useGLTF('/truck2.glb');

  // Return the loaded scene as a primitive object.
  return <primitive object={scene} dispose={null} />;
};

export default TruckModel;
