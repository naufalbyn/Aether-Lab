
"use client";

interface SceneEnvironmentProps {
  intensity?: number;
}

export default function SceneEnvironment({
  intensity = 1,
}: SceneEnvironmentProps) {
  return (
    <>
      {/* Base Ambient Lighting */}
      <ambientLight intensity={0.45 * intensity} />

      {/* Hemisphere Lighting */}
      <hemisphereLight
        args={["#F5F5F2", "#1D1D28", 0.85 * intensity]}
      />

      {/* Primary Studio Light */}
      <directionalLight
        position={[5, 6, 7]}
        color="#FFFFFF"
        intensity={2.4 * intensity}
      />

      {/* Secondary Fill Light */}
      <directionalLight
        position={[-5, 2, 4]}
        color="#DCE5FF"
        intensity={0.9 * intensity}
      />

      {/* Electric Blue Rim Light */}
      <pointLight
        position={[-4, 2, -3]}
        color="#4F46FF"
        intensity={24 * intensity}
        distance={14}
        decay={2}
      />

      {/* Cyan Accent Light */}
      <pointLight
        position={[4, -2, 2]}
        color="#1EC1CB"
        intensity={18 * intensity}
        distance={12}
        decay={2}
      />

      {/* Violet Back Light */}
      <pointLight
        position={[0, 4, -5]}
        color="#8B5CF6"
        intensity={16 * intensity}
        distance={14}
        decay={2}
      />

      {/* Subtle Lime Accent */}
      <pointLight
        position={[-2, -4, 1]}
        color="#C7FF3D"
        intensity={5 * intensity}
        distance={9}
        decay={2}
      />
    </>
  );
}
