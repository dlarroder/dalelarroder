import { Environment, OrbitControls } from '@react-three/drei';

export default function SceneEnvironment() {
  return (
    <>
      <OrbitControls
        minPolarAngle={0}
        maxPolarAngle={Math.PI / 2}
        autoRotate
        autoRotateSpeed={0.3}
        makeDefault
      />
      <Environment files="/dancing_hall_1k.hdr" background backgroundBlurriness={1} />
    </>
  );
}
