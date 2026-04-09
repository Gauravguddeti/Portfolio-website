"use client"

import { ArrowRight } from 'lucide-react'
import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"

export default function StoreSection() {
  return (
    <section id="store" className="relative min-h-screen bg-[#F5F1E8] py-24 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          viewport={{ once: true }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16"
        >
          <div className="space-y-6">
            <p className="text-xs md:text-sm font-bold uppercase tracking-[0.4em] text-black/60">
              NEW IN:
            </p>
            <h2 className="text-5xl md:text-7xl lg:text-8xl font-black uppercase text-black leading-[0.9]">
              LN4 RACING
            </h2>
            <p className="text-base md:text-lg text-black/70 max-w-md leading-relaxed">
              A collection built for performance and speed, combining classic motorsport aesthetics & modern craftsmanship.
            </p>
            
            <Link
              href="#"
              className="inline-flex items-center gap-3 bg-lorenzo-accent text-black px-8 py-4 rounded-full text-sm font-black uppercase hover:scale-105 transition-transform duration-300 shadow-lg"
            >
              VISIT THE STORE
              <ArrowRight className="w-5 h-5" />
            </Link>

            <div className="grid grid-cols-3 gap-4 pt-6">
              <div className="relative aspect-square rounded-2xl overflow-hidden border-2 border-black/10 hover:scale-105 transition-transform duration-300 cursor-pointer">
                <Image src="/images/bone.png" alt="Product 1" fill className="object-cover" />
              </div>
              <div className="relative aspect-square rounded-2xl overflow-hidden border-2 border-black/10 hover:scale-105 transition-transform duration-300 cursor-pointer">
                <Image src="/images/bone2.png" alt="Product 2" fill className="object-cover" />
              </div>
              <div className="relative aspect-square rounded-2xl overflow-hidden border-2 border-black/10 hover:scale-105 transition-transform duration-300 cursor-pointer">
                <Image src="/images/bone3.png" alt="Product 3" fill className="object-cover" />
              </div>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            viewport={{ once: true }}
            className="relative h-[600px] rounded-3xl overflow-hidden"
          >
            <Image 
              src="/images/lorenzo-piloto.png" 
              alt="Lorenzo Racing" 
              fill 
              className="object-cover" 
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
