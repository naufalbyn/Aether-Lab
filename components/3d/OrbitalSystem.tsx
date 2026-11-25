
"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface OrbitalSystemProps {
  scale?: number;
  animated?: boolean;
  interactive?: boolean;
}

interface OrbitRingProps {
  radius: number;
  thickness: number;
  color: string;
  rotation: [number, number, number];
  speed: number;
  animated: boolean;
}

interface EnergyNodeProps {
  radius: number;
  size: number;
  color: string;
  speed: number;
  offset: number;
  animated: boolean;
  rotation: [number, number, number];
}

function OrbitRing({
  radius,
  thickness,
  color,
  rotation,
  speed,
  animated,
}: OrbitRingProps) {
  const ringRef = useRef<THREE.Mesh>(null);

  useFrame((_, delta) => {
    if (!ringRef.current || !animated) return;

    ringRef.current.rotation.x += delta * speed * 0.3;
    ringRef.current.rotation.y += delta * speed * 0.5;
  });

  return (
    <group rotation={rotation}>
      <mesh ref={ringRef}>
        <torusGeometry args={[radius, thickness, 12, 128]} />

        <meshStandardMaterial
          color={color}
          metalness={0.65}
          roughness={0.28}
          emissive={color}
          emissiveIntensity={0.18}
        />
      </mesh>
    </group>
  );
}

function EnergyNode({
  radius,
  size,
  color,
  speed,
  offset,
  animated,
  rotation,
}: EnergyNodeProps) {
  const nodeRef = useRef<THREE.Mesh>(null);
  const angleRef = useRef(offset);

  useFrame((_, delta) => {
    if (!nodeRef.current || !animated) return;

    angleRef.current += delta * speed;

    const angle = angleRef.current;

    nodeRef.current.position.set(
      Math.cos(angle) * radius,
      Math.sin(angle) * radius,
      0
    );

    nodeRef.current.rotation.x += delta * 0.5;
    nodeRef.current.rotation.y += delta * 0.8;
  });

  return (
    <group rotation={rotation}>
      <mesh
        ref={nodeRef}
        position={[
          Math.cos(offset) * radius,
          Math.sin(offset) * radius,
          0,
        ]}
      >
        <icosahedronGeometry args={[size, 1]} />

        <meshStandardMaterial
          color={color}
          metalness={0.35}
          roughness={0.25}
          emissive={color}
          emissiveIntensity={0.65}
        />
      </mesh>
    </group>
  );
}

export default function OrbitalSystem({
  scale = 1,
  animated = true,
  interactive = true,
}: OrbitalSystemProps) {
  const systemRef = useRef<THREE.Group>(null);
  const coreRef = useRef<THREE.Group>(null);
  const innerCoreRef = useRef<THREE.Mesh>(null);

  const elapsedRef = useRef(0);

  useFrame((state, delta) => {
    if (!animated) return;

    elapsedRef.current += delta;

    const elapsed = elapsedRef.current;

    if (systemRef.current) {
      const targetX = interactive
        ? state.pointer.y * 0.2
        : 0;

      const targetY = interactive
        ? state.pointer.x * 0.3
        : 0;

      systemRef.current.rotation.x = THREE.MathUtils.damp(
        systemRef.current.rotation.x,
        targetX,
        4,
        delta
      );

      systemRef.current.rotation.y = THREE.MathUtils.damp(
        systemRef.current.rotation.y,
        targetY,
        4,
        delta
      );

      systemRef.current.position.y =
        Math.sin(elapsed * 0.65) * 0.08;
    }

    if (coreRef.current) {
      coreRef.current.rotation.y += delta * 0.22;
      coreRef.current.rotation.x =
        Math.sin(elapsed * 0.35) * 0.12;
    }

    if (innerCoreRef.current) {
      innerCoreRef.current.rotation.x -= delta * 0.3;
      innerCoreRef.current.rotation.z += delta * 0.2;
    }
  });

  return (
    <group ref={systemRef} scale={scale}>
      {/* Central Geometric Core */}
      <group ref={coreRef}>
        <mesh>
          <icosahedronGeometry args={[0.92, 0]} />

          <meshStandardMaterial
            color="#1D1D28"
            metalness={0.7}
            roughness={0.24}
            transparent
            opacity={0.88}
          />
        </mesh>

        {/* Geometric Core Edges */}
        <mesh scale={1.012}>
          <icosahedronGeometry args={[0.92, 0]} />

          <meshBasicMaterial
            color="#4F46FF"
            wireframe
            transparent
            opacity={0.45}
          />
        </mesh>

        {/* Inner Energy Core */}
        <mesh ref={innerCoreRef}>
          <octahedronGeometry args={[0.46, 0]} />

          <meshStandardMaterial
            color="#1EC1CB"
            emissive="#1EC1CB"
            emissiveIntensity={0.8}
            metalness={0.3}
            roughness={0.2}
          />
        </mesh>
      </group>

      {/* Primary Electric Blue Orbit */}
      <OrbitRing
        radius={1.55}
        thickness={0.022}
        color="#4F46FF"
        rotation={[0.7, 0.25, 0.3]}
        speed={0.12}
        animated={animated}
      />

      {/* Cyan Orbit */}
      <OrbitRing
        radius={1.88}
        thickness={0.014}
        color="#1EC1CB"
        rotation={[-0.65, 0.55, -0.3]}
        speed={-0.08}
        animated={animated}
      />

      {/* Violet Orbit */}
      <OrbitRing
        radius={2.15}
        thickness={0.009}
        color="#8B5CF6"
        rotation={[1.1, -0.35, 0.6]}
        speed={0.06}
        animated={animated}
      />

      {/* Outer Structural Orbit */}
      <OrbitRing
        radius={2.45}
        thickness={0.006}
        color="#8B8D91"
        rotation={[0.2, 0.85, -0.5]}
        speed={-0.04}
        animated={animated}
      />

      {/* Energy Nodes */}
      <EnergyNode
        radius={1.55}
        size={0.075}
        color="#4F46FF"
        speed={0.65}
        offset={0}
        rotation={[0.7, 0.25, 0.3]}
        animated={animated}
      />

      <EnergyNode
        radius={1.88}
        size={0.06}
        color="#1EC1CB"
        speed={-0.48}
        offset={Math.PI / 2}
        rotation={[-0.65, 0.55, -0.3]}
        animated={animated}
      />

      <EnergyNode
        radius={2.15}
        size={0.085}
        color="#C7FF3D"
        speed={0.32}
        offset={Math.PI}
        rotation={[1.1, -0.35, 0.6]}
        animated={animated}
      />

      <EnergyNode
        radius={2.45}
        size={0.045}
        color="#8B5CF6"
        speed={-0.22}
        offset={Math.PI * 1.5}
        rotation={[0.2, 0.85, -0.5]}
        animated={animated}
      />
    </group>
  );
}
