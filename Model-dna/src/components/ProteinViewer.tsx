"use client";

import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";

type ProteinModelProps = {
  position?: [number, number, number];
};

// ✅ Helper component to draw a line between two points
const ConnectLine: React.FC<{
  start: [number, number, number];
  end: [number, number, number];
}> = ({ start, end }) => {
  return (
    <line>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={2}
          array={new Float32Array([...start, ...end])}
          itemSize={3}
        />
      </bufferGeometry>
      <lineBasicMaterial color="magenta" />
    </line>
  );
};

const ProteinModel: React.FC<ProteinModelProps> = ({
  position = [0, 0, 0],
}) => {
  const groupRef = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (groupRef.current) {
      groupRef.current.rotation.y = t * 0.9;
      groupRef.current.rotation.x = Math.sin(t * 0.4) * 0.4;
    }
  });

  const segments: React.ReactElement[] = [];

  for (let i = 0; i < 100; i++) {
    const angle = i * 0.3;
    const baseX = Math.sin(angle) * 2;
    const baseY = i * 0.12;
    const baseZ = Math.cos(angle) * 2;

    // Offset direction for "pairing"
    const offset = 0.15;
    const offsetDir = new THREE.Vector3(
      Math.cos(angle),
      0,
      -Math.sin(angle)
    ).normalize();

    const pos1 = new THREE.Vector3(baseX, baseY, baseZ).add(
      offsetDir.clone().multiplyScalar(offset)
    );
    const pos2 = new THREE.Vector3(baseX, baseY, baseZ).add(
      offsetDir.clone().multiplyScalar(-offset)
    );

    segments.push(
      <mesh key={`atom1-${i}`} position={pos1.toArray()}>
        <sphereGeometry args={[0.08, 32, 32]} />
        <meshStandardMaterial color={"#00ffff"} />
      </mesh>
    );
    segments.push(
      <mesh key={`atom2-${i}`} position={pos2.toArray()}>
        <sphereGeometry args={[0.08, 32, 32]} />
        <meshStandardMaterial color={"#00ffff"} />
      </mesh>
    );

    // ✅ Add connecting line between paired orbs
    segments.push(
      <ConnectLine
        key={`line-${i}`}
        start={pos1.toArray() as [number, number, number]}
        end={pos2.toArray() as [number, number, number]}
      />
    );
  }

  return (
    <group ref={groupRef} position={position}>
      {segments}
    </group>
  );
};

const ProteinViewer = () => {
  const pos1: [number, number, number] = [-3, 0, 0];
  const pos2: [number, number, number] = [-2, 0, 0];

  return (
    <div style={{ height: "100vh", width: "100%" }}>
      <Canvas camera={{ position: [0, 3, 8], fov: 60 }}>
        <ambientLight intensity={0.6} />
        <directionalLight position={[2, 5, 5]} intensity={1} />
        <OrbitControls />
        <ProteinModel position={pos1} />
        <ProteinModel position={pos2} />
      </Canvas>
    </div>
  );
};

export default ProteinViewer;
