'use client'

import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'

interface NeuralNetworkProps {
  width?: number
  height?: number
}

export const NeuralNetwork = ({ width = 400, height = 300 }: NeuralNetworkProps) => {
  const [activeNodes, setActiveNodes] = useState<number[]>([])
  
  // Network structure: 4 layers with different node counts
  const layers = [
    { nodes: 4, x: 50 },
    { nodes: 6, x: 150 },
    { nodes: 5, x: 250 },
    { nodes: 3, x: 350 }
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      const randomNodes = Array.from({ length: Math.floor(Math.random() * 8) + 3 }, () => 
        Math.floor(Math.random() * 18)
      )
      setActiveNodes(randomNodes)
    }, 1500)

    return () => clearInterval(interval)
  }, [])

  const getNodeY = (layerIndex: number, nodeIndex: number) => {
    const layer = layers[layerIndex]
    const spacing = height / (layer.nodes + 1)
    return spacing * (nodeIndex + 1)
  }

  const getAllNodes = () => {
    const nodes: Array<{ x: number; y: number; id: number }> = []
    let id = 0
    
    layers.forEach((layer, layerIndex) => {
      for (let nodeIndex = 0; nodeIndex < layer.nodes; nodeIndex++) {
        nodes.push({
          x: layer.x,
          y: getNodeY(layerIndex, nodeIndex),
          id: id++
        })
      }
    })
    
    return nodes
  }

  const getConnections = () => {
    const connections: Array<{ x1: number; y1: number; x2: number; y2: number; active: boolean }> = []
    
    for (let layerIndex = 0; layerIndex < layers.length - 1; layerIndex++) {
      const currentLayer = layers[layerIndex]
      const nextLayer = layers[layerIndex + 1]
      
      for (let i = 0; i < currentLayer.nodes; i++) {
        for (let j = 0; j < nextLayer.nodes; j++) {
          const fromId = layers.slice(0, layerIndex).reduce((sum, l) => sum + l.nodes, 0) + i
          const toId = layers.slice(0, layerIndex + 1).reduce((sum, l) => sum + l.nodes, 0) + j
          
          connections.push({
            x1: currentLayer.x,
            y1: getNodeY(layerIndex, i),
            x2: nextLayer.x,
            y2: getNodeY(layerIndex + 1, j),
            active: activeNodes.includes(fromId) || activeNodes.includes(toId)
          })
        }
      }
    }
    
    return connections
  }

  const nodes = getAllNodes()
  const connections = getConnections()

  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <svg width={width} height={height} className="overflow-visible">
        {/* Connections */}
        {connections.map((connection, index) => (
          <motion.line
            key={index}
            x1={connection.x1}
            y1={connection.y1}
            x2={connection.x2}
            y2={connection.y2}
            stroke={connection.active ? '#0ea5e9' : '#374151'}
            strokeWidth={connection.active ? 2 : 1}
            opacity={connection.active ? 0.8 : 0.3}
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{
              duration: 2,
              ease: "easeInOut",
              delay: index * 0.01
            }}
          />
        ))}
        
        {/* Nodes */}
        {nodes.map((node) => (
          <motion.circle
            key={node.id}
            cx={node.x}
            cy={node.y}
            r={activeNodes.includes(node.id) ? 8 : 6}
            fill={activeNodes.includes(node.id) ? '#0ea5e9' : '#6b7280'}
            stroke={activeNodes.includes(node.id) ? '#38bdf8' : '#374151'}
            strokeWidth={2}
            animate={{
              scale: activeNodes.includes(node.id) ? [1, 1.2, 1] : 1,
              opacity: activeNodes.includes(node.id) ? [0.8, 1, 0.8] : 0.6
            }}
            transition={{
              duration: 1,
              repeat: activeNodes.includes(node.id) ? Infinity : 0,
              ease: "easeInOut"
            }}
          />
        ))}
        
        {/* Data flow particles */}
        {activeNodes.slice(0, 3).map((nodeId, index) => (
          <motion.circle
            key={`particle-${nodeId}`}
            r={3}
            fill="#7dd3fc"
            initial={{ cx: 50, cy: getNodeY(0, nodeId % 4) }}
            animate={{
              cx: [50, 150, 250, 350],
              cy: [
                getNodeY(0, nodeId % 4),
                getNodeY(1, (nodeId + 1) % 6),
                getNodeY(2, (nodeId + 2) % 5),
                getNodeY(3, nodeId % 3)
              ]
            }}
            transition={{
              duration: 2,
              delay: index * 0.3,
              repeat: Infinity,
              repeatDelay: 1
            }}
          />
        ))}
      </svg>
    </div>
  )
}
