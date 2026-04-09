"use client"

import { useEffect } from "react"

export default function Home() {
  useEffect(() => {
    // Mouse Blob Follower
    const blob = document.getElementById("cursor-blob")
    const handleMouseMove = (e: MouseEvent) => {
      const x = e.clientX
      const y = e.clientY
      if (blob) {
        blob.style.transform = `translate(${x - 200}px, ${y - 200}px)`
      }
    }
    document.addEventListener("mousemove", handleMouseMove)

    // Parallax Effect
    const handleScroll = () => {
      const scroll = window.pageYOffset

      // Hero parallax
      const parallaxTexts = document.querySelectorAll(".parallax-text")
      parallaxTexts.forEach((text) => {
        const speed = text.getAttribute("data-speed")
        if (speed) {
          ;(text as HTMLElement).style.transform = `translateX(${scroll * Number.parseFloat(speed) * 0.1}px)`
        }
      })

      const heroImg = document.getElementById("hero-img")
      if (heroImg) {
        heroImg.style.transform = `translate(-50%, calc(-50% + ${scroll * 0.2}px)) scale(${1 + scroll * 0.0005})`
      }

      // Floating labels in project section
      const labels = document.querySelectorAll(".floating-label")
      labels.forEach((label, index) => {
        const direction = index % 2 === 0 ? 1 : -1
        ;(label as HTMLElement).style.transform = `translateY(${scroll * 0.1 * direction}px)`
      })
    }
    window.addEventListener("scroll", handleScroll)

    // Simple reveal on enter (Intersection Observer)
    const observerOptions = {
      threshold: 0.1,
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("active")
        }
      })
    }, observerOptions)

    document.querySelectorAll(".reveal-text").forEach((text) => {
      observer.observe(text)
    })

    // Add smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener("click", function (e) {
        e.preventDefault()
        const href = (this as HTMLAnchorElement).getAttribute("href")
        if (href) {
          document.querySelector(href)?.scrollIntoView({
            behavior: "smooth",
          })
        }
      })
    })

    return () => {
      document.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("scroll", handleScroll)
      observer.disconnect()
    }
  }, [])

  return (
    <>
      <div className="blob" id="cursor-blob"></div>

      <nav>
        <div className="logo">VISCERA ©26</div>
        <ul className="nav-links">
          <li>
            <a href="#work">Work</a>
          </li>
          <li>
            <a href="#about">Studio</a>
          </li>
          <li>
            <a href="#contact">Contact</a>
          </li>
        </ul>
      </nav>

      <main>
        {/* HERO SECTION */}
        <section id="hero">
          <img
            src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=1200"
            alt="Editorial"
            className="hero-img"
            id="hero-img"
          />
          <div className="hero-title-container container">
            <span className="huge-type parallax-text" data-speed="-2">
              VISION
            </span>
            <span className="huge-type outline-text parallax-text" data-speed="2" style={{ paddingLeft: "200px" }}>
              SYSTEMS
            </span>
          </div>
        </section>

        {/* INTRO */}
        <section id="about">
          <div className="container">
            <div style={{ maxWidth: "800px" }}>
              <h2
                style={{
                  fontSize: "3rem",
                  fontFamily: "var(--syne)",
                  marginBottom: "40px",
                }}
              >
                WE BUILD DIGITAL ARTIFACTS THAT SHATTER THE NOISE.
              </h2>
              <p
                style={{
                  fontSize: "1.5rem",
                  fontWeight: 300,
                  color: "#888",
                }}
              >
                Visceral aesthetic. Technical precision. We operate at the intersection of high-fashion editorial and
                brutalist digital architecture.
              </p>
            </div>
          </div>
        </section>

        {/* MARQUEE */}
        <div className="scrolling-marquee">
          <div className="marquee-inner">
            <span className="huge-type outline-text">NEW ERA — NEW ORDER — VISCERA — BEYOND FORM — </span>
            <span className="huge-type outline-text">NEW ERA — NEW ORDER — VISCERA — BEYOND FORM — </span>
          </div>
        </div>

        {/* WORK SECTION */}
        <section id="work" className="container">
          <div className="sticky-type">ARCHIVE</div>

          {/* Project 1 */}
          <div className="project-row">
            <div className="project-info">
              <span style={{ fontFamily: "var(--syne)", color: "var(--accent)" }}>001 / FASHION</span>
              <h3 className="huge-type" style={{ fontSize: "6rem", margin: "20px 0" }}>
                NOIR
              </h3>
              <p>
                A deep-dive into monochromatic textures and high-contrast digital layouts for a Parisian couture house.
              </p>
              <div className="divider"></div>
              <p>YEAR: 2024</p>
            </div>
            <div className="project-media">
              <img
                src="https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&q=80&w=1000"
                alt="Noir Project"
                className="project-image"
              />
              <div className="floating-label huge-type outline-text" style={{ fontSize: "8rem" }}>
                SHADOW
              </div>
            </div>
          </div>

          {/* Project 2 */}
          <div className="project-row" style={{ flexDirection: "row-reverse" }}>
            <div className="project-info">
              <span style={{ fontFamily: "var(--syne)", color: "var(--accent)" }}>002 / ARCHITECTURE</span>
              <h3 className="huge-type" style={{ fontSize: "6rem", margin: "20px 0" }}>
                BRUTE
              </h3>
              <p>
                Conceptual web experience for a structural engineering firm focused on monolithic concrete structures.
              </p>
              <div className="divider"></div>
              <p>YEAR: 2023</p>
            </div>
            <div className="project-media">
              <img
                src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=1000"
                alt="Brute Project"
                className="project-image"
              />
              <div
                className="floating-label huge-type outline-text"
                style={{ fontSize: "8rem", right: "auto", left: "-100px" }}
              >
                CONCRETE
              </div>
            </div>
          </div>
        </section>

        {/* OVERLAPPING COMPOSITION SECTION */}
        <section>
          <div className="container composition">
            <div className="comp-item-1">
              <img
                src="https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&q=80&w=600"
                className="comp-image"
                alt="Layer 1"
              />
            </div>
            <div className="comp-item-2">
              <img
                src="https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&q=80&w=800"
                className="comp-image"
                alt="Layer 2"
              />
            </div>
            <div className="comp-item-3">
              <div
                style={{
                  background: "var(--accent)",
                  padding: "40px",
                  color: "white",
                }}
              >
                <h4 style={{ fontFamily: "var(--syne)", fontSize: "2rem" }}>LAYERED DEPTH</h4>
                <p style={{ marginTop: "20px" }}>
                  We believe in depth—both in meaning and in visual manifestation. Overlapping elements create a
                  zine-like chaos that is meticulously organized.
                </p>
              </div>
            </div>
            <div
              style={{
                position: "absolute",
                bottom: 0,
                right: 0,
                width: "400px",
                zIndex: 10,
              }}
            >
              <img
                src="https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&q=80&w=500"
                className="comp-image"
                alt="Layer 3"
              />
            </div>
          </div>
        </section>

        {/* FOOTER */}
        <footer id="contact">
          <div className="container">
            <div className="footer-cta">
              <a href="mailto:hello@viscera.studio">LET&apos;S — WORK</a>
            </div>
            <div className="divider"></div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                fontFamily: "var(--syne)",
                fontSize: "0.8rem",
                textTransform: "uppercase",
                color: "#555",
              }}
            >
              <div>© 2026 VISCERA STUDIO</div>
              <div style={{ display: "flex", gap: "30px" }}>
                <span>INSTAGRAM</span>
                <span>TWITTER/X</span>
                <span>BEHANCE</span>
              </div>
              <div>LOCATED IN BERLIN // TOKYO</div>
            </div>
          </div>
        </footer>
      </main>
    </>
  )
}
