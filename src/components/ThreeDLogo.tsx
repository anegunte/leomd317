'use client';

import React, { useRef, useState, useEffect, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';
import * as THREE from 'three';

// -------------------------------------------------------------
// Static 3D Beyond Boundaries Scene (Globe-free emblem)
// -------------------------------------------------------------
function BeyondBoundariesModel() {
  return (
    <group rotation={[0.1, 0.2, 0]}>

      {/* 4. Golden Orbit Swoosh Rings (Glowing continuous torus tubes) */}
      <OrbitRing radius={2.0} color="#d4af37" tilt={Math.PI / 4.2} />
      <OrbitRing radius={2.25} color="#e5c158" tilt={-Math.PI / 5.5} />
      <OrbitRing radius={2.5} color="#f3e5ab" tilt={Math.PI / 12} />

      {/* 5. Guiding Star (Aligned to the upper-right corner with 4-Point Lens Flare Spikes) */}
      <group position={[1.1, 1.3, 0]} rotation={[0, 0.5, 0.2]}>
        {/* Core sphere */}
        <mesh>
          <sphereGeometry args={[0.08, 16, 16]} />
          <meshBasicMaterial color="#ffffff" />
        </mesh>
        {/* Star octahedron */}
        <mesh>
          <octahedronGeometry args={[0.18, 0]} />
          <meshBasicMaterial color="#d4af37" transparent opacity={0.7} />
        </mesh>
        <mesh rotation={[0, 0, Math.PI / 4]}>
          <octahedronGeometry args={[0.12, 0]} />
          <meshBasicMaterial color="#ffffff" transparent opacity={0.9} />
        </mesh>
        {/* Flare Lines */}
        <mesh>
          <cylinderGeometry args={[0.003, 0.003, 0.8, 4]} />
          <meshBasicMaterial color="#d4af37" transparent opacity={0.5} />
        </mesh>
        <mesh rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.003, 0.003, 0.8, 4]} />
          <meshBasicMaterial color="#d4af37" transparent opacity={0.5} />
        </mesh>
      </group>

      {/* 6. Leaping Silver Leader Sculpture (Centered inside the orbit swoosh rings) */}
      <group position={[0.2, -0.3, 0]} rotation={[0, 0, -Math.PI / 5]}>
        {/* Torso */}
        <mesh position={[0.15, 0.5, 0]} rotation={[0, 0, -Math.PI / 7]}>
          <cylinderGeometry args={[0.06, 0.03, 0.4, 6]} />
          <meshStandardMaterial color="#e2e8f0" metalness={0.9} roughness={0.15} />
        </mesh>
        {/* Head */}
        <mesh position={[0.3, 0.76, 0]}>
          <sphereGeometry args={[0.065, 16, 16]} />
          <meshStandardMaterial color="#e2e8f0" metalness={0.9} roughness={0.15} />
        </mesh>
        {/* Reaching arm (towards star) */}
        <mesh position={[0.42, 0.78, 0.05]} rotation={[0, 0, -Math.PI / 5]}>
          <cylinderGeometry args={[0.02, 0.01, 0.35, 5]} />
          <meshStandardMaterial color="#e2e8f0" metalness={0.9} roughness={0.15} />
        </mesh>
        {/* Back arm */}
        <mesh position={[-0.02, 0.54, -0.05]} rotation={[0, 0, -Math.PI / 3.2]}>
          <cylinderGeometry args={[0.022, 0.01, 0.3, 5]} />
          <meshStandardMaterial color="#e2e8f0" metalness={0.9} roughness={0.15} />
        </mesh>
        {/* Bent front leg */}
        <mesh position={[0.18, 0.22, 0.02]} rotation={[0, 0, Math.PI / 3.5]}>
          <cylinderGeometry args={[0.03, 0.018, 0.28, 5]} />
          <meshStandardMaterial color="#e2e8f0" metalness={0.9} roughness={0.15} />
        </mesh>
        {/* Extended back leg */}
        <mesh position={[-0.08, 0.25, -0.02]} rotation={[0, 0, -Math.PI / 4]}>
          <cylinderGeometry args={[0.03, 0.015, 0.32, 5]} />
          <meshStandardMaterial color="#e2e8f0" metalness={0.9} roughness={0.15} />
        </mesh>
      </group>

    </group>
  );
}

