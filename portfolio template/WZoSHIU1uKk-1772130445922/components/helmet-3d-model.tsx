"use client"

import { useRef, useState, useEffect } from "react"
import { useFrame } from "@react-three/fiber"
import { useGLTF } from "@react-three/drei"
import * as THREE from "three"

interface Helmet3DModelProps {
  modelPath: string
}

export default function Helmet3DModel({ modelPath }: Helmet3DModelProps) {
  const groupRef = useRef<THREE.Group>(null)
  const { scene } = useGLTF(modelPath)

  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const targetRotation = useRef({ x: 0, y: 0 })
  const currentRotation = useRef({ x: 0, y: 0 })

  useEffect(() => {
    if (scene) {
      const box = new THREE.Box3().setFromObject(scene)
      const center = box.getCenter(new THREE.Vector3())

      // Ajustar posição para centralizar o pivot
      scene.position.x = -center.x
      scene.position.y = -center.y
      scene.position.z = -center.z
    }
  }, [scene])

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      const x = (event.clientX / window.innerWidth) * 2 - 1
      const y = -(event.clientY / window.innerHeight) * 2 + 1
      setMousePosition({ x, y })
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  useEffect(() => {
    targetRotation.current = {
      x: mousePosition.y * 0.15, // Inclinação vertical suave
      y: mousePosition.x * 0.2, // Rotação horizontal suave
    }
  }, [mousePosition])

  useFrame(() => {
    if (groupRef.current) {
      // Lerp suave para movimento fluido
      currentRotation.current.x += (targetRotation.current.x - currentRotation.current.x) * 0.05
      currentRotation.current.y += (targetRotation.current.y - currentRotation.current.y) * 0.05

      groupRef.current.rotation.x = currentRotation.current.x
      groupRef.current.rotation.y = currentRotation.current.y
    }
  })

  return (
    <group ref={groupRef}>
      <primitive object={scene} scale={2.5} />
    </group>
  )
}

// Preload do modelo
useGLTF.preload("/3d/helmet-lorenzo.glb")
