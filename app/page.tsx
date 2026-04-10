"use client"

import { useEffect, useState } from "react"
import { Github, Linkedin, Mail, Download, ExternalLink, ChevronDown, ChevronUp, Wrench } from "lucide-react"
import { ProjectCard } from "@/components/project-card"
import { projects, currentProject } from "@/lib/projects"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"


// Split: top 4 = main cards, rest = "show more"
const mainProjects = projects.slice(0, 4)
const extraProjects = projects.slice(4)

export default function Home() {
  const [showMore, setShowMore] = useState(false)
  const [formState, setFormState] = useState({ name: "", email: "", message: "" })
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle")

  useEffect(() => {
    // Mouse Blob Follower
    const blob = document.getElementById("cursor-blob")
    const handleMouseMove = (e: MouseEvent) => {
      if (blob) {
        blob.style.transform = `translate(${e.clientX - 200}px, ${e.clientY - 200}px)`
      }
    }
    document.addEventListener("mousemove", handleMouseMove)

    // Parallax Effect
    const handleScroll = () => {
      const scroll = window.pageYOffset

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

      const labels = document.querySelectorAll(".floating-label")
      labels.forEach((label, index) => {
        const direction = index % 2 === 0 ? 1 : -1
        ;(label as HTMLElement).style.transform = `translateY(${scroll * 0.1 * direction}px)`
      })
    }
    window.addEventListener("scroll", handleScroll)

    // Intersection Observer reveal
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("active")
        })
      },
      { threshold: 0.1 },
    )
    document.querySelectorAll(".reveal-text").forEach((text) => observer.observe(text))

    // Smooth anchor scroll
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener("click", (e) => {
        e.preventDefault()
        const href = (anchor as HTMLAnchorElement).getAttribute("href")
        if (href) document.querySelector(href)?.scrollIntoView({ behavior: "smooth" })
      })
    })

    return () => {
      document.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("scroll", handleScroll)
      observer.disconnect()
    }
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus("submitting")
    try {
      const response = await fetch("https://formsubmit.co/ajax/guddetigaurav1@gmail.com", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify(formState),
      })
      if (response.ok) {
        setStatus("success")
        setFormState({ name: "", email: "", message: "" })
      } else {
        setStatus("error")
      }
    } catch {
      setStatus("error")
    } finally {
      setTimeout(() => setStatus("idle"), 4000)
    }
  }

  return (
    <>
      {/* Orange blob cursor follower */}
      <div className="blob" id="cursor-blob" />

      {/* ── NAV ── */}
      <nav>
        <div className="logo">GAURAV.DEV</div>
        <ul className="nav-links">
          <li><a href="#work">Work</a></li>
          <li><a href="#about">About</a></li>
          <li><a href="#contact">Contact</a></li>
        </ul>
      </nav>

      <main>
        {/* ── HERO ── */}
        <section id="hero">
          <img
            src="/face_pic.png"
            alt="Gaurav Guddeti"
            className="hero-img"
            id="hero-img"
          />
          <div className="hero-title-container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
            <span className="huge-type parallax-text" data-speed="-2" style={{ fontSize: 'clamp(4rem, 13vw, 18rem)' }}>
              GAURAV
            </span>
            <span
              className="huge-type outline-text parallax-text"
              data-speed="2"
              style={{ fontSize: 'clamp(4rem, 13vw, 18rem)' }}
            >
              GUDDETI
            </span>
          </div>
        </section>

        {/* ── ABOUT ── */}
        <section id="about">
          <div className="container">
            <div style={{ maxWidth: "800px" }}>
              <h2
                style={{
                  fontSize: "3rem",
                  fontFamily: "var(--syne)",
                  marginBottom: "40px",
                  lineHeight: 1.1,
                }}
              >
                FULL-STACK DEVELOPER & AI/ML ENGINEER.
              </h2>
              <p style={{ fontSize: "1.4rem", fontWeight: 300, color: "#888", marginBottom: "24px", lineHeight: 1.6 }}>
                Hey, I&apos;m{" "}
                <span style={{ color: "var(--fg)", fontWeight: 500 }}>Gaurav</span> — a passionate
                3rd-year Computer Science student who believes in building technology that makes a
                difference. Currently working as an{" "}
                <span style={{ color: "var(--accent)", fontWeight: 500 }}>
                  AI Developer Intern at ChatMaven
                </span>
                , diving deep into conversational AI and intelligent systems.
              </p>
              <p style={{ fontSize: "1.1rem", fontWeight: 300, color: "#666", lineHeight: 1.7 }}>
                My journey started with curiosity and evolved into a love for creating solutions that blend
                cutting-edge AI with intuitive user experiences. From e-commerce platforms to AI-powered
                tools, I enjoy tackling challenges across the full technology spectrum.
              </p>
              <p style={{ fontSize: "1.1rem", fontWeight: 300, color: "#666", lineHeight: 1.7, marginTop: "16px" }}>
                When I&apos;m not coding, you&apos;ll find me grinding Valorant, binge-watching Friends
                for the hundredth time, or diving deep into the latest tech innovations.
              </p>

              {/* Quick stats */}
              <div
                style={{
                  display: "flex",
                  gap: "40px",
                  marginTop: "50px",
                  flexWrap: "wrap",
                }}
              >
                {[
                  { label: "Lines of Code", value: "50,000+" },
                  { label: "Projects Built", value: "15+" },
                  { label: "Technologies", value: "20+" },
                ].map((s) => (
                  <div key={s.label}>
                    <div
                      style={{
                        fontFamily: "var(--syne)",
                        fontSize: "2.5rem",
                        fontWeight: 800,
                        color: "var(--accent)",
                        lineHeight: 1,
                      }}
                    >
                      {s.value}
                    </div>
                    <div style={{ fontSize: "0.75rem", color: "#555", marginTop: "4px", letterSpacing: "0.08em" }}>
                      {s.label.toUpperCase()}
                    </div>
                  </div>
                ))}
              </div>

              {/* Social links */}
              <div style={{ display: "flex", gap: "20px", marginTop: "40px" }}>
                <a
                  href="https://github.com/Gauravguddeti"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: "#888", transition: "color 0.2s", display: "flex", alignItems: "center", gap: "6px", textDecoration: "none", fontFamily: "var(--syne)", fontSize: "0.75rem", letterSpacing: "0.1em" }}
                  onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "var(--fg)")}
                  onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "#888")}
                >
                  <Github size={16} /> GITHUB
                </a>
                <a
                  href="https://linkedin.com/in/gaurav-guddeti-a2359827b"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: "#888", transition: "color 0.2s", display: "flex", alignItems: "center", gap: "6px", textDecoration: "none", fontFamily: "var(--syne)", fontSize: "0.75rem", letterSpacing: "0.1em" }}
                  onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "var(--fg)")}
                  onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "#888")}
                >
                  <Linkedin size={16} /> LINKEDIN
                </a>
                <a
                  href="mailto:guddetigaurav1@gmail.com"
                  style={{ color: "#888", transition: "color 0.2s", display: "flex", alignItems: "center", gap: "6px", textDecoration: "none", fontFamily: "var(--syne)", fontSize: "0.75rem", letterSpacing: "0.1em" }}
                  onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "var(--fg)")}
                  onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "#888")}
                >
                  <Mail size={16} /> EMAIL
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ── MARQUEE ── */}
        <div className="scrolling-marquee">
          <div className="marquee-inner">
            <span className="huge-type outline-text">
              FULL-STACK — AI/ML — OPEN SOURCE — BUILDING — LEARNING —{" "}
            </span>
            <span className="huge-type outline-text">
              FULL-STACK — AI/ML — OPEN SOURCE — BUILDING — LEARNING —{" "}
            </span>
          </div>
        </div>

        {/* ── EXPERIENCE ── */}
        <section style={{ paddingTop: "100px", paddingBottom: "60px" }}>
          <div className="container">
            <span
              style={{
                fontFamily: "var(--syne)",
                fontSize: "0.75rem",
                fontWeight: 700,
                letterSpacing: "0.15em",
                color: "var(--accent)",
                textTransform: "uppercase",
              }}
            >
              Experience
            </span>
            <div className="experience-card">
              <div
                style={{
                  fontFamily: "var(--syne)",
                  fontSize: "0.8rem",
                  color: "#555",
                  letterSpacing: "0.1em",
                  marginBottom: "12px",
                }}
              >
                JUNE 2025 – OCT 2025
              </div>
              <h3
                style={{
                  fontFamily: "var(--syne)",
                  fontSize: "clamp(1.8rem, 4vw, 2.8rem)",
                  fontWeight: 800,
                  lineHeight: 1.1,
                  marginBottom: "8px",
                }}
              >
                AI Developer Intern
              </h3>
              <p style={{ fontFamily: "var(--syne)", fontSize: "1rem", color: "var(--accent)", marginBottom: "24px" }}>
                ChatMaven
              </p>
              <p style={{ color: "#888", lineHeight: 1.7, maxWidth: "600px", marginBottom: "24px" }}>
                Developing cutting-edge IVR calling systems using{" "}
                <span style={{ color: "var(--fg)" }}>RAG (Retrieval-Augmented Generation)</span> and{" "}
                <span style={{ color: "var(--fg)" }}>LangGraph</span> technologies. Creating intelligent
                conversational AI systems that revolutionise customer interactions through advanced NLP
                and contextual understanding.
              </p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                {["Python", "RAG", "LangGraph", "IVR Systems", "NLP", "Conversational AI"].map((tech) => (
                  <span
                    key={tech}
                    style={{
                      border: "1px solid #222",
                      color: "#666",
                      fontSize: "0.7rem",
                      padding: "4px 12px",
                      fontFamily: "var(--syne)",
                      textTransform: "uppercase",
                      letterSpacing: "0.06em",
                    }}
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── CURRENTLY BUILDING ── */}
        <div className="currently-building-strip">
          <div className="container">
            <div className="currently-building-label">
              Currently Building
            </div>
            <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "40px", flexWrap: "wrap" }}>
              <div style={{ flex: "1", minWidth: "280px" }}>
                <h2
                  style={{
                    fontFamily: "var(--syne)",
                    fontSize: "clamp(2.5rem, 7vw, 5rem)",
                    fontWeight: 800,
                    lineHeight: 0.9,
                    marginBottom: "20px",
                  }}
                >
                  {currentProject.name}
                </h2>
                <p style={{ color: "#888", maxWidth: "500px", lineHeight: 1.6, fontSize: "0.95rem" }}>
                  {currentProject.description}
                </p>
              </div>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "16px" }}>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", justifyContent: "flex-end" }}>
                  {currentProject.tech.map((t) => (
                    <span
                      key={t}
                      style={{
                        border: "1px solid #222",
                        color: "#555",
                        fontSize: "0.65rem",
                        padding: "4px 10px",
                        fontFamily: "var(--syne)",
                        textTransform: "uppercase",
                      }}
                    >
                      {t}
                    </span>
                  ))}
                </div>
                <a
                  href={currentProject.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "8px",
                    padding: "10px 22px",
                    border: "1px solid var(--accent)",
                    color: "var(--accent)",
                    fontFamily: "var(--syne)",
                    fontSize: "0.75rem",
                    fontWeight: 700,
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    textDecoration: "none",
                    transition: "background 0.2s, color 0.2s",
                  }}
                  onMouseEnter={(e) => {
                    ;(e.currentTarget as HTMLElement).style.background = "var(--accent)"
                    ;(e.currentTarget as HTMLElement).style.color = "#fff"
                  }}
                  onMouseLeave={(e) => {
                    ;(e.currentTarget as HTMLElement).style.background = "transparent"
                    ;(e.currentTarget as HTMLElement).style.color = "var(--accent)"
                  }}
                >
                  <Github size={14} />
                  View Repo
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* ── PROJECTS ── */}
        <section id="work" className="container">
          <div className="sticky-type">WORK</div>

          {mainProjects.map((project, i) => (
            <div
              key={project.slug}
              style={{ flexDirection: i % 2 === 1 ? "row-reverse" : "row" } as React.CSSProperties}
            >
              <ProjectCard project={project} />
            </div>
          ))}

          {/* Show More */}
          <div style={{ textAlign: "center", marginTop: "40px", marginBottom: "40px" }}>
            <button className="show-more-btn" onClick={() => setShowMore(!showMore)}>
              {showMore ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
              {showMore ? "Show Less" : "Show More Projects"}
            </button>
          </div>

          {showMore && (
            <div className="small-project-cards">
              {extraProjects.map((project) => (
                <SmallProjectCard key={project.slug} project={project} />
              ))}
            </div>
          )}

          {/* GitHub CTA */}
          <div style={{ textAlign: "center", margin: "80px 0 40px" }}>
            <div className="divider" />
            <a
              href="https://github.com/Gauravguddeti"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "10px",
                fontFamily: "var(--syne)",
                fontSize: "0.85rem",
                fontWeight: 700,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: "#888",
                textDecoration: "none",
                marginTop: "40px",
                transition: "color 0.2s",
              }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "var(--fg)")}
              onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "#888")}
            >
              Check out more on my GitHub
              <ExternalLink size={14} />
            </a>
          </div>
        </section>

        {/* ── SKILLS ── */}
        <div style={{ borderTop: "1px solid var(--gray)" }}>
          <div className="container skills-section">
            <span
              style={{
                fontFamily: "var(--syne)",
                fontSize: "0.75rem",
                fontWeight: 700,
                letterSpacing: "0.15em",
                color: "var(--accent)",
                textTransform: "uppercase",
              }}
            >
              Tech Arsenal
            </span>
            <h2
              style={{
                fontFamily: "var(--syne)",
                fontSize: "clamp(2rem, 5vw, 3.5rem)",
                fontWeight: 800,
                marginTop: "16px",
                lineHeight: 1.1,
              }}
            >
              MY TECHNOLOGICAL TOOLKIT
            </h2>
            <div className="skills-grid">
              {[
                {
                  label: "Languages",
                  skills: ["Python", "TypeScript", "JavaScript", "Kotlin", "SQL", "C++"],
                },
                {
                  label: "Frameworks & Platforms",
                  skills: ["Next.js", "React", "FastAPI", "Node.js", "Supabase", "PostgreSQL"],
                },
                {
                  label: "AI / ML",
                  skills: ["PyTorch", "LangChain", "RAG", "LangGraph", "OpenCV", "Whisper", "Groq"],
                },
                {
                  label: "Tools & Infra",
                  skills: ["Git", "Docker", "Vercel", "Twilio", "Tailwind CSS", "Drizzle ORM"],
                },
              ].map((cat) => (
                <div key={cat.label} className="skill-category">
                  <div className="skill-category-label">{cat.label}</div>
                  <div className="skill-list">
                    {cat.skills.map((s) => (
                      <span key={s} className="skill-tag">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── CONTACT / FOOTER ── */}
        <footer id="contact">
          <div className="container">
            <div className="footer-cta">
              <a href="https://mail.google.com/mail/?view=cm&fs=1&to=guddetigaurav1@gmail.com" target="_blank" rel="noopener noreferrer">LET&apos;S — TALK</a>
            </div>
            <div className="divider" />

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "60px",
                padding: "60px 0",
              }}
            >
              {/* Left: contact links + resume */}
              <div>
                <span
                  style={{
                    fontFamily: "var(--syne)",
                    fontSize: "0.75rem",
                    fontWeight: 700,
                    letterSpacing: "0.15em",
                    color: "var(--accent)",
                    textTransform: "uppercase",
                    display: "block",
                    marginBottom: "24px",
                  }}
                >
                  Get In Touch
                </span>

                <a href="/resume.pdf" download="Gaurav_Guddeti_Resume.pdf" className="resume-btn">
                  <Download size={14} />
                  Download Resume
                </a>

                <div className="contact-links">
                  <a href="mailto:guddetigaurav1@gmail.com" className="contact-link">
                    <Mail size={18} />
                    <div>
                      <div className="contact-link-label">Email</div>
                      <div className="contact-link-value">guddetigaurav1@gmail.com</div>
                    </div>
                  </a>
                  <a
                    href="https://linkedin.com/in/gaurav-guddeti-a2359827b"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="contact-link"
                  >
                    <Linkedin size={18} />
                    <div>
                      <div className="contact-link-label">LinkedIn</div>
                      <div className="contact-link-value">gaurav-guddeti-a2359827b</div>
                    </div>
                  </a>
                  <a
                    href="https://github.com/Gauravguddeti"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="contact-link"
                  >
                    <Github size={18} />
                    <div>
                      <div className="contact-link-label">GitHub</div>
                      <div className="contact-link-value">@Gauravguddeti</div>
                    </div>
                  </a>
                </div>
              </div>

              {/* Right: contact form */}
              <div>
                <span
                  style={{
                    fontFamily: "var(--syne)",
                    fontSize: "0.75rem",
                    fontWeight: 700,
                    letterSpacing: "0.15em",
                    color: "var(--accent)",
                    textTransform: "uppercase",
                    display: "block",
                    marginBottom: "24px",
                  }}
                >
                  Send a Message
                </span>
                <form onSubmit={handleSubmit} className="contact-form">
                  <input
                    type="text"
                    name="name"
                    placeholder="Your Name"
                    value={formState.name}
                    onChange={(e) => setFormState((p) => ({ ...p, name: e.target.value }))}
                    required
                  />
                  <input
                    type="email"
                    name="email"
                    placeholder="Your Email"
                    value={formState.email}
                    onChange={(e) => setFormState((p) => ({ ...p, email: e.target.value }))}
                    required
                  />
                  <textarea
                    name="message"
                    placeholder="Your Message"
                    rows={5}
                    value={formState.message}
                    onChange={(e) => setFormState((p) => ({ ...p, message: e.target.value }))}
                    required
                  />
                  <button type="submit" disabled={status === "submitting" || status === "success"} style={{ background: status === "success" ? "#4caf50" : status === "error" ? "#f44336" : undefined, borderColor: status === "success" ? "#4caf50" : status === "error" ? "#f44336" : undefined, boxShadow: status === "success" || status === "error" ? "none" : undefined }}>
                    {status === "submitting" && "SENDING..."}
                    {status === "success" && "✓ MESSAGE SENT"}
                    {status === "error" && "✕ ERROR! TRY AGAIN"}
                    {status === "idle" && "SEND MESSAGE →"}
                  </button>
                </form>
              </div>
            </div>

            <div className="divider" />
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                fontFamily: "var(--syne)",
                fontSize: "0.75rem",
                textTransform: "uppercase",
                color: "#555",
                letterSpacing: "0.06em",
                padding: "30px 0",
                flexWrap: "wrap",
                gap: "16px",
              }}
            >
              <div>© {new Date().getFullYear()} Gaurav Guddeti</div>
              <div style={{ display: "flex", gap: "30px" }}>
                <a href="https://github.com/Gauravguddeti" target="_blank" rel="noopener noreferrer" style={{ color: "#555", textDecoration: "none", transition: "color 0.2s" }} onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "var(--fg)")} onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "#555")}>GitHub</a>
                <a href="https://linkedin.com/in/gaurav-guddeti-a2359827b" target="_blank" rel="noopener noreferrer" style={{ color: "#555", textDecoration: "none", transition: "color 0.2s" }} onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "var(--fg)")} onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "#555")}>LinkedIn</a>
                <a href="mailto:guddetigaurav1@gmail.com" style={{ color: "#555", textDecoration: "none", transition: "color 0.2s" }} onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "var(--fg)")} onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "#555")}>Email</a>
              </div>
              <div>BASED IN INDIA</div>
            </div>
          </div>
        </footer>
      </main>
    </>
  )
}

