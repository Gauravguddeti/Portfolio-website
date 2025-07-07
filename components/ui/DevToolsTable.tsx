'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'

const devTools = [
  { symbol: 'Py', name: 'Python', category: 'language', color: 'bg-yellow-500' },
  { symbol: 'Js', name: 'JavaScript', category: 'language', color: 'bg-yellow-400' },
  { symbol: 'Ts', name: 'TypeScript', category: 'language', color: 'bg-blue-500' },
  { symbol: 'Re', name: 'React', category: 'framework', color: 'bg-cyan-500' },
  { symbol: 'Nx', name: 'Next.js', category: 'framework', color: 'bg-gray-800' },
  { symbol: 'Tf', name: 'TensorFlow', category: 'ml', color: 'bg-orange-500' },
  { symbol: 'Pt', name: 'PyTorch', category: 'ml', color: 'bg-red-500' },
  { symbol: 'Nd', name: 'Node.js', category: 'runtime', color: 'bg-green-500' },
  { symbol: 'Mg', name: 'MongoDB', category: 'database', color: 'bg-green-600' },
  { symbol: 'Pg', name: 'PostgreSQL', category: 'database', color: 'bg-blue-600' },
  { symbol: 'Gp', name: 'Git', category: 'tool', color: 'bg-red-600' },
  { symbol: 'Vs', name: 'VS Code', category: 'tool', color: 'bg-blue-400' },
  { symbol: 'Dw', name: 'Docker', category: 'tool', color: 'bg-blue-700' },
  { symbol: 'Tw', name: 'Tailwind CSS', category: 'styling', color: 'bg-teal-500' },
  { symbol: 'Fm', name: 'Framer Motion', category: 'animation', color: 'bg-pink-500' },
  { symbol: 'Ai', name: 'Artificial Intelligence', category: 'ml', color: 'bg-purple-500' },
]

export const DevToolsTable = () => {
  const [hoveredTool, setHoveredTool] = useState<string | null>(null)

  return (
    <div className="relative">
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold text-white mb-2">The Periodic Table of Dev Tools</h3>
        <p className="text-gray-400">Hover to see what's cooking in my lab</p>
      </div>
      
      <div className="grid grid-cols-8 gap-2 max-w-2xl mx-auto">
        {devTools.map((tool, index) => (
          <motion.div
            key={tool.symbol}
            className={`
              relative aspect-square rounded-lg border-2 border-gray-600 
              ${tool.color} cursor-pointer
              flex flex-col items-center justify-center
              transition-all duration-300
            `}
            whileHover={{ scale: 1.1, zIndex: 10 }}
            onHoverStart={() => setHoveredTool(tool.symbol)}
            onHoverEnd={() => setHoveredTool(null)}
            data-cursor="tech"
          >
            <div className="text-white font-bold text-lg">{tool.symbol}</div>
            <div className="text-white text-xs opacity-80">{index + 1}</div>
            
            {hoveredTool === tool.symbol && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute -top-16 left-1/2 transform -translate-x-1/2 bg-dark-800 text-white px-3 py-2 rounded-lg text-sm whitespace-nowrap border border-primary-400 z-20"
              >
                {tool.name}
                <div className="text-xs text-primary-300 capitalize">{tool.category}</div>
              </motion.div>
            )}
          </motion.div>
        ))}
      </div>
      
      <div className="mt-8 text-center">
        <div className="text-sm text-gray-400 mb-4">Categories:</div>
        <div className="flex flex-wrap justify-center gap-4 text-xs">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-yellow-500 rounded"></div>
            <span>Languages</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-cyan-500 rounded"></div>
            <span>Frameworks</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-red-500 rounded"></div>
            <span>ML/AI</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-green-500 rounded"></div>
            <span>Database</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-blue-500 rounded"></div>
            <span>Tools</span>
          </div>
        </div>
      </div>
    </div>
  )
}
