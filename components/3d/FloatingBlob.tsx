'use client'

import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Sphere } from '@react-three/drei'
import * as THREE from 'three'

export const FloatingBlob = () => {
  const meshRef = useRef<THREE.Mesh>(null!)
  const time = useRef(0)

  useFrame((state) => {
    time.current = state.clock.getElapsedTime()
    
    if (meshRef.current) {
      // Floating animation
      meshRef.current.position.y = Math.sin(time.current * 0.5) * 0.3
      meshRef.current.rotation.x = time.current * 0.1
      meshRef.current.rotation.z = time.current * 0.05
      
      // Morphing effect
      meshRef.current.scale.setScalar(1 + Math.sin(time.current * 0.3) * 0.1)
    }
  })

  return (
    <Sphere ref={meshRef} args={[1.5, 32, 32]} position={[2, 0, -2]}>
      <meshStandardMaterial
        color="#0ea5e9"
        transparent
        opacity={0.6}
        roughness={0.2}
        metalness={0.1}
        emissive="#0ea5e9"
        emissiveIntensity={0.2}
      />
    </Sphere>
  )
}
