'use client'

import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Text } from '@react-three/drei'
import * as THREE from 'three'

interface Skill {
  name: string
  icon: string
}

interface SkillsCloudProps {
  skills: Skill[]
}

export const SkillsCloud = ({ skills }: SkillsCloudProps) => {
  const groupRef = useRef<THREE.Group>(null!)
  const time = useRef(0)

  useFrame((state) => {
    time.current = state.clock.getElapsedTime()
    
    if (groupRef.current) {
      groupRef.current.rotation.y = time.current * 0.1
    }
  })

  return (
    <group ref={groupRef}>
      {skills.slice(0, 12).map((skill, index) => {
        const phi = Math.acos(-1 + (2 * index) / skills.length)
        const theta = Math.sqrt(skills.length * Math.PI) * phi
        const radius = 3
        
        const x = radius * Math.cos(theta) * Math.sin(phi)
        const y = radius * Math.sin(theta) * Math.sin(phi)
        const z = radius * Math.cos(phi)

        return (
          <group key={skill.name} position={[x, y, z]}>
            <Text
              fontSize={0.3}
              color="#0ea5e9"
              anchorX="center"
              anchorY="middle"
            >
              {skill.icon}
            </Text>
            <Text
              fontSize={0.15}
              color="#7dd3fc"
              anchorX="center"
              anchorY="middle"
              position={[0, -0.5, 0]}
            >
              {skill.name}
            </Text>
          </group>
        )
      })}
    </group>
  )
}
