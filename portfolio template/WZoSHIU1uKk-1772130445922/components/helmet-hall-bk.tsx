"use client"

import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import { motion, useMotionValue, useSpring, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight } from "lucide-react"

const helmets = [
  { id: 1, name: "Season", year: "2025", image: "/images/helmets/helmet-collection1.png" },
  { id: 2, name: "Dark Glitter", year: "2025", image: "/images/helmets/helmet-collection2.png" },
  { id: 3, name: "Discoball", year: "2025", image: "/images/helmets/helmet-collection3.png" },
  { id: 4, name: "Season", year: "2024", image: "/images/helmets/helmet-collection4.png" },
  { id: 5, name: "Japan", year: "2024", image: "/images/helmets/helmet-collection5.png" },
  { id: 6, name: "GIF", year: "2024", image: "/images/helmets/helmet-collection6.png" },
  { id: 7, name: "Season", year: "2025", image: "/images/helmets/helmet-collection7.png" },
  { id: 8, name: "Dark Glitter", year: "2025", image: "/images/helmets/helmet-collection8.png" },
  { id: 9, name: "Discoball", year: "2025", image: "/images/helmets/helmet-collection9.png" },
  { id: 10, name: "Japan", year: "2024", image: "/images/helmets/helmet-collection10.png" },
  { id: 11, name: "GIF", year: "2024", image: "/images/helmets/helmet-collection11.png" },
  { id: 12, name: "Porcelain", year: "2024", image: "/images/helmets/helmet-collection12.png" },
  { id: 13, name: "Dark Mode", year: "2024", image: "/images/helmets/helmet-collection13.png" },
  { id: 14, name: "Raze", year: "2023", image: "/images/helmets/helmet-collection14.png" },
  { id: 15, name: "Chrome", year: "2023", image: "/images/helmets/helmet-collection15.png" },
  { id: 16, name: "Beachball", year: "2023", image: "/images/helmets/helmet-collection16.png" },
  { id: 17, name: "Las Vegas", year: "2023", image: "/images/helmets/helmet-collection17.png" },
  { id: 18, name: "Basketball", year: "2022", image: "/images/helmets/helmet-collection18.png" },
  { id: 19, name: "Silverstone", year: "2020", image: "/images/helmets/helmet-collection19.png" },
  { id: 20, name: "Season", year: "2021", image: "/images/helmets/helmet-collection20.png" },
]

