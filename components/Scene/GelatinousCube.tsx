import * as THREE from 'three';
import { MeshTransmissionMaterial, useGLTF } from '@react-three/drei';
import { useControls } from 'leva';

export default function GelatinousCube() {
  const config = useControls({
    meshPhysicalMaterial: false,
    transmissionSampler: false,
    backside: false,
    samples: { value: 10, min: 1, max: 32, step: 1 },
    resolution: { value: 2048, min: 256, max: 2048, step: 256 },
    transmission: { value: 1, min: 0, max: 1 },
    roughness: { value: 0.0, min: 0, max: 1, step: 0.01 },
    thickness: { value: 3.5, min: 0, max: 10, step: 0.01 },
    ior: { value: 1.01, min: 1, max: 5, step: 0.01 },
    chromaticAberration: { value: 0.04, min: 0, max: 1 },
    anisotropy: { value: 0.1, min: 0, max: 1, step: 0.01 },
    distortion: { value: 0.57, min: 0, max: 1, step: 0.01 },
    distortionScale: { value: 0.5, min: 0.01, max: 1, step: 0.01 },
    temporalDistortion: { value: 0.5, min: 0, max: 1, step: 0.01 },
    clearcoat: { value: 1, min: 0, max: 1 },
    attenuationDistance: { value: 0.5, min: 0, max: 10, step: 0.01 },
    attenuationColor: '#ffffff',
    color: '#99ecff',
    bg: '#839681',
  });

  const { nodes, materials } = useGLTF('./frozenwhaleL.glb');
  console.log(nodes); // 检查 nodes 对象中的所有几何体
  console.log(materials);

  return (
    <group dispose={null}>
      <mesh geometry={(nodes.cube1 as THREE.Mesh).geometry} position={[-0.56, -1.38, -0.11]}>
        {config.meshPhysicalMaterial ? (
          <meshPhysicalMaterial {...config} />
        ) : (
          <MeshTransmissionMaterial background={new THREE.Color(config.bg)} {...config} />
        )}
      </mesh>
      <mesh
        castShadow
        renderOrder={-100}
        geometry={(nodes.cube2 as THREE.Mesh).geometry}
        material={materials.cube_mat}
        material-side={THREE.FrontSide}
        position={[-0.56, -1.38, -0.11]}
      />
      <group position={[-1.0, -2, -1.5]}>
        <mesh
          geometry={(nodes.arrows as THREE.Mesh).geometry}
          material={materials.weapons_mat as THREE.Material}
        />
      </group>
    </group>
  );
}
