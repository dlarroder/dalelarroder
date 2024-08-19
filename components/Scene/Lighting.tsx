import { AccumulativeShadows, RandomizedLight } from '@react-three/drei';

export default function Lighting() {
  return (
    <>
      <ambientLight intensity={Math.PI} />
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
    </>
  );
}
