'use client'

import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'

interface TechItem {
  name: string
  icon: string
  color: string
  description: string
}

interface StaticTechGridProps {
  techData: {
    inner: TechItem[]
    middle: TechItem[]
    outer: TechItem[]
  }
}

export const StaticTechGrid = ({ techData }: StaticTechGridProps) => {
  const [hoveredTech, setHoveredTech] = useState<string | null>(null)
  const allTech = [...techData.inner, ...techData.middle, ...techData.outer]

  return (
    <div className="w-full max-w-4xl mx-auto text-center py-8">
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
        {allTech.map((tech) => (
          <div
            key={tech.name}
            className="bg-gray-800/30 p-3 rounded border border-gray-700/20 hover:bg-gray-700/40 transition-colors duration-200 cursor-pointer"
            onMouseEnter={() => setHoveredTech(tech.name)}
            onMouseLeave={() => setHoveredTech(null)}
          >
            <div className="text-xl mb-1">{tech.icon}</div>
            <div className="text-xs font-medium text-white">{tech.name}</div>
            <div className="text-xs text-gray-500 mt-1">{tech.description}</div>
          </div>
        ))}
      </div>
      
      {hoveredTech && (
        <div className="mt-4 p-3 bg-gray-800/50 rounded border border-gray-700/30 max-w-xs mx-auto">
          {(() => {
            const tech = allTech.find(t => t.name === hoveredTech)
            return tech ? (
              <div className="text-center">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <span className="text-lg">{tech.icon}</span>
                  <span className="text-sm font-medium text-white">{tech.name}</span>
                </div>
                <p className="text-xs text-gray-400">{tech.description}</p>
              </div>
            ) : null
          })()}
        </div>
      )}
      
      <div className="mt-6 text-sm text-gray-400">
        Tech stack displayed in optimized mode for better performance
      </div>
    </div>
  )
}
