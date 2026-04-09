"use client"

import type React from "react"
import { useState, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"

const scheduleData = [
  {
    id: 1,
    round: "01",
    location: "AUSTRALIA",
    flagImage: "/images/flags/flag-Australia.svg",
    date: "16 MAR 25",
    finish: "1ST",
    fastestLap: "1:22.167",
    image: "/images/lorenzo-podio3.png",
  },
  {
    id: 2,
    round: "02",
    location: "CHINA",
    flagImage: "/images/flags/flag-China.svg",
    date: "23 MAR 25",
    finish: "2ND",
    fastestLap: "1:35.454",
    image: "/images/lorenzo-podio5.png",
  },
  {
    id: 3,
    round: "03",
    location: "JAPAN",
    flagImage: "/images/flags/flag-Japan.svg",
    date: "6 APR 25",
    finish: "2ND",
    fastestLap: "1:31.116",
    image: "/images/lorenzo-podio4.png",
  },
  {
    id: 4,
    round: "04",
    location: "BAHRAIN",
    flagImage: "/images/flags/flag-Bahrain.svg",
    date: "13 APR 25",
    finish: "3RD",
    fastestLap: "1:35.728",
    image: "/images/lorenzo-podio7.png",
  },
  {
    id: 5,
    round: "05",
    location: "SAUDI ARABIA",
    flagImage: "/images/flags/flag-Saudi-Arabia.svg",
    date: "20 APR 25",
    finish: "4TH",
    fastestLap: "1:31.778",
    image: "/images/lorenzo-podio2.png",
  },
  {
    id: 6,
    round: "06",
    location: "MIAMI",
    flagImage: "/images/flags/flag-USA.svg",
    date: "4 MAY 25",
    finish: "2ND",
    fastestLap: "1:29.546",
    image: "/images/lorenzo-podio3.png",
  },
  {
    id: 7,
    round: "07",
    location: "EMILIA ROMAGNA",
    flagImage: "/images/flags/flag-Italy.svg",
    date: "18 MAY 25",
    finish: "2ND",
    fastestLap: "1:18.311",
    image: "/images/lorenzo-podio5.png",
  },
  {
    id: 8,
    round: "08",
    location: "MONACO",
    flagImage: "/images/flags/flag-Monaco.svg",
    date: "25 MAY 25",
    finish: "1ST",
    fastestLap: "1:13.221",
    image: "/images/lorenzo-podio4.png",
  },
  {
    id: 9,
    round: "09",
    location: "SPAIN",
    flagImage: "/images/flags/flag-Spain.png",
    date: "1 JUN 25",
    finish: "2ND",
    fastestLap: "1:16.187",
    image: "/images/lorenzo-podio7.png",
  },
  {
    id: 10,
    round: "10",
    location: "CANADA",
    flagImage: "/images/flags/flag-Canada.svg",
    date: "15 JUN 25",
    finish: "DNF",
    fastestLap: "1:14.229",
    image: "/images/lorenzo-podio2.png",
  },
  {
    id: 11,
    round: "11",
    location: "AUSTRIA",
    flagImage: "/images/flags/flag-Austria.svg",
    date: "29 JUN 25",
    finish: "1ST",
    fastestLap: "1:08.272",
    image: "/images/lorenzo-podio3.png",
  },
  {
    id: 12,
    round: "12",
    location: "UNITED KINGDOM",
    flagImage: "/images/flags/flag-USA.svg",
    date: "6 JUL 25",
    finish: "1ST",
    fastestLap: "1:29.734",
    image: "/images/lorenzo-podio5.png",
  },
  {
    id: 13,
    round: "13",
    location: "BELGIUM",
    flagImage: "/images/flags/flag-Belgium.svg",
    date: "27 JUL 25",
    finish: "2ND",
    fastestLap: "1:45.257",
    image: "/images/lorenzo-podio4.png",
  },
  {
    id: 14,
    round: "14",
    location: "HUNGARY",
    flagImage: "/images/flags/flag-Hungary.svg",
    date: "3 AUG 25",
    finish: "1ST",
    fastestLap: "1:19.518",
    image: "/images/lorenzo-podio7.png",
  },
  {
    id: 15,
    round: "15",
    location: "NETHERLANDS",
    flagImage: "/images/flags/flag-Netherlands.svg",
    date: "31 AUG 25",
    finish: "DNF",
    fastestLap: "1:12.379",
    image: "/images/lorenzo-podio2.png",
  },
  {
    id: 16,
    round: "16",
    location: "ITALY",
    flagImage: "/images/flags/flag-Italy.svg",
    date: "7 SEP 25",
    finish: "2ND",
    fastestLap: "1:20.901",
    image: "/images/lorenzo-podio3.png",
  },
  {
    id: 17,
    round: "17",
    location: "AZERBAIJAN",
    flagImage: "/images/flags/flag-Azerbaijan.svg",
    date: "21 SEP 25",
    finish: "7TH",
    fastestLap: "1:44.155",
    image: "/images/lorenzo-podio5.png",
  },
  {
    id: 18,
    round: "18",
    location: "SINGAPORE",
    flagImage: "/images/flags/flag-Singapore.svg",
    date: "5 OCT 25",
    finish: "3RD",
    fastestLap: "1:35.555",
    image: "/images/lorenzo-podio4.png",
  },
  {
    id: 19,
    round: "19",
    location: "UNITED STATES",
    flagImage: "/images/flags/flag-USA.svg",
    date: "19 OCT 25",
    finish: "2ND",
    fastestLap: "1:37.620",
    image: "/images/lorenzo-podio7.png",
  },
  {
    id: 20,
    round: "20",
    location: "MEXICO",
    flagImage: "/images/flags/flag-Mexico.png",
    date: "26 OCT 25",
    finish: "1ST",
    fastestLap: "1:20.784",
    image: "/images/lorenzo-podio2.png",
  },
  {
    id: 21,
    round: "21",
    location: "BRAZIL",
    flagImage: "/images/flags/flag-Brazil.png",
    date: "9 NOV 25",
    finish: "1ST",
    fastestLap: "1:13.040",
    image: "/images/lorenzo-podio3.png",
  },
]

// Function to get a random trophy (1-9) based on an ID to keep it consistent per render
const getRandomTrophy = (id: number | string) => {
  // Simple hash function to get a consistent number from string/number
  const val = typeof id === "string" ? Number.parseInt(id.replace(/\D/g, "") || "0") : id
  // Use modulo 9 + 1 to get 1-9
  const trophyNum = (val % 9) + 1
  return `/images/trofeus/trofeu${trophyNum}.svg`
}

export function InteractiveSchedule() {
  const [hoveredEvent, setHoveredEvent] = useState<number | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [cursorPos, setCursorPos] = useState<{ x: number; y: number }>({ x: 0, y: 0 })

  const handleMouseMove = (e: React.MouseEvent) => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect()
      setCursorPos({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      })
    }
  }

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="w-full bg-[#111111] py-32 relative overflow-hidden"
    >
      <div className="container mx-auto px-4 relative z-10 max-w-7xl">
        <div className="w-full">
          <div className="grid grid-cols-12 gap-4 mb-4 text-[10px] md:text-xs font-bold text-white/30 uppercase tracking-widest px-4">
            <div className="col-span-1">Round</div>
            <div className="col-span-4">Location</div>
            <div className="col-span-3 text-center">When</div>
            <div className="col-span-2 text-center">Finish</div>
            <div className="col-span-2 text-right">Fastest Lap</div>
          </div>

          {scheduleData.map((item) => (
            <div
              key={item.id}
              onMouseEnter={() => setHoveredEvent(item.id)}
              onMouseLeave={() => setHoveredEvent(null)}
              className="group relative transition-all duration-300"
            >
              <div className="grid grid-cols-12 gap-4 py-4 md:py-6 px-4 items-center border-t border-white/10 group-hover:bg-lorenzo-accent group-hover:border-transparent transition-colors duration-300">
                <div className="col-span-1 relative">
                  <span className="font-[family-name:var(--font-oswald)] font-bold text-3xl md:text-5xl text-white/40 group-hover:text-black relative z-10 opacity-100">
                    {item.round}
                  </span>
                  
                  <div className="absolute top-1/2 left-0 w-12 md:w-16 h-6 md:h-8 -translate-y-1/2 z-20 pointer-events-none text-lorenzo-accent group-hover:text-black transition-colors">
                    <img
                      src="/images/trass.svg"
                      alt=""
                      className="w-full h-full object-contain mix-blend-multiply"
                    />
                  </div>
                  
                </div>

                <div className="col-span-4 flex items-center gap-3">
                  <Image
                    src={item.flagImage || "/placeholder.svg"}
                    alt={`${item.location} flag`}
                    width={40}
                    height={30}
                    className="w-8 h-6 md:w-10 md:h-8 object-cover rounded-sm shadow-sm"
                  />
                  <span className="font-[family-name:var(--font-oswald)] font-bold text-3xl text-white uppercase tracking-tighter leading-none group-hover:text-black transition-colors md:text-5xl">
                    {item.location}
                  </span>
                </div>

                <div className="col-span-3 text-center font-[family-name:var(--font-oswald)] font-bold text-xl md:text-4xl text-white/80 group-hover:text-black transition-colors uppercase">
                  {item.date}
                </div>

                <div className="col-span-2 text-center flex justify-center items-center gap-2 md:gap-3">
                  <Image
                    src={getRandomTrophy(item.id + item.location) || "/placeholder.svg"}
                    alt="Trophy"
                    width={32}
                    height={32}
                    className="w-8 h-8 md:w-10 md:h-10 group-hover:brightness-0 transition-all"
                  />
                  <span className="font-[family-name:var(--font-oswald)] font-bold text-2xl md:text-4xl text-white group-hover:text-black italic">
                    {item.finish}
                  </span>
                </div>

                <div className="col-span-2 text-right font-[family-name:var(--font-oswald)] font-bold text-lg md:text-2xl text-white group-hover:text-black">
                  {item.fastestLap}
                  <span className="text-xs align-top ml-1">S</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-50 w-[300px] md:w-[400px] aspect-[3/4] mix-blend-normal">
        <AnimatePresence mode="wait">
          {hoveredEvent && (
            <motion.div
              key={hoveredEvent}
              initial={{ opacity: 0, scale: 0.9, rotate: -5 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              exit={{ opacity: 0, scale: 0.9, rotate: 5 }}
              transition={{ duration: 0.3, ease: "backOut" }}
              className="w-full h-full relative rounded-xl overflow-hidden shadow-2xl"
            >
              <Image
                src={scheduleData.find((d) => d.id === hoveredEvent)?.image || ""}
                alt="Race preview"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-6 left-6">
                <p className="text-lorenzo-accent font-bold uppercase tracking-widest text-sm">Track View</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
