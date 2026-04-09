"use client"

import { useState } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { Shield, Zap, Wind, Layers, Activity } from "lucide-react"

interface TechStat {
  label: string
  value: string
}

interface Hotspot {
  id: number
  x: number
  y: number
  label: string
  description: string
  category: "protection" | "performance" | "comfort" | "durability"
  stats: TechStat[]
}

const hotspots: Hotspot[] = [
  {
    id: 1,
    x: 50,
    y: 15,
    label: "Vision Control Carbon",
    description: "Ultralight carbon fiber shell structure designed for maximum impact absorption and aerodynamic flow.",
    category: "protection",
    stats: [
      { label: "Weight", value: "1250g" },
      { label: "Material", value: "Carbon 3K" },
      { label: "Safety", value: "ECE 22.06" },
    ],
  },
  {
    id: 2,
    x: 30,
    y: 25,
    label: "Tactile Grip Pro",
    description: "Nano-textured palm surface providing maximum sensitivity for precise clutch and throttle control.",
    category: "performance",
    stats: [
      { label: "Grip", value: "High-Tac" },
      { label: "Flex", value: "4-Way Stretch" },
    ],
  },
  {
    id: 3,
    x: 55,
    y: 40,
    label: "VQ Aero Mesh",
    description:
      "Advanced moisture-wicking fabric engineered to keep body temperature regulated during intense racing.",
    category: "comfort",
    stats: [
      { label: "Breathability", value: "98%" },
      { label: "Dry Time", value: "< 5 min" },
    ],
  },
  {
    id: 4,
    x: 60,
    y: 85,
    label: "Ankle Lock System",
    description: "Biomechanical pivot system protecting against hyperextension while allowing natural movement.",
    category: "protection",
    stats: [
      { label: "Pivot", value: "Dual Axis" },
      { label: "Impact", value: "Level 2" },
      { label: "Buckles", value: "Alloy" },
    ],
  },
]

const getCategoryIcon = (category: string) => {
  switch (category) {
    case "protection":
      return <Shield className="w-4 h-4 text-lorenzo-accent" />
    case "performance":
      return <Zap className="w-4 h-4 text-lorenzo-accent" />
    case "comfort":
      return <Wind className="w-4 h-4 text-lorenzo-accent" />
    case "durability":
      return <Layers className="w-4 h-4 text-lorenzo-accent" />
    default:
      return <Activity className="w-4 h-4 text-lorenzo-accent" />
  }
}

interface HotspotPointProps {
  spot: Hotspot
  isActive: boolean
  onHover: () => void
  onLeave: () => void
}

