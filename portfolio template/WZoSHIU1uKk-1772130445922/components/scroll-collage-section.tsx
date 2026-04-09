"use client"

import { useRef } from "react"
import Image from "next/image"
import { motion, useScroll, useTransform } from "framer-motion"

const collageItems = [
  {
    type: "image",
    src: "/images/lorenzo-piloto1.png",
    initialX: 800,
    initialY: 300,
    size: "w-[320px] h-[420px] md:w-[400px] md:h-[520px]",
  },
  {
    type: "image",
    src: "/images/lorenzo-piloto3.png",
    initialX: 1350,
    initialY: 700,
    size: "w-[350px] h-[450px] md:w-[430px] md:h-[550px]",
  },
  {
    type: "image",
    src: "/images/lorenzo-piloto5.png",
    initialX: 1000,
    initialY: 1100,
    size: "w-[300px] h-[400px] md:w-[380px] md:h-[480px]",
  },
  {
    type: "image",
    src: "/images/lorenzo-piloto7.png",
    initialX: 850,
    initialY: 1500,
    size: "w-[340px] h-[440px] md:w-[420px] md:h-[540px]",
  },
  {
    type: "image",
    src: "/images/lorenzo-podio5.png",
    initialX: 950,
    initialY: 1900,
    size: "w-[400px] h-[300px] md:w-[500px] md:h-[380px]",
  },
  {
    type: "image",
    src: "/images/lorenzo-podio2.png",
    initialX: 1250,
    initialY: 2200,
    size: "w-[330px] h-[430px] md:w-[410px] md:h-[530px]",
  },
]

export default function ScrollCollageSection() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  })

  const backgroundColor = useTransform(scrollYProgress, [0, 0.5, 1], ["#1a1f1a", "#5a6a5a", "#ffffff"])

  const containerX = useTransform(scrollYProgress, [0, 1], [0, -1400])
  const containerY = useTransform(scrollYProgress, [0, 1], [0, -1800])

  const legacyOpacity = useTransform(scrollYProgress, [0.3, 0.45, 0.55, 0.7], [0, 1, 1, 0])

  return (
    <section ref={ref} className="relative h-[240vh]">
      <div className="sticky top-0 h-screen">
        <motion.div className="absolute inset-0 -z-10" style={{ backgroundColor }} />

        <motion.div
          style={{ x: containerX, y: containerY }}
          className="absolute top-[50vh] left-[50vw] w-[3000px] h-[3000px] will-change-transform"
        >
          {collageItems.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              viewport={{ once: false, margin: "-50px" }}
              style={{
                position: "absolute",
                left: item.initialX,
                top: item.initialY,
              }}
              className={`${item.size} will-change-transform z-10`}
            >
              <div className="relative w-full h-full shadow-2xl rounded-lg overflow-hidden">
                <Image
                  src={item.src || "/placeholder.svg"}
                  alt={`Lorenzo action ${index}`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority={index < 3}
                />
              </div>
            </motion.div>
          ))}
        </motion.div>

        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-0 pointer-events-none">
          <motion.h2
            style={{ opacity: legacyOpacity }}
            className="text-white/15 font-black text-[4rem] md:text-[8rem] lg:text-[12rem] uppercase"
          >
            LEGACY
          </motion.h2>
        </div>
      </div>
    </section>
  )
}