// -------------------------------------------------------------
// Helper: Custom Orbit Ring Component (Glowing Solid Torus)
// -------------------------------------------------------------
function OrbitRing({ radius, color, tilt }: { radius: number; color: string; tilt: number }) {
  return (
    <mesh rotation={[tilt, tilt * 0.3, 0.2]}>
      <torusGeometry args={[radius, 0.015, 12, 100]} />
      <meshStandardMaterial 
        color={color} 
        metalness={0.9} 
        roughness={0.1} 
        emissive={color}
        emissiveIntensity={0.25}
      />
    </mesh>
  );
}

// -------------------------------------------------------------
// Ambient Scene Lights Setup
// -------------------------------------------------------------
function SceneSetup() {
  return (
    <>
      <ambientLight intensity={0.65} />
      <pointLight position={[6, 8, 6]} intensity={1.8} color="#ffffff" />
      <directionalLight position={[-8, 4, -4]} intensity={0.9} color="#d4af37" />
      <directionalLight position={[0, -5, 0]} intensity={0.3} color="#3b82f6" />
    </>
  );
}

// -------------------------------------------------------------
// Main Client-Side Component Wrapper
// -------------------------------------------------------------
export default function ThreeDLogo() {
  const [isRendered, setIsRendered] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);

  // Performance Optimization: listen for content-visibility events
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleStateChange = (e: Event) => {
      // Pause ThreeJS rendering when skipped
      const skipped = (e as any).skipped;
      setIsRendered(!skipped);
    };

    container.addEventListener('contentvisibilityautostatechange', handleStateChange);
    return () => {
      container.removeEventListener('contentvisibilityautostatechange', handleStateChange);
    };
  }, []);

  if (typeof window === 'undefined') return <CanvasFallback />;

  return (
    <div
      ref={containerRef}
      className="w-full h-full min-h-[400px] lg:min-h-[600px] flex items-center justify-center relative optimize-rendering-heavy"
      style={{ contentVisibility: 'auto', containIntrinsicSize: 'auto 500px' }}
    >
      {isRendered ? (
        <Canvas camera={{ position: [0, 0, 5.2], fov: 60 }} dpr={[1, 2]}>
          <Suspense fallback={null}>
            <SceneSetup />
            <Stars radius={90} depth={40} count={100} factor={3} saturation={0.1} fade speed={1.2} />
            <BeyondBoundariesModel />
            <OrbitControls enableZoom={false} enablePan={false} autoRotate={false} />
          </Suspense>
        </Canvas>
      ) : (
        <div className="text-silver-dark text-xs uppercase tracking-widest">Rendering Paused (Off-screen)</div>
      )}
    </div>
  );
}

// -------------------------------------------------------------
// Fallback: Elegant CSS Animated Globe (when WebGL/SSR loading)
// -------------------------------------------------------------
function CanvasFallback() {
  return (
    <div className="w-full h-full min-h-[400px] lg:min-h-[500px] flex items-center justify-center relative">
      <div className="w-72 h-72 rounded-full border-2 border-gold-primary/20 border-dashed animate-spin absolute" style={{ animationDuration: '40s' }} />
      <div className="w-64 h-64 rounded-full border border-silver-primary/10 border-dashed animate-spin absolute" style={{ animationDuration: '25s', animationDirection: 'reverse' }} />
      <div className="relative w-48 h-48 flex items-center justify-center bg-bg-deep-space/60 rounded-full border border-gold-primary/20 shadow-[0_0_50px_rgba(212,175,55,0.1)]">
        <svg
          width="80"
          height="80"
          viewBox="0 0 100 100"
          className="drop-shadow-[0_0_15px_rgba(212,175,55,0.5)] animate-pulse"
        >
          <path
            d="M50 5 L63 35 L95 35 L70 55 L80 85 L50 67 L20 85 L30 55 L5 35 L37 35 Z"
            fill="none"
            stroke="#d4af37"
            strokeWidth="2"
            strokeLinejoin="round"
          />
          <path
            d="M50 32 C53 32 55 34 55 37 C55 40 53 42 50 42 C47 42 45 40 45 37 C45 34 47 32 50 32 Z M50 45 C56 45 61 49 61 54 C61 55 60.5 56 59.5 56 L40.5 56 C39.5 56 39 55 39 54 C39 49 44 45 50 45 Z"
            fill="#c0c0c0"
          />
        </svg>
      </div>
    </div>
  );
}