function HotspotPoint({ spot, isActive, onHover, onLeave }: HotspotPointProps) {
  return (
    <div
      style={{ top: `${spot.y}%`, left: `${spot.x}%` }}
      className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer z-30"
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      onClick={onHover}
    >
      <div className="relative flex items-center justify-center w-12 h-12">
        <motion.div
          animate={{ scale: [1, 2], opacity: [0.5, 0] }}
          transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY, ease: "easeOut" }}
          className="absolute inset-0 bg-lorenzo-accent/40 rounded-full"
        />
        <motion.div
          animate={{ scale: [1, 1.5], opacity: [0.8, 0] }}
          transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY, ease: "easeOut", delay: 0.2 }}
          className="absolute inset-0 bg-lorenzo-accent/30 rounded-full"
        />
        <div className="relative w-3 h-3 bg-lorenzo-accent rounded-full shadow-[0_0_15px_rgba(163,230,53,1)] ring-2 ring-black/20" />
      </div>

      <AnimatePresence>
        {isActive && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 10 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="absolute top-full mt-4 left-1/2 -translate-x-1/2 z-50 w-[320px] md:w-[360px]"
          >
            {/* Connector Line */}
            <div className="absolute -top-4 left-1/2 w-px h-4 bg-gradient-to-b from-transparent to-lorenzo-accent/50" />
            <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-lorenzo-accent rounded-full shadow-[0_0_10px_#a3e635]" />

            {/* Card Container - Glassmorphism & Tech Borders */}
            <div className="relative overflow-hidden rounded-lg bg-black/80 backdrop-blur-xl border border-white/10 shadow-2xl">
              {/* Decorative Tech Lines */}
              <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-lorenzo-accent/50 to-transparent opacity-50" />
              <div className="absolute bottom-0 right-0 w-16 h-16 bg-lorenzo-accent/5 blur-[50px]" />

              {/* Header */}
              <div className="flex items-center justify-between px-5 py-3 border-b border-white/5 bg-white/5">
                <div className="flex items-center gap-2">
                  {getCategoryIcon(spot.category)}
                  <span className="text-xs font-bold tracking-widest text-lorenzo-accent uppercase opacity-80">
                    {spot.category}
                  </span>
                </div>
                <div className="text-[10px] font-mono text-white/40">SYS.ID.{spot.id.toString().padStart(3, "0")}</div>
              </div>

              {/* Content */}
              <div className="p-5">
                <h3 className="text-xl font-bold text-white mb-2 font-[family-name:var(--font-oswald)] uppercase tracking-wide">
                  {spot.label}
                </h3>
                <p className="text-sm text-white/70 leading-relaxed mb-5 border-l-2 border-lorenzo-accent/30 pl-3">
                  {spot.description}
                </p>

                {/* Tech Stats Grid */}
                <div className="grid grid-cols-2 gap-3">
                  {spot.stats.map((stat, idx) => (
                    <div
                      key={idx}
                      className="bg-white/5 rounded px-3 py-2 border border-white/5 hover:border-lorenzo-accent/30 transition-colors group"
                    >
                      <div className="text-[10px] uppercase tracking-wider text-white/40 mb-1 font-brier group-hover:text-lorenzo-accent/70 transition-colors">
                        {stat.label}
                      </div>
                      <div className="text-sm font-medium text-white font-mono">{stat.value}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Footer Decor */}
              <div className="absolute bottom-2 right-2 flex gap-0.5 opacity-30">
                <div className="w-1 h-1 bg-lorenzo-accent rounded-full" />
                <div className="w-1 h-1 bg-white rounded-full" />
                <div className="w-1 h-1 bg-white rounded-full" />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function RiderTechSection() {
  const [activeHotspot, setActiveHotspot] = useState<number | null>(null)

  return (
    <section id="tech-specs" className="relative min-h-screen bg-white px-6 md:px-12 overflow-visible py-0 mb-0 pb-24">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8 md:mb-12">
          <h2 className="text-5xl md:text-7xl lg:text-8xl font-black uppercase tracking-tight leading-tight">
            <span className="block font-sans leading-[0.85] text-lorenzo-dark">TECH</span>
            <span className="block font-brier text-lorenzo-dark text-9xl">SPECS</span>
          </h2>
          <p className="text-base mt-6 max-w-2xl text-lorenzo-dark md:text-base">
            Explore the technical specifications of Lorenzo's professional equipment. Hover over the points to discover
            more.
          </p>
        </div>

        <div className="relative max-w-6xl mx-auto">
          <div className="relative w-full aspect-[4/3] md:aspect-[3/2]">
            <Image src="/images/lorenzo-pose33.jpg" alt="Lorenzo Tech Specs" fill className="object-contain" priority />

            {/* Hotspots overlay */}
            {hotspots.map((spot) => (
              <HotspotPoint
                key={spot.id}
                spot={spot}
                isActive={activeHotspot === spot.id}
                onHover={() => setActiveHotspot(spot.id)}
                onLeave={() => setActiveHotspot(null)}
              />
            ))}
          </div>

          {/* Mobile instruction hint */}
          <div className="md:hidden text-center mt-8 text-gray-500 text-sm">
            Tap on the pulsating points to see the information
          </div>
        </div>
      </div>
    </section>
  )
}
