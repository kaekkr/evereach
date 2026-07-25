"use client";

import React, { useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, OrbitControls, MeshWobbleMaterial } from "@react-three/drei";
import * as THREE from "three";
import { motion } from "framer-motion";
import { Play, Pause, Sparkles, Music } from "lucide-react";

// --- PROCEDURAL 3D DOG MODEL WITH DANCE ANIMATION ---
function DancingDogModel({
  isPlaying,
  bpm,
  style,
}: {
  isPlaying: boolean;
  bpm: number;
  style: "bounce" | "twist" | "frenzy";
}) {
  const dogGroup = useRef<THREE.Group>(null);
  const headRef = useRef<THREE.Group>(null);
  const bodyRef = useRef<THREE.Group>(null);
  const leftEarRef = useRef<THREE.Mesh>(null);
  const rightEarRef = useRef<THREE.Mesh>(null);
  const tailRef = useRef<THREE.Group>(null);
  const leftArmRef = useRef<THREE.Group>(null);
  const rightArmRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    const speed = (bpm / 60) * Math.PI * 2;
    const danceTime = isPlaying ? t * speed : 0;

    if (!dogGroup.current) return;

    if (isPlaying) {
      // 1. Vertical Rhythm Bounce
      const bounce = Math.abs(Math.sin(danceTime)) * 0.4;
      dogGroup.current.position.y = bounce - 0.2;

      // 2. Body Sway & Rotation based on Dance Style
      if (style === "bounce") {
        dogGroup.current.rotation.z = Math.sin(danceTime * 0.5) * 0.15;
        dogGroup.current.rotation.y = Math.cos(danceTime * 0.5) * 0.2;
      } else if (style === "twist") {
        dogGroup.current.rotation.y = Math.sin(danceTime) * 0.6;
        dogGroup.current.rotation.z = Math.cos(danceTime * 0.5) * 0.1;
      } else if (style === "frenzy") {
        dogGroup.current.rotation.x = Math.sin(danceTime * 1.5) * 0.2;
        dogGroup.current.rotation.y = Math.sin(danceTime * 2) * 0.4;
        dogGroup.current.rotation.z = Math.cos(danceTime * 1.5) * 0.3;
      }

      // 3. Head Nodding
      if (headRef.current) {
        headRef.current.rotation.x = Math.sin(danceTime * 2) * 0.15;
        headRef.current.rotation.z = -Math.sin(danceTime) * 0.1;
      }

      // 4. Ears Flopping Physics
      if (leftEarRef.current && rightEarRef.current) {
        leftEarRef.current.rotation.z = 0.2 + Math.sin(danceTime * 2) * 0.25;
        rightEarRef.current.rotation.z = -0.2 - Math.sin(danceTime * 2) * 0.25;
      }

      // 5. Tail Wagging
      if (tailRef.current) {
        tailRef.current.rotation.y = Math.sin(danceTime * 3) * 0.6;
        tailRef.current.rotation.x = Math.cos(danceTime * 2) * 0.2;
      }

      // 6. Arms Groove
      if (leftArmRef.current && rightArmRef.current) {
        leftArmRef.current.rotation.z = 0.5 + Math.sin(danceTime) * 0.4;
        rightArmRef.current.rotation.z = -0.5 - Math.sin(danceTime) * 0.4;
        leftArmRef.current.rotation.x = Math.cos(danceTime) * 0.3;
        rightArmRef.current.rotation.x = -Math.cos(danceTime) * 0.3;
      }
    } else {
      // Idle Breathing Animation
      dogGroup.current.position.y = Math.sin(t * 1.5) * 0.05 - 0.2;
      dogGroup.current.rotation.set(0, 0, 0);
      if (tailRef.current) tailRef.current.rotation.y = Math.sin(t * 2) * 0.15;
      if (leftEarRef.current) leftEarRef.current.rotation.z = 0.2;
      if (rightEarRef.current) rightEarRef.current.rotation.z = -0.2;
    }
  });

  // Material Colors
  const furColor = "#a855f7"; // Glowing Purple
  const accentColor = "#ec4899"; // Hot Pink Accent
  const bellyColor = "#f472b6";
  const darkColor = "#1e1b4b";

  return (
    <group ref={dogGroup} position={[0, -0.2, 0]} scale={1.1}>
      {/* --- BODY --- */}
      <group ref={bodyRef}>
        <mesh position={[0, 0.4, 0]}>
          <capsuleGeometry args={[0.45, 0.5, 16, 32]} />
          <MeshWobbleMaterial
            color={furColor}
            factor={isPlaying ? 0.15 : 0.02}
            speed={3}
            roughness={0.3}
            metalness={0.2}
          />
        </mesh>
        {/* Cute Belly Patch */}
        <mesh position={[0, 0.35, 0.28]} scale={[0.7, 0.75, 0.5]}>
          <sphereGeometry args={[0.4, 32, 32]} />
          <meshStandardMaterial color={bellyColor} roughness={0.5} />
        </mesh>
      </group>

      {/* --- HEAD GROUP --- */}
      <group ref={headRef} position={[0, 1.15, 0]}>
        {/* Main Head */}
        <mesh>
          <sphereGeometry args={[0.52, 32, 32]} />
          <MeshWobbleMaterial
            color={furColor}
            factor={isPlaying ? 0.1 : 0}
            speed={2}
            roughness={0.3}
          />
        </mesh>

        {/* Snout */}
        <mesh position={[0, -0.08, 0.45]} scale={[1, 0.75, 1]}>
          <sphereGeometry args={[0.22, 24, 24]} />
          <meshStandardMaterial color="#fce7f3" />
        </mesh>

        {/* Nose */}
        <mesh position={[0, -0.02, 0.65]}>
          <sphereGeometry args={[0.07, 16, 16]} />
          <meshStandardMaterial color={darkColor} roughness={0.1} />
        </mesh>

        {/* Eyes */}
        <mesh position={[-0.18, 0.12, 0.44]}>
          <sphereGeometry args={[0.06, 16, 16]} />
          <meshStandardMaterial color={darkColor} roughness={0.1} />
        </mesh>
        <mesh position={[0.18, 0.12, 0.44]}>
          <sphereGeometry args={[0.06, 16, 16]} />
          <meshStandardMaterial color={darkColor} roughness={0.1} />
        </mesh>

        {/* Eye Catchlights */}
        <mesh position={[-0.16, 0.15, 0.49]}>
          <sphereGeometry args={[0.02, 8, 8]} />
          <meshBasicMaterial color="#ffffff" />
        </mesh>
        <mesh position={[0.2, 0.15, 0.49]}>
          <sphereGeometry args={[0.02, 8, 8]} />
          <meshBasicMaterial color="#ffffff" />
        </mesh>

        {/* Left Floppy Ear */}
        <mesh
          ref={leftEarRef}
          position={[-0.48, 0.1, 0]}
          rotation={[0, 0, 0.2]}
        >
          <capsuleGeometry args={[0.12, 0.45, 16, 16]} />
          <meshStandardMaterial color={accentColor} roughness={0.4} />
        </mesh>

        {/* Right Floppy Ear */}
        <mesh
          ref={rightEarRef}
          position={[0.48, 0.1, 0]}
          rotation={[0, 0, -0.2]}
        >
          <capsuleGeometry args={[0.12, 0.45, 16, 16]} />
          <meshStandardMaterial color={accentColor} roughness={0.4} />
        </mesh>
      </group>

      {/* --- ARMS / PAWS --- */}
      <group ref={leftArmRef} position={[-0.52, 0.6, 0]}>
        <mesh position={[0, -0.2, 0]}>
          <capsuleGeometry args={[0.1, 0.35, 16, 16]} />
          <meshStandardMaterial color={furColor} />
        </mesh>
      </group>
      <group ref={rightArmRef} position={[0.52, 0.6, 0]}>
        <mesh position={[0, -0.2, 0]}>
          <capsuleGeometry args={[0.1, 0.35, 16, 16]} />
          <meshStandardMaterial color={furColor} />
        </mesh>
      </group>

      {/* --- LEGS --- */}
      <mesh position={[-0.25, -0.2, 0.05]}>
        <capsuleGeometry args={[0.13, 0.25, 16, 16]} />
        <meshStandardMaterial color={accentColor} />
      </mesh>
      <mesh position={[0.25, -0.2, 0.05]}>
        <capsuleGeometry args={[0.13, 0.25, 16, 16]} />
        <meshStandardMaterial color={accentColor} />
      </mesh>

      {/* --- WAGGING TAIL --- */}
      <group ref={tailRef} position={[0, 0.1, -0.4]}>
        <mesh position={[0, 0.2, -0.15]} rotation={[0.6, 0, 0]}>
          <capsuleGeometry args={[0.08, 0.4, 16, 16]} />
          <meshStandardMaterial color={accentColor} />
        </mesh>
      </group>
    </group>
  );
}

