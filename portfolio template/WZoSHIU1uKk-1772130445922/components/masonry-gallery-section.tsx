"use client"

import { useRef } from "react"
import Image from "next/image"
import { motion, useScroll, useTransform } from "framer-motion"

const galleryImages = [
  {
    src: "/images/lorenzo-piloto1.png",
    alt: "Lorenzo racing action 1",
    aspect: "aspect-[3/4]",
  },
  {
    src: "/images/lorenzo-piloto2.png",
    alt: "Lorenzo racing action 2",
    aspect: "aspect-[4/3]",
  },
  {
    src: "/images/lofan/lofan.jpg",
    alt: "Lorenzo racing action 3",
    aspect: "aspect-[3/4]",
  },
  {
    src: "/images/lofan/lofan3.jpg",
    alt: "Lorenzo racing action 4",
    aspect: "aspect-[4/3]",
  },
  {
    src: "/images/lorenzo-piloto7.png",
    alt: "Lorenzo racing action 5",
    aspect: "aspect-[3/4]",
  },
  {
    src: "/images/lorenzo-piloto5.png",
    alt: "Lorenzo racing action 6",
    aspect: "aspect-[4/3]",
  },
  {
    src: "/images/lorenzo-podio2.png",
    alt: "Lorenzo podium 1",
    aspect: "aspect-[3/4]",
  },
  {
    src: "/images/lorenzo-podio3.png",
    alt: "Lorenzo podium 2",
    aspect: "aspect-[4/3]",
  },
  {
    src: "/images/lorenzo-podio5.png",
    alt: "Lorenzo podium 3",
    aspect: "aspect-[3/4]",
  },
  {
    src: "/images/lorenzo-box.png",
    alt: "Motocross bike",
    aspect: "aspect-[4/3]",
  },
  {
    src: "/images/lorenzo-box3.png",
    alt: "Showroom 1",
    aspect: "aspect-[3/4]",
  },
  {
    src: "/images/lorenzo-box2.png",
    alt: "Showroom 2",
    aspect: "aspect-[4/3]",
  },
]

export default function MasonryGallerySection() {
  const sectionRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  })

  // Background transition: Dark Green -> Dark Green -> White
  const backgroundColor = useTransform(scrollYProgress, [0, 0.6, 0.9], ["#282c20", "#ccc", "#ffffff"])

  // Y Movement: Move grid up to reveal all images
  // Starts at 0vh and moves up to -150vh to show bottom images
  const y = useTransform(scrollYProgress, [0, 1], ["0vh", "-150vh"])

  const column1 = galleryImages.filter((_, i) => i % 3 === 0)
  const column2 = galleryImages.filter((_, i) => i % 3 === 1)
  const column3 = galleryImages.filter((_, i) => i % 3 === 2)

  return (
    <section
      ref={sectionRef}
      id="masonry-gallery"
      className="relative"
      style={{
        height: "400vh",
      }}
    >
      <motion.div className="sticky top-0 h-screen w-full overflow-hidden" style={{ backgroundColor }}>
        <motion.div style={{ y }} className="relative w-full max-w-[1400px] mx-auto px-4 md:px-8 py-20">
          <div className="flex flex-col md:flex-row gap-8 w-full">
            {/* Column 1 */}
            <div className="flex flex-col gap-8 w-full md:w-1/3">
              {column1.map((image, index) => (
                <MasonryCard key={`col1-${index}`} image={image} index={index * 3} />
              ))}
            </div>

            {/* Column 2 */}
            <div className="flex flex-col gap-8 w-full md:w-1/3">
              {column2.map((image, index) => (
                <MasonryCard key={`col2-${index}`} image={image} index={index * 3 + 1} />
              ))}
            </div>

            {/* Column 3 */}
            <div className="flex flex-col gap-8 w-full md:w-1/3">
              {column3.map((image, index) => (
                <MasonryCard key={`col3-${index}`} image={image} index={index * 3 + 2} />
              ))}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  )
}

function MasonryCard({ image, index }: { image: any; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      viewport={{ once: true, margin: "-50px" }}
      className={`relative overflow-hidden rounded-xl shadow-2xl transition-all duration-500 bg-gray-900/20 border-2 border-transparent w-full ${image.aspect}`}
    >
      <Image
        src={image.src || "/placeholder.svg"}
        alt={image.alt}
        fill
        className="object-cover transition-transform duration-700"
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        quality={95}
      />
    </motion.div>
  )
}
