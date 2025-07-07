'use client'

import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Sphere, Torus } from '@react-three/drei'
import * as THREE from 'three'

export const Brain3D = () => {
  const groupRef = useRef<THREE.Group>(null!)
  const time = useRef(0)

  useFrame((state) => {
    time.current = state.clock.getElapsedTime()
    
    if (groupRef.current) {
      // Rotate the entire brain structure
      groupRef.current.rotation.y = time.current * 0.2
      groupRef.current.rotation.x = Math.sin(time.current * 0.1) * 0.1
    }
  })

  return (
    <group ref={groupRef}>
      {/* Central brain core */}
      <Sphere args={[1, 32, 32]} position={[0, 0, 0]}>
        <meshStandardMaterial
          color="#0ea5e9"
          transparent
          opacity={0.7}
          roughness={0.3}
          metalness={0.2}
          emissive="#0ea5e9"
          emissiveIntensity={0.1}
        />
      </Sphere>

      {/* Neural network rings */}
      {[...Array(3)].map((_, i) => (
        <Torus
          key={i}
          args={[1.5 + i * 0.5, 0.05, 8, 32]}
          position={[0, 0, 0]}
          rotation={[
            Math.PI / 2 + i * (Math.PI / 6),
            i * (Math.PI / 4),
            0
          ]}
        >
          <meshStandardMaterial
            color="#38bdf8"
            transparent
            opacity={0.4}
            emissive="#38bdf8"
            emissiveIntensity={0.2}
          />
        </Torus>
      ))}

      {/* Floating neural nodes */}
      {[...Array(8)].map((_, i) => {
        const angle = (i / 8) * Math.PI * 2
        const radius = 2.5
        return (
          <Sphere
            key={i}
            args={[0.1, 16, 16]}
            position={[
              Math.cos(angle) * radius,
              Math.sin(angle) * radius * 0.5,
              Math.sin(angle) * radius * 0.3
            ]}
          >
            <meshStandardMaterial
              color="#7dd3fc"
              emissive="#7dd3fc"
              emissiveIntensity={0.5}
            />
          </Sphere>
        )
      })}
    </group>
  )
}