// --- MAIN DANCING DOG WIDGET ---
export function DancingDog() {
  const [isPlaying, setIsPlaying] = useState(true);
  const [bpm, setBpm] = useState(128);
  const [danceStyle, setDanceStyle] = useState<"bounce" | "twist" | "frenzy">(
    "bounce",
  );

  return (
    <div className="w-full max-w-4xl mx-auto my-12 p-6 rounded-3xl border border-purple-500/30 bg-[#0a0a14]/80 backdrop-blur-xl relative overflow-hidden shadow-2xl shadow-purple-950/50">
      {/* Background Neon Aura */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-600/20 blur-[120px] rounded-full pointer-events-none" />

      {/* Header Info */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4 relative z-10">
        <div>
          <div className="inline-flex items-center gap-2 text-xs text-purple-400 border border-purple-500/30 px-3 py-1 rounded-full bg-purple-950/40 mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Interactive 3D Motion Companion</span>
          </div>
          <h3 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2">
            CYBER-PUP DANCE STUDIO
          </h3>
        </div>

        {/* Play/Pause Toggle */}
        <button
          onClick={() => setIsPlaying(!isPlaying)}
          className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-purple-600 hover:bg-purple-500 text-white font-medium transition-all shadow-lg shadow-purple-600/30 active:scale-95"
        >
          {isPlaying ? (
            <>
              <Pause className="w-4 h-4 fill-white" /> Pause Groove
            </>
          ) : (
            <>
              <Play className="w-4 h-4 fill-white" /> Start Dancing
            </>
          )}
        </button>
      </div>

      {/* 3D Canvas viewport */}
      <div className="w-full h-[380px] relative rounded-2xl border border-white/10 bg-gradient-to-b from-purple-950/20 to-black/60 overflow-hidden cursor-grab active:cursor-grabbing">
        <Canvas camera={{ position: [0, 0.5, 3.2], fov: 45 }}>
          <ambientLight intensity={0.7} />
          <directionalLight
            position={[5, 8, 5]}
            intensity={1.5}
            color="#e0e7ff"
          />
          <pointLight position={[-3, -2, -2]} intensity={2} color="#a855f7" />
          <pointLight position={[3, 2, 2]} intensity={2} color="#ec4899" />

          <Float
            speed={isPlaying ? 2 : 0.5}
            rotationIntensity={0.2}
            floatIntensity={0.3}
          >
            <DancingDogModel
              isPlaying={isPlaying}
              bpm={bpm}
              style={danceStyle}
            />
          </Float>

          {/* Interactive Controls */}
          <OrbitControls
            enableZoom={false}
            enablePan={false}
            maxPolarAngle={Math.PI / 1.8}
            minPolarAngle={Math.PI / 2.8}
          />
        </Canvas>

        {/* Drag Hint Tag */}
        <div className="absolute bottom-3 right-3 text-[10px] tracking-widest text-white/40 uppercase pointer-events-none bg-black/40 px-2 py-1 rounded border border-white/10">
          Rotate 360°
        </div>
      </div>

      {/* Control Panel */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4 relative z-10 pt-4 border-t border-white/10">
        {/* Style Picker */}
        <div className="flex flex-col gap-2">
          <span className="text-xs text-white/60 font-mono flex items-center gap-1.5">
            <Music className="w-3.5 h-3.5 text-purple-400" /> DANCE MOVES
          </span>
          <div className="grid grid-cols-3 gap-2">
            {(["bounce", "twist", "frenzy"] as const).map((style) => (
              <button
                key={style}
                onClick={() => {
                  setDanceStyle(style);
                  setIsPlaying(true);
                }}
                className={`py-2 px-3 text-xs font-mono rounded-xl border capitalize transition-all ${
                  danceStyle === style
                    ? "border-purple-400 bg-purple-500/20 text-purple-200 shadow-sm shadow-purple-500/50"
                    : "border-white/10 bg-white/5 text-white/60 hover:bg-white/10"
                }`}
              >
                {style}
              </button>
            ))}
          </div>
        </div>

        {/* BPM Tempo Slider */}
        <div className="flex flex-col gap-2 justify-center">
          <div className="flex justify-between text-xs font-mono">
            <span className="text-white/60">TEMPO (BPM)</span>
            <span className="text-purple-400 font-bold">{bpm} BPM</span>
          </div>
          <input
            type="range"
            min="60"
            max="200"
            value={bpm}
            onChange={(e) => setBpm(Number(e.target.value))}
            className="w-full accent-purple-500 bg-white/10 h-2 rounded-lg cursor-pointer"
          />
        </div>
      </div>
    </div>
  );
}
