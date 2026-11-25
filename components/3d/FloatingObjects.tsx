
"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

type ObjectShape =
  | "octahedron"
  | "tetrahedron"
  | "icosahedron"
  | "torus";

interface FloatingObjectConfig {
  id: string;
  shape: ObjectShape;
  position: [number, number, number];
  rotation: [number, number, number];
  size: number;
  color: string;
  speed: number;
  amplitude: number;
  phase: number;
  wireframe?: boolean;
}

interface FloatingObjectProps {
  config: FloatingObjectConfig;
  animated: boolean;
}

interface FloatingObjectsProps {
  animated?: boolean;
  scale?: number;
}

const objects: FloatingObjectConfig[] = [
  {
    id: "blue-octahedron",
    shape: "octahedron",
    position: [-2.6, 1.65, -0.8],
    rotation: [0.3, 0.6, 0.2],
    size: 0.18,
    color: "#4F46FF",
    speed: 0.65,
    amplitude: 0.15,
    phase: 0,
  },
  {
    id: "cyan-tetrahedron",
    shape: "tetrahedron",
    position: [2.55, 1.45, 0.4],
    rotation: [0.5, 0.2, 0.8],
    size: 0.13,
    color: "#1EC1CB",
    speed: 0.8,
    amplitude: 0.12,
    phase: 1.2,
  },
  {
    id: "lime-icosahedron",
    shape: "icosahedron",
    position: [2.35, -1.85, 0.6],
    rotation: [0.2, 0.7, 0.3],
    size: 0.12,
    color: "#C7FF3D",
    speed: 0.55,
    amplitude: 0.16,
    phase: 2.4,
  },
  {
    id: "violet-torus",
    shape: "torus",
    position: [-2.35, -1.8, -0.5],
    rotation: [0.8, 0.4, 0.6],
    size: 0.17,
    color: "#8B5CF6",
    speed: 0.45,
    amplitude: 0.14,
    phase: 3.6,
  },
  {
    id: "wireframe-octahedron",
    shape: "octahedron",
    position: [0.65, 2.65, -1.2],
    rotation: [0.4, 0.8, 0.2],
    size: 0.15,
    color: "#8B8D91",
    speed: 0.35,
    amplitude: 0.1,
    phase: 4.8,
    wireframe: true,
  },
  {
    id: "blue-tetrahedron",
    shape: "tetrahedron",
    position: [-0.7, -2.65, -0.8],
    rotation: [0.6, 0.3, 0.9],
    size: 0.11,
    color: "#4F46FF",
    speed: 0.6,
    amplitude: 0.13,
    phase: 5.4,
    wireframe: true,
  },
];

function ObjectGeometry({
  shape,
  size,
}: {
  shape: ObjectShape;
  size: number;
}) {
  switch (shape) {
    case "octahedron":
      return <octahedronGeometry args={[size, 0]} />;

    case "tetrahedron":
      return <tetrahedronGeometry args={[size, 0]} />;

    case "icosahedron":
      return <icosahedronGeometry args={[size, 0]} />;

    case "torus":
      return (
        <torusGeometry
          args={[size, size * 0.16, 8, 32]}
        />
      );
  }
}

function FloatingObject({
  config,
  animated,
}: FloatingObjectProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const elapsedRef = useRef(0);

  useFrame((_, delta) => {
    if (!meshRef.current || !animated) return;

    const safeDelta = Math.min(delta, 0.05);

    elapsedRef.current += safeDelta;

    const elapsed = elapsedRef.current;
    const time = elapsed * config.speed + config.phase;

    meshRef.current.position.x =
      config.position[0] +
      Math.cos(time * 0.7) * config.amplitude * 0.4;

    meshRef.current.position.y =
      config.position[1] +
      Math.sin(time) * config.amplitude;

    meshRef.current.position.z =
      config.position[2] +
      Math.sin(time * 0.5) * config.amplitude * 0.5;

    meshRef.current.rotation.x +=
      safeDelta * config.speed * 0.3;

    meshRef.current.rotation.y +=
      safeDelta * config.speed * 0.45;

    meshRef.current.rotation.z +=
      safeDelta * config.speed * 0.15;
  });

  return (
    <mesh
      ref={meshRef}
      position={config.position}
      rotation={config.rotation}
    >
      <ObjectGeometry
        shape={config.shape}
        size={config.size}
      />

      <meshStandardMaterial
        color={config.color}
        metalness={0.45}
        roughness={0.3}
        emissive={config.color}
        emissiveIntensity={
          config.wireframe ? 0.15 : 0.3
        }
        wireframe={config.wireframe ?? false}
        transparent={config.wireframe ?? false}
        opacity={config.wireframe ? 0.5 : 1}
      />
    </mesh>
  );
}

export default function FloatingObjects({
  animated = true,
  scale = 1,
}: FloatingObjectsProps) {
  return (
    <group scale={scale}>
      {objects.map((config) => (
        <FloatingObject
          key={config.id}
          config={config}
          animated={animated}
        />
      ))}
    </group>
  );
}
