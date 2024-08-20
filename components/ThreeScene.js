'use client';
import * as THREE from 'three';
import { Canvas } from '@react-three/fiber';
import {
  MeshTransmissionMaterial,
  useGLTF,
  AccumulativeShadows,
  RandomizedLight,
  Environment,
  OrbitControls,
  Center,
} from '@react-three/drei';
import dynamic from 'next/dynamic';

function GelatinousCube() {
  const config = {
    meshPhysicalMaterial: false,
    transmissionSampler: false,
    backside: false,
    samples: 10,
    resolution: 2048,
    transmission: 1,
    roughness: 0.0,
    thickness: 3.5,
    ior: 1.01,
    chromaticAberration: 0.04,
    anisotropy: 0.1,
    distortion: 0.57,
    distortionScale: 0.5,
    temporalDistortion: 0.5,
    clearcoat: 1,
    attenuationDistance: 0.5,
    attenuationColor: '#ffffff',
    color: '#99ecff',
    bg: '#839681',
  };

  const { nodes, materials } = useGLTF('/frozenwhaleL.glb');

  return (
    <group dispose={null}>
      <mesh geometry={nodes.cube1.geometry} position={[-0.56, -1.38, -0.11]}>
        {config.meshPhysicalMaterial ? (
          <meshPhysicalMaterial {...config} />
        ) : (
          <MeshTransmissionMaterial background={new THREE.Color(config.bg)} {...config} />
        )}
      </mesh>
      <mesh
        castShadow
        renderOrder={-100}
        geometry={nodes.cube2.geometry}
        material={materials.cube_mat}
        material-side={THREE.FrontSide}
        position={[-0.56, -1.38, -0.11]}
      />
      <mesh geometry={nodes.cube1_1.geometry} position={[-0.56, -1.34, -0.11]}>
        {config.meshPhysicalMaterial ? (
          <meshPhysicalMaterial {...config} />
        ) : (
          <MeshTransmissionMaterial background={new THREE.Color(config.bg)} {...config} />
        )}
      </mesh>
      <mesh
        castShadow
        renderOrder={-100}
        geometry={nodes.cube2_1.geometry}
        material={materials.cube_mat1}
        material-side={THREE.FrontSide}
        position={[-0.56, -1.34, -0.11]}
      />
      <mesh geometry={nodes.cube1_2.geometry} position={[-0.56, -1.38, -0.11]}>
        {config.meshPhysicalMaterial ? (
          <meshPhysicalMaterial {...config} />
        ) : (
          <MeshTransmissionMaterial background={new THREE.Color(config.bg)} {...config} />
        )}
      </mesh>
      <mesh
        castShadow
        renderOrder={-100}
        geometry={nodes.cube2_2.geometry}
        material={materials.cube_mat2}
        material-side={THREE.FrontSide}
        position={[-0.56, -1.38, -0.11]}
      />
      <mesh geometry={nodes.cube1_3.geometry} position={[-4.8, -1.38, -4.6]}>
        {config.meshPhysicalMaterial ? (
          <meshPhysicalMaterial {...config} />
        ) : (
          <MeshTransmissionMaterial background={new THREE.Color(config.bg)} {...config} />
        )}
      </mesh>
      <mesh
        castShadow
        renderOrder={-100}
        geometry={nodes.cube2_3.geometry}
        material={materials.cube_mat3}
        material-side={THREE.FrontSide}
        position={[-4.8, -1.38, -4.6]}
      />
      <mesh geometry={nodes.球体.geometry} position={[-11.1, 0.38, -9.45]}>
        {config.meshPhysicalMaterial ? (
          <meshPhysicalMaterial {...config} />
        ) : (
          <MeshTransmissionMaterial background={new THREE.Color(config.bg)} {...config} />
        )}
      </mesh>
      <mesh
        geometry={nodes.bubbles.geometry}
        material={materials.cube_bubbles_mat}
        position={[-0.56, -2.28, -0.11]}
      />
      <group position={[-1.0, -2, -1.5]}>
        <mesh geometry={nodes.arrows.geometry} material={materials.weapons_mat} />
      </group>
      <mesh
        geometry={nodes.bluewhale_1.geometry}
        material={materials.bluewhale}
        position={[0.0, -1.5, -0.5]}
        rotation={[0, 1.2 * Math.PI, 0]}
      />
      <mesh
        geometry={nodes.efish.geometry}
        material={materials.efish}
        position={[-0.4, -2.18, 0.1]}
      />
      <mesh
        geometry={nodes.shark.geometry}
        material={materials.shark}
        position={[-0, -1.5, 0.5]}
        rotation={[0, 2.5 * Math.PI, 0]}
      />
      <mesh
        geometry={nodes.turtle.geometry}
        material={materials.turtle}
        position={[-0.5, -1.68, 0.4]}
        rotation={[0, 2.1 * Math.PI, 0]}
      />
    </group>
  );
}

function ThreeScene() {
  return (
    <Canvas shadows camera={{ position: [55, 20, 55], fov: 26 }}>
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
      <Environment files="./dancing_hall_1k.hdr" background backgroundBlurriness={1} />
    </Canvas>
  );
}

// 使用动态导入，确保这个组件只在客户端渲染
export default dynamic(() => Promise.resolve(ThreeScene), {
  ssr: false,
});
