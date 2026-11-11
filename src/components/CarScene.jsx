
import React from "react";
import { Canvas } from "@react-three/fiber";
import {
  OrbitControls,
  ContactShadows,
  Environment,
  Float,
  RoundedBox,
} from "@react-three/drei";

function Wheel({ position }) {
  return (
    <group position={position} rotation={[0, 0, Math.PI / 2]}>
      <mesh castShadow>
        <cylinderGeometry args={[0.37, 0.37, 0.24, 48]} />
        <meshStandardMaterial color="#171717" roughness={0.9} />
      </mesh>

      <mesh>
        <cylinderGeometry args={[0.24, 0.24, 0.255, 48]} />
        <meshStandardMaterial
          color="#d5d5d5"
          metalness={0.95}
          roughness={0.18}
        />
      </mesh>

      <mesh position={[0, 0.14, 0]}>
        <cylinderGeometry args={[0.09, 0.09, 0.025, 32]} />
        <meshStandardMaterial color="#777777" metalness={0.9} />
      </mesh>
    </group>
  );
}

function ClassicCar() {
  return (
    <group scale={0.85}>

      {/* Classic lower body */}
      <RoundedBox
        args={[3.8, 0.65, 1.65]}
        radius={0.18}
        smoothness={5}
        position={[0, 0.72, 0]}
        castShadow
      >
        <meshStandardMaterial
          color="#a91f25"
          metalness={0.65}
          roughness={0.22}
        />
      </RoundedBox>

      {/* Long vintage hood */}
      <RoundedBox
        args={[1.45, 0.3, 1.6]}
        radius={0.12}
        smoothness={5}
        position={[1.1, 1.08, 0]}
        castShadow
      >
        <meshStandardMaterial
          color="#c52b30"
          metalness={0.7}
          roughness={0.2}
        />
      </RoundedBox>

      {/* Rear trunk */}
      <RoundedBox
        args={[0.9, 0.3, 1.6]}
        radius={0.12}
        smoothness={5}
        position={[-1.45, 1.04, 0]}
        castShadow
      >
        <meshStandardMaterial color="#a91f25" metalness={0.7} />
      </RoundedBox>

      {/* Cream classic roof */}
      <RoundedBox
        args={[1.65, 0.75, 1.28]}
        radius={0.15}
        smoothness={6}
        position={[-0.2, 1.48, 0]}
        castShadow
      >
        <meshStandardMaterial
          color="#f3e5c5"
          metalness={0.3}
          roughness={0.35}
        />
      </RoundedBox>

      {/* Front windshield */}
      <mesh position={[0.65, 1.45, 0]} rotation={[0, 0, -0.25]}>
        <boxGeometry args={[0.06, 0.65, 1.16]} />
        <meshStandardMaterial
          color="#8ec9df"
          metalness={0.5}
          roughness={0.12}
          transparent
          opacity={0.75}
        />
      </mesh>

      {/* Rear windshield */}
      <mesh position={[-1.05, 1.45, 0]} rotation={[0, 0, 0.25]}>
        <boxGeometry args={[0.06, 0.62, 1.15]} />
        <meshStandardMaterial
          color="#8ec9df"
          metalness={0.5}
          transparent
          opacity={0.75}
        />
      </mesh>

      {/* Chrome front bumper */}
      <mesh position={[1.95, 0.53, 0]}>
        <boxGeometry args={[0.16, 0.13, 1.85]} />
        <meshStandardMaterial color="#e5e7eb" metalness={1} roughness={0.15} />
      </mesh>

      {/* Chrome rear bumper */}
      <mesh position={[-1.95, 0.53, 0]}>
        <boxGeometry args={[0.16, 0.13, 1.85]} />
        <meshStandardMaterial color="#e5e7eb" metalness={1} roughness={0.15} />
      </mesh>

      {/* Front grille */}
      <mesh position={[1.97, 0.82, 0]}>
        <boxGeometry args={[0.035, 0.28, 0.65]} />
        <meshStandardMaterial color="#252525" metalness={0.8} />
      </mesh>

      {/* Round headlights */}
      {[-0.59, 0.59].map((z) => (
        <mesh key={z} position={[1.98, 0.92, z]}>
          <cylinderGeometry args={[0.18, 0.18, 0.08, 32]} />
          <meshStandardMaterial
            color="#fff2c2"
            emissive="#ffcc66"
            emissiveIntensity={0.5}
            metalness={0.4}
          />
        </mesh>
      ))}

      {/* Wheels */}
      <Wheel position={[-1.1, 0.43, -0.83]} />
      <Wheel position={[1.1, 0.43, -0.83]} />
      <Wheel position={[-1.1, 0.43, 0.83]} />
      <Wheel position={[1.1, 0.43, 0.83]} />

      {/* Side chrome detailing */}
      {[-1, 1].map((z) => (
        <mesh key={z} position={[0, 0.82, z * 0.84]}>
          <boxGeometry args={[2.8, 0.035, 0.025]} />
          <meshStandardMaterial color="#e5e7eb" metalness={1} />
        </mesh>
      ))}
    </group>
  );
}

export default function CarScene() {
  return (
    <div style={{ width: "100%", height: "320px", cursor: "grab" }}>
      <Canvas
        camera={{ position: [5, 3, 6], fov: 38 }}
        shadows
        dpr={[1, 2]}
      >
        <color attach="background" args={["#102d52"]} />

        <ambientLight intensity={1.4} />

        <directionalLight
          position={[5, 8, 5]}
          intensity={2.5}
          castShadow
        />

        <spotLight
          position={[-5, 5, -5]}
          intensity={2}
          color="#ffffff"
        />

        <Environment preset="city" />

        <Float speed={1.2} rotationIntensity={0.08} floatIntensity={0.15}>
          <ClassicCar />
        </Float>

        <ContactShadows
          position={[0, 0, 0]}
          opacity={0.45}
          scale={7}
          blur={2.5}
        />

        <OrbitControls
          enablePan={false}
          enableZoom={false}
          autoRotate
          autoRotateSpeed={1}
          minPolarAngle={Math.PI / 3}
          maxPolarAngle={Math.PI / 2}
        />
      </Canvas>
    </div>
  );
}
