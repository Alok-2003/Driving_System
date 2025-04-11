// TruckModel.jsx
import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';

const TruckModel = ({ gyro }) => {
  const truckRef = useRef();
  const { scene } = useGLTF('/truck2.glb');

  // Optionally adjust the model’s scale and position
  scene.scale.set(1, 1, 1);
  scene.position.set(0, 0, 0);

  // Update the truck's rotation with the gyro values each frame.
  // Here we assume the gyro data is in radians.
  // You might want to smooth or scale these values depending on your data.
  useFrame(() => {
    if (truckRef.current) {
      truckRef.current.rotation.x = gyro.x;
      truckRef.current.rotation.y = gyro.y;
      truckRef.current.rotation.z = gyro.z;
    }
  });

  return <primitive object={scene} ref={truckRef} dispose={null} />;
};

export default TruckModel;
