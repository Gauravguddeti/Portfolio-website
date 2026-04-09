"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"
import Image from "next/image"

interface RaceResult {
  round: string
  location: string
  flagImage: string
  date: string
  finish: string
  fastestLap: string
}

interface YearData {
  year: string
  podiums: string
  bestFinish: string
  results: RaceResult[]
}

const historicalData: YearData[] = [
  {
    year: "2024",
    podiums: "13",
    bestFinish: "1ST",
    results: [
      {
        round: "01",
        location: "BAHRAIN",
        flagImage: "/images/flags/flag-Bahrain.svg",
        date: "2 MAR 24",
        finish: "1ST",
        fastestLap: "1:34.476",
      },
      {
        round: "02",
        location: "SAUDI ARABIA",
        flagImage: "/images/flags/flag-Saudi-Arabia.svg",
        date: "9 MAR 24",
        finish: "1ST",
        fastestLap: "1:31.944",
      },
      {
        round: "03",
        location: "AUSTRALIA",
        flagImage: "/images/flags/flag-Australia.svg",
        date: "24 MAR 24",
        finish: "3RD",
        fastestLap: "1:19.915",
      },
      {
        round: "04",
        location: "JAPAN",
        flagImage: "/images/flags/flag-Japan.svg",
        date: "7 APR 24",
        finish: "1ST",
        fastestLap: "1:35.186",
      },
      {
        round: "05",
        location: "CHINA",
        flagImage: "/images/flags/flag-China.svg",
        date: "21 APR 24",
        finish: "2ND",
        fastestLap: "1:37.690",
      },
      {
        round: "06",
        location: "MIAMI",
        flagImage: "/images/flags/flag-USA.svg",
        date: "5 MAY 24",
        finish: "1ST",
        fastestLap: "1:29.456",
      },
      {
        round: "07",
        location: "MONACO",
        flagImage: "/images/flags/flag-Monaco.svg",
        date: "26 MAY 24",
        finish: "3RD",
        fastestLap: "1:14.123",
      },
      {
        round: "08",
        location: "CANADA",
        flagImage: "/images/flags/flag-Canada.svg",
        date: "9 JUN 24",
        finish: "2ND",
        fastestLap: "1:15.456",
      },
    ],
  },
  {
    year: "2023",
    podiums: "08",
    bestFinish: "1ST",
    results: [
      {
        round: "01",
        location: "EMILIA ROMAGNA",
        flagImage: "/images/flags/flag-Italy.svg",
        date: "19 MAY 23",
        finish: "2ND",
        fastestLap: "1:19.994",
      },
      {
        round: "02",
        location: "BRAZIL",
        flagImage: "/images/flags/flag-Brazil.png",
        date: "2 JUN 23",
        finish: "1ST",
        fastestLap: "1:12.345",
      },
      {
        round: "03",
        location: "SPAIN",
        flagImage: "/images/flags/flag-Spain.png",
        date: "16 JUN 23",
        finish: "1ST",
        fastestLap: "1:17.890",
      },
      {
        round: "04",
        location: "BRAZIL",
        flagImage: "/images/flags/flag-Brazil.png",
        date: "30 JUN 23",
        finish: "2ND",
        fastestLap: "1:15.234",
      },
      {
        round: "05",
        location: "HUNGARY",
        flagImage: "/images/flags/flag-Hungary.svg",
        date: "14 JUL 23",
        finish: "4TH",
        fastestLap: "1:20.678",
      },
      {
        round: "06",
        location: "AUSTRIA",
        flagImage: "/images/flags/flag-Austria.svg",
        date: "2 JUL 23",
        finish: "3RD",
        fastestLap: "1:07.123",
      },
      {
        round: "07",
        location: "BRITAIN",
        flagImage: "/images/flags/flag-UK.svg",
        date: "9 JUL 23",
        finish: "2ND",
        fastestLap: "1:30.456",
      },
      {
        round: "08",
        location: "BELGIUM",
        flagImage: "/images/flags/flag-Belgium.svg",
        date: "30 JUL 23",
        finish: "5TH",
        fastestLap: "1:47.890",
      },
    ],
  },
  {
    year: "2022",
    podiums: "06",
    bestFinish: "2ND",
    results: [
      {
        round: "01",
        location: "BELGIUM",
        flagImage: "/images/flags/flag-Belgium.svg",
        date: "28 JUL 22",
        finish: "1ST",
        fastestLap: "1:46.123",
      },
      {
        round: "02",
        location: "BRAZIL",
        flagImage: "/images/flags/flag-Brazil.png",
        date: "11 AUG 22",
        finish: "1ST",
        fastestLap: "1:13.567",
      },
      {
        round: "03",
        location: "NETHERLANDS",
        flagImage: "/images/flags/flag-Netherlands.svg",
        date: "25 AUG 22",
        finish: "2TH",
        fastestLap: "1:13.901",
      },
      {
        round: "04",
        location: "ITALY",
        flagImage: "/images/flags/flag-Italy.svg",
        date: "8 SEP 22",
        finish: "2ND",
        fastestLap: "1:21.456",
      },
      {
        round: "05",
        location: "AZERBAIJAN",
        flagImage: "/images/flags/flag-Azerbaijan.svg",
        date: "22 SEP 22",
        finish: "1ST",
        fastestLap: "1:45.234",
      },
      {
        round: "06",
        location: "FRANCE",
        flagImage: "/images/flags/flag-France.svg",
        date: "24 JUL 22",
        finish: "4TH",
        fastestLap: "1:36.789",
      },
      {
        round: "07",
        location: "USA",
        flagImage: "/images/flags/flag-USA.svg",
        date: "23 OCT 22",
        finish: "3RD",
        fastestLap: "1:39.123",
      },
      {
        round: "08",
        location: "MEXICO",
        flagImage: "/images/flags/flag-Mexico.png",
        date: "30 OCT 22",
        finish: "5TH",
        fastestLap: "1:22.234",
      },
    ],
  },
  {
    year: "2021",
    podiums: "04",
    bestFinish: "2ND",
    results: [
      {
        round: "01",
        location: "SINGAPORE",
        flagImage: "/images/flags/flag-Singapore.svg",
        date: "6 OCT 21",
        finish: "3RD",
        fastestLap: "1:36.789",
      },
      {
        round: "02",
        location: "UNITED STATES",
        flagImage: "/images/flags/flag-USA.svg",
        date: "20 OCT 21",
        finish: "2ND",
        fastestLap: "1:38.123",
      },
      {
        round: "03",
        location: "MEXICO",
        flagImage: "/images/flags/flag-Mexico.png",
        date: "27 OCT 21",
        finish: "1ST",
        fastestLap: "1:21.234",
      },
      {
        round: "04",
        location: "BRAZIL",
        flagImage: "/images/flags/flag-Brazil.png",
        date: "3 NOV 21",
        finish: "1ST",
        fastestLap: "1:13.890",
      },
      {
        round: "05",
        location: "ABU DHABI",
        flagImage: "/images/flags/flag-Abu-Dabi.svg",
        date: "24 NOV 21",
        finish: "2ND",
        fastestLap: "1:26.456",
      },
      {
        round: "06",
        location: "PORTUGAL",
        flagImage: "/images/flags/flag-Portugal.svg",
        date: "2 MAY 21",
        finish: "5TH",
        fastestLap: "1:23.456",
      },
      {
        round: "07",
        location: "SPAIN",
        flagImage: "/images/flags/flag-Spain.png",
        date: "9 MAY 21",
        finish: "4TH",
        fastestLap: "1:22.567",
      },
      {
        round: "08",
        location: "MONACO",
        flagImage: "/images/flags/flag-Monaco.svg",
        date: "23 MAY 21",
        finish: "3RD",
        fastestLap: "1:14.678",
      },
    ],
  },
]

