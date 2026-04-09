"use client"

const logos = [
  { name: "Next.js", src: "/images/partners/next-logo.png" },
  { name: "Turbo", src: "/images/partners/turbo-logo.png" },
  { name: "v0", src: "/images/partners/v0green-logo.png" },
  { name: "AI SDK", src: "/images/partners/aisdk-logo.png" },
  { name: "Vercel", src: "/images/partners/vercel-logo.png" },
]

export default function InfiniteLogoSlider() {
  // Create a sequence of logos that is definitely wide enough (4 sets)
  const singleSequence = [...logos, ...logos, ...logos, ...logos]

  // We need two copies of this sequence to loop seamlessly by moving -50%
  // This creates a very long strip: [Seq 1][Seq 2]
  const sliderContent = [...singleSequence, ...singleSequence]

  return (
    <div className="w-full overflow-hidden py-10 relative mask-gradient bg-transparent">
      {/* Inject CSS keyframes locally to ensure it works without global dependencies */}
      <style jsx>{`
        @keyframes infinite-slide {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-infinite-slide {
          animation: infinite-slide 40s linear infinite;
        }
        /* Pause on hover if desired, but user requested infinite non-stop */
        /* .animate-infinite-slide:hover {
          animation-play-state: paused;
        } */
      `}</style>

      <div className="flex w-max animate-infinite-slide">
        {sliderContent.map((logo, index) => (
          <div
            key={index}
            className="relative h-[35px] w-[150px] flex items-center justify-center flex-shrink-0 mx-8 opacity-100 hover:grayscale hover:opacity-70 transition-all duration-300"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={logo.src || "/placeholder.svg"}
              alt={logo.name}
              className="h-full w-auto max-h-[30px] object-contain"
            />
          </div>
        ))}
      </div>
    </div>
  )
}
