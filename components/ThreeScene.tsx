'use client';

import * as THREE from 'three';
import { Canvas } from '@react-three/fiber';
import {
  useGLTF,
  AccumulativeShadows,
  RandomizedLight,
  Environment,
  OrbitControls,
  Center,
} from '@react-three/drei';
export default function ThreeScene() {
  return (
    <Canvas
      shadows
      camera={{ position: [55, 20, 55], fov: 26 }}
      style={{ width: '100vw', height: '100vh' }}
    >
      <ambientLight intensity={Math.PI} />
      <group position={[0, -2.5, 0]}>
        <Center top>
          <GelatinousCube />
        </Center>
        <AccumulativeShadows
          temporal
          frames={100}
          alphaTest={0.9}
          color="#3ead5d"
          colorBlend={1}
          opacity={0.8}
          scale={40}
        >
          <RandomizedLight
            radius={10}
            ambient={0.5}
            intensity={Math.PI}
            position={[2.5, 8, -2.5]}
            bias={0.001}
          />
        </AccumulativeShadows>
      </group>
      <OrbitControls
        minPolarAngle={0}
        maxPolarAngle={Math.PI / 2}
        autoRotate
        autoRotateSpeed={0.3}
        makeDefault
      />
      <Environment files="/dancing_hall_1k.hdr" background backgroundBlurriness={1} />
    </Canvas>
  );
}

function GelatinousCube() {
  const { nodes, materials } = useGLTF('./bluewhale.glb');
  console.log(nodes); // 检查 nodes 对象中的所有几何体

  return (
    <group dispose={null}>
      <mesh
        geometry={(nodes.bluewhale_1 as THREE.Mesh).geometry}
        material={materials.bluewhale}
        position={[-0.5, -1.68, 0.4]}
        rotation={[0, 2.1 * Math.PI, 0]}
      />
    </group>
  );
}