const getRandomTrophy = (id: number | string) => {
  const val = typeof id === "string" ? Number.parseInt(id.replace(/\D/g, "") || "0") : id
  const trophyNum = (val % 9) + 1
  return `/images/trofeus/trofeu${trophyNum}.svg`
}

export function HistoricalResultsAccordion() {
  const [activeYear, setActiveYear] = useState<string | null>("2024")

  return (
    <div className="w-full bg-[#111111] py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-6">
          <div className="flex flex-col">
            <h2 className="font-[family-name:var(--font-oswald)] text-4xl md:text-6xl font-bold uppercase leading-none text-white tracking-tighter">
              MOTOCROSS
            </h2>
            <h1 className="font-brier text-5xl text-zinc-400 leading-none md:-mt-2 md:text-7xl mt-2.5">All Results</h1>
          </div>
          <p className="text-zinc-500 text-sm md:text-base max-w-xs md:text-right font-medium">
            The new Motocross year is underway, view Lorenzo&#39;s schedule below.
          </p>
        </div>
        {/* </CHANGE> */}

        <div className="flex flex-col gap-4">
          {historicalData.map((data) => (
            <div key={data.year} className="border-b border-white/10 last:border-none">
              <button
                onClick={() => setActiveYear(activeYear === data.year ? null : data.year)}
                className={cn(
                  "w-full flex items-center justify-between p-4 md:p-6 transition-all duration-300 ease-out group",
                  activeYear === data.year
                    ? "bg-lorenzo-accent text-black"
                    : "bg-transparent text-white hover:bg-white/5",
                )}
              >
                <div className="flex items-center gap-6">
                  <ChevronDown
                    className={cn(
                      "w-6 h-6 md:w-8 md:h-8 transition-transform duration-300",
                      activeYear === data.year ? "rotate-180 text-black" : "text-white -rotate-90",
                    )}
                  />
                  <span className="font-[family-name:var(--font-oswald)] font-bold text-5xl md:text-7xl tracking-tighter leading-none">
                    {data.year}
                  </span>
                </div>

                <div className="flex items-center gap-8 md:gap-16 pr-4">
                  <div className="flex flex-col items-end">
                    <div className="text-xs font-bold uppercase opacity-60 mb-1">Finish</div>
                    <span className="font-[family-name:var(--font-oswald)] font-bold text-2xl md:text-4xl italic leading-none">
                      {data.bestFinish}
                    </span>
                  </div>
                  <div className="flex flex-col items-end">
                    <div className="text-xs font-bold uppercase opacity-60 mb-1">Podiums</div>
                    <span className="font-[family-name:var(--font-oswald)] font-bold text-2xl md:text-4xl leading-none">
                      {data.podiums}
                    </span>
                  </div>
                </div>
              </button>

              <AnimatePresence>
                {activeYear === data.year && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden bg-zinc-900/30"
                  >
                    <div className="grid grid-cols-12 gap-4 py-4 px-6 text-[10px] md:text-xs font-bold text-white/30 uppercase tracking-widest border-b border-white/10">
                      <div className="col-span-1">Round</div>
                      <div className="col-span-4">Location</div>
                      <div className="col-span-3 text-center">Date</div>
                      <div className="col-span-2 text-center">Finish</div>
                      <div className="col-span-2 text-right">Fastest Lap</div>
                    </div>

                    <div className="p-0">
                      {data.results.map((result, index) => (
                        <div
                          key={index}
                          className="grid grid-cols-12 gap-4 py-4 px-6 border-b border-white/5 text-white hover:bg-white/5 transition-colors items-center group"
                        >
                          <div className="col-span-1 relative">
                            <span className="font-[family-name:var(--font-oswald)] font-bold text-2xl text-white/40 relative z-10">
                              {result.round}
                            </span>
                          </div>

                          <div className="col-span-4 flex items-center gap-3">
                            <Image
                              src={result.flagImage || "/placeholder.svg"}
                              alt={`${result.location} flag`}
                              width={32}
                              height={24}
                              className="w-7 h-5 md:w-8 md:h-6 object-cover rounded-sm"
                            />
                            <span className="font-[family-name:var(--font-oswald)] font-bold text-2xl md:text-4xl uppercase tracking-tighter leading-none">
                              {result.location}
                            </span>
                          </div>

                          <div className="col-span-3 text-center font-[family-name:var(--font-oswald)] font-bold text-xl md:text-2xl text-white/70 uppercase">
                            {result.date}
                          </div>

                          <div className="col-span-2 text-center font-[family-name:var(--font-oswald)] font-bold text-xl md:text-3xl italic flex items-center justify-center gap-2 md:gap-3">
                            <Image
                              src={getRandomTrophy(index + result.location) || "/placeholder.svg"}
                              alt="Trophy"
                              width={32}
                              height={32}
                              className="w-7 h-7 md:w-9 md:h-9"
                            />
                            <span className={result.finish === "1ST" ? "text-lorenzo-accent" : "text-white"}>
                              {result.finish}
                            </span>
                          </div>

                          <div className="col-span-2 text-right font-[family-name:var(--font-oswald)] font-bold text-lg">
                            {result.fastestLap}
                            <span className="text-xs ml-1 text-white/40">s</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
