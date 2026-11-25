
"use client";

import { Component, Suspense } from "react";
import type { ReactNode } from "react";
import { Canvas } from "@react-three/fiber";
import * as THREE from "three";

interface AetherSceneProps {
  children: ReactNode;
  className?: string;
  fallback?: ReactNode;
  animated?: boolean;
}

interface SceneBoundaryProps {
  children: ReactNode;
  fallback: ReactNode;
}

interface SceneBoundaryState {
  hasError: boolean;
}

class SceneBoundary extends Component<
  SceneBoundaryProps,
  SceneBoundaryState
> {
  state: SceneBoundaryState = {
    hasError: false,
  };

  static getDerivedStateFromError(): SceneBoundaryState {
    return {
      hasError: true,
    };
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }

    return this.props.children;
  }
}

export default function AetherScene({
  children,
  className = "",
  fallback = null,
  animated = true,
}: AetherSceneProps) {
  return (
    <div
      className={`relative h-full w-full overflow-hidden ${className}`}
      aria-hidden="true"
    >
      <SceneBoundary fallback={fallback}>
        <Suspense fallback={fallback}>
          <Canvas
            dpr={[1, 1.5]}
            frameloop={animated ? "always" : "demand"}
            camera={{
              position: [0, 0, 8],
              fov: 42,
              near: 0.1,
              far: 100,
            }}
            gl={{
              antialias: true,
              alpha: true,
              powerPreference: "high-performance",
              toneMapping: THREE.ACESFilmicToneMapping,
              toneMappingExposure: 1.15,
              outputColorSpace: THREE.SRGBColorSpace,
            }}
            fallback={fallback}
            onCreated={({ gl }) => {
              gl.setClearColor(0x000000, 0);
            }}
            style={{
              width: "100%",
              height: "100%",
              background: "transparent",
            }}
          >
            <Suspense fallback={null}>
              {children}
            </Suspense>
          </Canvas>
        </Suspense>
      </SceneBoundary>
    </div>
  );
}