// ── Small card for "Show More" section ──
function SmallProjectCard({ project }: { project: (typeof projects)[0] }) {
  const [open, setOpen] = useState(false)

  return (
    <>
      <div className="small-project-card" onClick={() => setOpen(true)}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "12px" }}>
          <span style={{ fontFamily: "var(--syne)", color: "var(--accent)", fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.1em" }}>
            {project.number} / {project.category.toUpperCase()}
          </span>
        </div>
        <h4
          style={{
            fontFamily: "var(--syne)",
            fontSize: "1.4rem",
            fontWeight: 800,
            marginBottom: "10px",
            lineHeight: 1.1,
          }}
        >
          {project.name}
        </h4>
        <p style={{ color: "#666", fontSize: "0.85rem", lineHeight: 1.5, marginBottom: "16px" }}>
          {project.shortDescription}
        </p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "5px", marginBottom: "16px" }}>
          {project.tech.slice(0, 4).map((t) => (
            <span key={t} style={{ border: "1px solid #222", color: "#555", fontSize: "0.65rem", padding: "2px 8px", fontFamily: "var(--syne)", textTransform: "uppercase" }}>
              {t}
            </span>
          ))}
        </div>
        <div style={{ display: "flex", gap: "10px" }}>
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            style={{ display: "inline-flex", alignItems: "center", gap: "5px", color: "#888", fontSize: "0.75rem", fontFamily: "var(--syne)", textDecoration: "none", letterSpacing: "0.08em", textTransform: "uppercase", transition: "color 0.2s" }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "var(--fg)")}
            onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "#888")}
          >
            <Github size={12} /> GitHub
          </a>
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              style={{ display: "inline-flex", alignItems: "center", gap: "5px", background: "var(--accent)", color: "#000", padding: "6px 14px", fontSize: "0.75rem", fontFamily: "var(--syne)", textDecoration: "none", letterSpacing: "0.08em", textTransform: "uppercase", transition: "opacity 0.2s" }}
              onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.85")}
              onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
            >
              <ExternalLink size={12} /> Live
            </a>
          )}
        </div>
      </div>

      {/* Small card modal */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent style={{ background: "#0e0e0e", border: "1px solid #333", maxWidth: "600px", color: "#fff", padding: "40px", borderRadius: "0px" }}>
          <DialogHeader>
            <span style={{ fontFamily: "var(--syne)", color: "var(--accent)", fontSize: "0.75rem", fontWeight: 700, marginBottom: "12px", display: "block", letterSpacing: "0.1em" }}>
              {project.number} / {project.category.toUpperCase()}
            </span>
            <DialogTitle style={{ fontFamily: "var(--syne)", fontSize: "2.2rem", fontWeight: 800, color: "#fff", lineHeight: 1.1, letterSpacing: "-0.02em" }}>
              {project.name}
            </DialogTitle>
          </DialogHeader>
          <div className="divider" style={{ margin: "20px 0" }} />
          <p style={{ color: "#aaa", lineHeight: 1.8, fontSize: "0.95rem", fontFamily: "var(--inter)", fontWeight: 300, marginBottom: "8px" }}>
            {project.fullDescription}
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginTop: "14px" }}>
            {project.tech.map((t) => (
              <span key={t} style={{ border: "1px solid #333", color: "#888", fontSize: "0.65rem", padding: "3px 10px", fontFamily: "var(--syne)", textTransform: "uppercase" }}>
                {t}
              </span>
            ))}
          </div>
          <div style={{ display: "flex", gap: "10px", marginTop: "18px" }}>
            <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" style={{ display: "inline-flex", alignItems: "center", gap: "6px", padding: "9px 20px", border: "1px solid #444", color: "#fff", fontSize: "0.75rem", fontFamily: "var(--syne)", textTransform: "uppercase", letterSpacing: "0.08em", textDecoration: "none" }}>
              <Github size={13} /> GitHub
            </a>
            {project.liveUrl && (
              <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" style={{ display: "inline-flex", alignItems: "center", gap: "6px", padding: "9px 20px", background: "var(--accent)", color: "#000", fontSize: "0.75rem", fontFamily: "var(--syne)", textTransform: "uppercase", letterSpacing: "0.08em", textDecoration: "none", transition: "opacity 0.2s" }} onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.85")} onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}>
                <ExternalLink size={13} /> Live
              </a>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}


