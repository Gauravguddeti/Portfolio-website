"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import Image from "next/image"

const galleryItems = [
  { type: "quote", content: "NEVER GIVE UP", rotate: -2 },
  { type: "image", src: "/images/lorenzo-piloto1.png", rotate: 3 },
  {
    type: "text",
    content: "Racing isn't just a sport, it's a lifestyle. Every moment on and off the track defines who I am.",
    rotate: 1,
  },
  { type: "quote", content: "CHASING PERFECTION", rotate: -3 },
  { type: "image", src: "/images/lorenzo-piloto3.png", rotate: 2 },
  {
    type: "text",
    content: "From karting to motocross, the journey has been extraordinary. But this is just the beginning.",
    rotate: -1,
  },
  { type: "quote", content: "ALWAYS PUSHING", rotate: 2 },
  { type: "image", src: "/images/lorenzo-piloto5.png", rotate: -2 },
  {
    type: "text",
    content: "Every race is a new challenge, every lap is a new opportunity to prove myself.",
    rotate: 1,
  },
  { type: "image", src: "/images/lorenzo-piloto7.png", rotate: 1 },
  { type: "quote", content: "LIVING THE DREAM", rotate: -1 },
  { type: "image", src: "/images/moto.png", rotate: 2 },
  { type: "image", src: "/images/showroom3.png", rotate: -1 },
  { type: "image", src: "/images/lorenzo-piloto9.png", rotate: 3 },
  { type: "image", src: "/images/showroom5.png", rotate: -2 },
  { type: "image", src: "/images/trofeus.PNG", rotate: 1 },
]

function MasonryItem({ item, index }: { item: any; index: number }) {
  const ref = useRef<HTMLDivElement>(null)

  // Track scroll progress relative to this specific item's viewport position
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  })

  // 0% (enter) -> 20% (fully visible) -> 70% (start fading) -> 100% (faded to 3%)
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.7, 1], [0, 1, 1, 0.03])

  // Add a slight Y movement for parallax feel
  const y = useTransform(scrollYProgress, [0, 1], [50, -50])

  return (
    <motion.div
      ref={ref}
      style={{
        opacity,
        y,
        rotate: item.rotate,
      }}
      whileHover={{
        scale: 1.02,
        rotate: 0,
        zIndex: 10,
        transition: { duration: 0.3 },
      }}
      className={`${index === 1 || index === 7 ? "md:col-span-1 md:row-span-2" : ""}`}
    >
      {item.type === "quote" && (
        <div className="bg-lorenzo-accent text-lorenzo-text-dark p-10 rounded-2xl border-4 border-lorenzo-accent h-full flex flex-col items-center justify-center shadow-2xl">
          <p className="text-3xl md:text-4xl font-black text-center uppercase leading-tight">{item.content}</p>
        </div>
      )}

      {item.type === "image" && (
        <div className="relative h-full min-h-[300px] md:min-h-[400px] rounded-2xl overflow-hidden border-4 border-white/10 shadow-2xl hover:scale-102 transition-transform duration-300">
          <Image src={item.src || "/placeholder.svg"} alt="Gallery moment" fill className="object-cover" />
        </div>
      )}

      {item.type === "text" && (
        <div className="bg-lorenzo-light/5 border-2 border-lorenzo-light/20 p-8 rounded-2xl h-full flex items-center justify-center shadow-xl">
          <p className="text-lg md:text-xl font-medium text-center leading-relaxed">{item.content}</p>
        </div>
      )}
    </motion.div>
  )
}

export default function GallerySection() {
  return (
    <section id="gallery" className="relative min-h-screen bg-lorenzo-dark text-lorenzo-text-light py-24 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        {/*
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="text-5xl md:text-7xl font-black uppercase mb-16 text-center"
        >
          MOMENTS
        </motion.h2>
        */}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 auto-rows-auto">
          {galleryItems.map((item, index) => (
            <MasonryItem key={index} item={item} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}