export default function HelmetHall() {
  const [activeIndex, setActiveIndex] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)
  const x = useMotionValue(0)
  const springX = useSpring(x, { stiffness: 150, damping: 20 })

  // Calculate item width based on screen size
  const getItemWidth = () => {
    if (typeof window === "undefined") return 300
    return window.innerWidth < 768 ? 220 : 350
  }

  const handleDragEnd = (event: any, info: any) => {
    const itemWidth = getItemWidth()
    const threshold = itemWidth / 3
    const offset = info.offset.x
    const velocity = info.velocity.x

    if (offset < -threshold || velocity < -500) {
      setActiveIndex((prev) => Math.min(prev + 1, helmets.length - 1))
    } else if (offset > threshold || velocity > 500) {
      setActiveIndex((prev) => Math.max(prev - 1, 0))
    }
  }

  useEffect(() => {
    const itemWidth = getItemWidth()
    x.set(-activeIndex * itemWidth)
  }, [activeIndex, x])

  const nextHelmet = () => {
    setActiveIndex((prev) => Math.min(prev + 1, helmets.length - 1))
  }

  const prevHelmet = () => {
    setActiveIndex((prev) => Math.max(prev - 1, 0))
  }

  return (
    <section
      id="helmets"
      className="relative min-h-screen bg-lorenzo-dark overflow-hidden py-24 flex flex-col justify-center"
    >
      {/* Background Texture & Lighting */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#1a1a1a] to-black opacity-80" />
      <div className="absolute inset-0 bg-[url('/images/noise.png')] opacity-5 mix-blend-overlay" />

      {/* Floor Perspective Grid */}
      <div
        className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-black to-transparent opacity-50"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.05) 1px, transparent 1px)",
          backgroundSize: "50px 50px",
          transform: "perspective(500px) rotateX(60deg)",
          transformOrigin: "bottom",
        }}
      />

      <div className="relative z-10 max-w-[100vw] mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12 md:mb-20"
        >
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-black uppercase tracking-tight">
            <span className="text-white">HELMETS</span>
            <br />
            <span className="text-lorenzo-accent font-serif">HALL OF FAME</span>
          </h2>
        </motion.div>

        {/* Carousel Container */}
        <div className="relative h-[500px] md:h-[600px] flex items-center justify-center perspective-1000">
          <motion.div
            ref={containerRef}
            className="flex items-center absolute left-1/2"
            style={{ x: springX }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.1}
            onDragEnd={handleDragEnd}
            whileTap={{ cursor: "grabbing" }}
          >
            {helmets.map((helmet, index) => {
              const isActive = index === activeIndex
              const distance = Math.abs(index - activeIndex)
              const isNeighbor = distance === 1

              return (
                <motion.div
                  key={helmet.id}
                  className="relative shrink-0 cursor-grab active:cursor-grabbing"
                  style={{
                    width: typeof window !== "undefined" && window.innerWidth < 768 ? 220 : 350,
                    height: typeof window !== "undefined" && window.innerWidth < 768 ? 220 : 350,
                    margin: "0 10px",
                    zIndex: helmets.length - distance,
                    scale: isActive ? 1.2 : isNeighbor ? 0.9 : 0.7,
                    opacity: isActive ? 1 : isNeighbor ? 0.6 : 0.3,
                    rotateY: index < activeIndex ? 25 : index > activeIndex ? -25 : 0,
                    filter: isActive ? "brightness(1.1)" : "brightness(0.5) blur(1px)",
                  }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  onClick={() => setActiveIndex(index)}
                >
                  {/* Spotlight Effect for Active Item */}
                  {isActive && (
                    <div className="absolute -inset-20 bg-lorenzo-accent/10 rounded-full blur-3xl -z-10 animate-pulse" />
                  )}

                  {/* Helmet Image */}
                  <div className="relative w-full h-full drop-shadow-2xl">
                    <Image
                      src={helmet.image || "/placeholder.svg"}
                      alt={helmet.name}
                      fill
                      className="object-contain"
                      priority={distance < 2}
                    />
                  </div>

                  {/* Reflection Effect */}
                  <div className="absolute -bottom-[100%] left-0 right-0 h-full opacity-40 pointer-events-none transform scale-y-[-1]">
                    <Image
                      src={helmet.image || "/placeholder.svg"}
                      alt=""
                      fill
                      className="object-contain"
                      style={{
                        maskImage: "linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 60%)",
                        WebkitMaskImage: "linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 60%)",
                      }}
                    />
                  </div>
                </motion.div>
              )
            })}
          </motion.div>
        </div>

        {/* Active Item Info */}
        <div className="relative h-32 mt-8 flex justify-center items-center overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="text-center"
            >
              <h3 className="text-3xl md:text-5xl font-black text-white uppercase tracking-wide">
                {helmets[activeIndex].name}
              </h3>
              <p className="text-xl md:text-2xl text-lorenzo-accent font-serif mt-2">{helmets[activeIndex].year}</p>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation Controls */}
        <div className="flex justify-center gap-8 mt-8">
          <button
            onClick={prevHelmet}
            disabled={activeIndex === 0}
            className="p-4 rounded-full border border-white/20 hover:bg-white/10 hover:border-lorenzo-accent transition-all disabled:opacity-30 disabled:cursor-not-allowed group"
          >
            <ChevronLeft className="w-6 h-6 text-white group-hover:text-lorenzo-accent" />
          </button>
          <div className="flex items-center gap-2">
            {helmets.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setActiveIndex(idx)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  idx === activeIndex ? "w-8 bg-lorenzo-accent" : "bg-white/20 hover:bg-white/50"
                }`}
              />
            ))}
          </div>
          <button
            onClick={nextHelmet}
            disabled={activeIndex === helmets.length - 1}
            className="p-4 rounded-full border border-white/20 hover:bg-white/10 hover:border-lorenzo-accent transition-all disabled:opacity-30 disabled:cursor-not-allowed group"
          >
            <ChevronRight className="w-6 h-6 text-white group-hover:text-lorenzo-accent" />
          </button>
        </div>
      </div>
    </section>
  )
}
