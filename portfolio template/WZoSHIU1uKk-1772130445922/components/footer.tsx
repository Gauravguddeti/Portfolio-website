"use client"

import { Suspense } from "react"
import { Canvas } from "@react-three/fiber"
import { Environment, PerspectiveCamera } from "@react-three/drei"
import { motion } from "framer-motion"
import Helmet3DModel from "./helmet-3d-model"
import InfiniteLogoSlider from "./infinite-logo-slider"

function LoadingFallback() {
  return (
    <mesh>
      <sphereGeometry args={[1.5, 16, 16]} />
      <meshStandardMaterial color="#1a1f1a" wireframe />
    </mesh>
  )
}

export default function Footer() {
  return (
    <footer className="bg-lorenzo-accent pt-0 px-4 md:px-8 min-h-screen flex flex-col justify-end relative pb-5">
      <div className="absolute top-0 left-0 right-0 h-72 bg-gradient-to-b from-[#f5f1e8] to-lorenzo-accent z-0" />

      {/* Main Dark Card Container */}
      <div className="relative flex-1 flex flex-col w-full max-w-[1688px] mx-auto mt-12 z-10">
        {/* SVG Background Mask */}
        <div
          className="absolute inset-0 w-full h-full z-0 bg-[#282c20] overflow-hidden"
          style={{
            maskImage: 'url("/images/footer-mask.svg")',
            WebkitMaskImage: 'url("/images/footer-mask.svg")',
            maskSize: "100% 100%",
            WebkitMaskSize: "100% 100%",
            maskRepeat: "no-repeat",
            WebkitMaskRepeat: "no-repeat",
          }}
        >
          {/* <AnimatedTextureCanvas /> */}

          <div
            className="absolute inset-0 w-full h-full opacity-30"
            style={{
              backgroundImage: 'url("/images/curv.svg")',
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}
          />
        </div>

        {/* Increased padding-x to push content inwards away from mask edges, and added padding-bottom to prevent overflow */}
        <div className="relative z-20 flex flex-col h-full px-8 md:px-24 py-12 md:py-20 md:pb-12 md:pl-0 md:pr-0">
          {/* Main Content Grid */}
          <div className="flex-1 grid grid-cols-1 md:grid-cols-12 gap-8 items-stretch mt-0">
            {/* Left Column - Pages */}
            <div className="md:col-span-3 text-center order-2 md:order-1 md:pl-8 flex flex-col justify-center h-full">
              <h4 className="font-black text-xs uppercase mb-6 text-lorenzo-text-light/40 tracking-[0.2em]">PAGES</h4>
              <ul className="space-y-2">
                {["HOME", "ON TRACK", "OFF TRACK", "CALENDAR"].map((item) => (
                  <li className="leading-5" key={item}>
                    <a
                      href={`#${item.toLowerCase().replace(" ", "-")}`}
                      className="text-lorenzo-text-light font-bold text-xl md:text-2xl uppercase hover:text-lorenzo-accent transition-colors inline-block leading-4"
                    >
                      {item}
                    </a>
                  </li>
                ))}
                <li>
                  <a
                    href="#store"
                    className="text-lorenzo-accent font-black text-xl md:text-2xl uppercase hover:text-white transition-colors inline-block"
                  >
                    STORE
                  </a>
                </li>
              </ul>
            </div>

            {/* Center Column - Helmet & Title */}
            <div className="md:col-span-6 flex flex-col items-center justify-center order-1 md:order-2 relative">
              {/* Typography Overlay - Increased top margin for more spacing */}
              <div className="absolute top-0 left-0 right-0 z-0 text-center transform -translate-y-1/4 md:-translate-y-0 mt-24">
                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                  className="text-5xl md:text-7xl lg:text-8xl font-black uppercase tracking-tighter leading-[0.9] text-lorenzo-text-light mix-blend-overlay opacity-90"
                >
                  <span className="font-sans block">ALWAYS 
                  <span className="font-brier text-lorenzo-accent"> BRINGING</span>
                  </span>
                  <span className="font-sans block">
                    THE <span className="font-brier text-lorenzo-accent">FIGHT.</span>
                  </span>
                </motion.h2>
              </div>

              {/* 3D Helmet */}
              <div className="relative w-full h-[300px] md:h-[500px] z-10 mt-24 md:mt-24">
                <Canvas>
                  <PerspectiveCamera makeDefault position={[0, 0, 6.5]} />
                  <ambientLight intensity={0.8} />
                  <directionalLight position={[10, 10, 5]} intensity={1.5} />
                  <pointLight position={[-10, -10, -5]} intensity={0.8} color="#CFFF04" />
                  <Suspense fallback={<LoadingFallback />}>
                    <Helmet3DModel modelPath="/3d/helmet-lorenzo.glb" />
                  </Suspense>
                  <Environment preset="city" />
                </Canvas>
              </div>

              {/* CTA Button - Adjusted bottom position to be closer to helmet */}
              <motion.button
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="absolute -bottom-12 z-20 bg-lorenzo-accent text-lorenzo-dark font-black uppercase px-8 py-4 rounded-[14px] text-sm tracking-wider hover:bg-white transition-colors flex items-center gap-2"
              >
                BUSINESS ENQUIRIES
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M7 17L17 7M17 7H7M17 7V17" />
                </svg>
              </motion.button>
            </div>

            {/* Right Column - Follow */}
            <div className="md:col-span-3 text-center order-3 md:order-2 md:pr-8 flex flex-col justify-center h-full">
              <h4 className="font-black text-xs uppercase mb-6 text-lorenzo-text-light/40 tracking-[0.2em]">
                FOLLOW ON
              </h4>
              <ul className="space-y-2">
                {["TIKTOK", "INSTAGRAM", "YOUTUBE", "TWITCH"].map((platform) => (
                  <li className="leading-5" key={platform}>
                    <a
                      href="#"
                      className="text-lorenzo-text-light font-bold text-xl md:text-2xl uppercase hover:text-lorenzo-accent transition-colors inline-block leading-4"
                    >
                      {platform}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Partners Row */}
          {/* Added mb-8 to ensure logos don't touch the bottom edge of the mask */}
          <div className="border-lorenzo-text-light/10 border-t-0 mb-0 mt-32 pt-0">
            <InfiniteLogoSlider />
          </div>
        </div>
      </div>

      {/* Bottom Bar (Outside Card) */}
      {/* Wrapped in max-w container to align perfectly with the card above */}
      <div className="w-full max-w-[1688px] mx-auto px-8 md:px-12 relative z-20 pt-0">
        <div className="flex flex-col md:flex-row justify-between items-center text-lorenzo-dark text-xs font-bold tracking-wider uppercase">
          <p>© 2025 Lorenzo. All rights reserved</p>
          <div className="flex gap-6 mt-2 md:mt-0">
            <a href="#" className="hover:opacity-60 transition-opacity">
              PRIVACY POLICY
            </a>
            <a href="#" className="hover:opacity-60 transition-opacity">
              TERMS
            </a>
          </div>
        </div>
      </div>

      <div className="w-full max-w-[1688px] mx-auto px-8 md:px-12 relative z-20 pt-0">
        <div className="flex flex-col md:flex-row justify-between items-center text-lorenzo-dark text-xs font-bold tracking-wider uppercase">
          <p className="text-xs mt-7 opacity-40 font-medium leading-4 text-left">
            This project was developed by Tulio Portela and is not a real project. Inspired by the website of racing
            driver Lando Norris. Lorenzo does not exist. It is pure inspiration (and homage) to the real driver Lorenzo,
            son of the advertising genius and my great friend, Adan Cardoso. Most of the images were made with Nano; if
            it's not good, complain to that 'banana'! Brands, visual identity, applications, it's all a product of my
            imagination and nothing is real. I do not have authorization from the brands; this is a fictional project.
          </p>
        </div>
      </div>
    </footer>
  )
}
