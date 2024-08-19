'use client';

import { Canvas } from '@react-three/fiber';
import GelatinousCube from './GelatinousCube';
import Lighting from './Lighting';
import SceneEnvironment from './Environment';
import { Center } from '@react-three/drei';

export default function Index() {
  return (
    <Canvas
      shadows
      camera={{ position: [55, 20, 55], fov: 26 }}
      style={{ width: '100vw', height: '100vh' }}
    >
      <Lighting />
      <group position={[0, -2.5, 0]}>
        <Center top>
          <GelatinousCube />
        </Center>
      </group>
      <SceneEnvironment />
    </Canvas>
  );
}
