"use client"

import { motion } from "framer-motion"

const partners = ["HILTON", "UBER", "UYKART", "BELL", "PURE ELECTRIC", "GOOGLE", "RALPH LAUREN", "PLAYSTATION"]

export default function PartnersSection() {
  return (
    <section className="relative min-h-screen bg-[#F5F1E8] py-24 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            viewport={{ once: true }}
            className="relative h-[500px] flex items-center justify-center"
          >
            <svg width="100%" height="100%" viewBox="0 0 400 400" className="w-full h-full">
              <motion.path
                d="M50,200 Q80,100 150,180 Q200,240 250,150 Q280,100 320,170 Q340,210 360,180"
                fill="none"
                stroke="#c8f550"
                strokeWidth="8"
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={{ pathLength: 0, opacity: 0 }}
                whileInView={{ pathLength: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 3, ease: "easeInOut" }}
              />
              <motion.path
                d="M80,250 Q120,300 180,260 Q240,220 280,280"
                fill="none"
                stroke="#c8f550"
                strokeWidth="6"
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={{ pathLength: 0, opacity: 0 }}
                whileInView={{ pathLength: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 2.5, delay: 0.5, ease: "easeInOut" }}
              />
            </svg>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div>
              <h2 className="text-4xl md:text-6xl font-black uppercase text-black mb-2">PARTNERS</h2>
              <h3 className="text-3xl md:text-5xl font-serif italic text-black/80">& CAMPAIGNS</h3>
            </div>

            <p className="text-base md:text-lg text-black/70 leading-relaxed max-w-xl">
              Lorenzo is proud to collaborate with a range of partners, who share his passion for performance across a
              range of industries.
            </p>

            <div className="grid grid-cols-4 gap-6 pt-8">
              {partners.map((partner, index) => (
                <motion.div
                  key={partner}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.1 }}
                  className="aspect-square bg-white/50 rounded-xl flex items-center justify-center p-4 cursor-pointer border border-black/5 hover:border-black/20 transition-all"
                >
                  <span className="text-xs md:text-sm font-bold text-black/60 text-center">{partner}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
