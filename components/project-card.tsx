"use client"

import { useState } from "react"
import { ExternalLink, Github, Wrench } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { type Project, CURRENT_PROJECT } from "@/lib/projects"

interface ProjectCardProps {
  project: Project
}

export function ProjectCard({ project }: ProjectCardProps) {
  const [open, setOpen] = useState(false)
  const isCurrentlyBuilding = project.slug === CURRENT_PROJECT

  return (
    <>
      {/* ── Card Row ── */}
      <div
        className="project-row"
        onClick={() => setOpen(true)}
        style={{ cursor: "pointer" }}
      >
        <div className="project-info">
          <div style={{ display: "flex", alignItems: "center", gap: "12px", flexWrap: "wrap" }}>
            <span style={{ fontFamily: "var(--syne)", color: "var(--accent)", fontSize: "0.85rem", fontWeight: 700 }}>
              {project.number} / {project.category.toUpperCase()}
            </span>
            {isCurrentlyBuilding && (
              <span
                style={{
                  background: "var(--accent)",
                  color: "#fff",
                  fontSize: "0.65rem",
                  fontWeight: 800,
                  padding: "3px 10px",
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  fontFamily: "var(--syne)",
                }}
              >
                Currently Building
              </span>
            )}
          </div>

          <h3
            className="huge-type"
            style={{ fontSize: "clamp(3rem, 8vw, 6rem)", margin: "16px 0 12px" }}
          >
            {project.name}
          </h3>

          <p style={{ fontSize: "1rem", color: "#aaa", lineHeight: 1.6, maxWidth: "400px" }}>
            {project.shortDescription}
          </p>

          {/* Tech badges */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginTop: "16px" }}>
            {project.tech.slice(0, 5).map((t) => (
              <span
                key={t}
                style={{
                  border: "1px solid #333",
                  color: "#888",
                  fontSize: "0.7rem",
                  padding: "3px 10px",
                  fontFamily: "var(--syne)",
                  textTransform: "uppercase",
                  letterSpacing: "0.06em",
                }}
              >
                {t}
              </span>
            ))}
            {project.tech.length > 5 && (
              <span
                style={{
                  border: "1px solid #333",
                  color: "#555",
                  fontSize: "0.7rem",
                  padding: "3px 10px",
                  fontFamily: "var(--syne)",
                }}
              >
                +{project.tech.length - 5} more
              </span>
            )}
          </div>

          <div className="divider" />

          {/* Buttons */}
          <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                padding: "8px 18px",
                border: "1px solid #333",
                color: "#fff",
                fontSize: "0.78rem",
                fontFamily: "var(--syne)",
                textTransform: "uppercase",
                letterSpacing: "0.08em",
                textDecoration: "none",
                transition: "border-color 0.2s, color 0.2s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "var(--accent)"
                e.currentTarget.style.color = "var(--accent)"
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "#333"
                e.currentTarget.style.color = "#fff"
              }}
            >
              <Github size={13} />
              GitHub
            </a>

            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px",
                  padding: "8px 18px",
                  background: "var(--accent)",
                  color: "#000",
                  fontSize: "0.78rem",
                  fontFamily: "var(--syne)",
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                  textDecoration: "none",
                  transition: "opacity 0.2s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.85")}
                onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
              >
                <ExternalLink size={13} />
                Live
              </a>
            )}
          </div>
        </div>

        {/* Right side — decorative number block */}
        <div className="project-media" style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div
            className="floating-label huge-type outline-text"
            style={{
              position: "relative",
              fontSize: "clamp(6rem, 14vw, 12rem)",
              bottom: "auto",
              right: "auto",
              opacity: 0.06,
              pointerEvents: "none",
              userSelect: "none",
            }}
          >
            {project.number}
          </div>
        </div>
      </div>

      {/* ── Modal ── */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent
          style={{
            background: "#0e0e0e",
            border: "1px solid #333",
            maxWidth: "680px",
            color: "#fff",
            padding: "45px",
            borderRadius: "0px",
          }}
        >
          <DialogHeader>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", flexWrap: "wrap", marginBottom: "16px" }}>
              <span style={{ fontFamily: "var(--syne)", color: "var(--accent)", fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.1em" }}>
                {project.number} / {project.category.toUpperCase()}
              </span>
              {isCurrentlyBuilding && (
                <span
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "5px",
                    background: "var(--accent)",
                    color: "#fff",
                    fontSize: "0.65rem",
                    fontWeight: 800,
                    padding: "3px 10px",
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    fontFamily: "var(--syne)",
                  }}
                >
                  <Wrench size={10} />
                  Currently Building
                </span>
              )}
            </div>
            <DialogTitle
              style={{
                fontFamily: "var(--syne)",
                fontSize: "clamp(2rem, 6vw, 3.5rem)",
                fontWeight: 800,
                lineHeight: 1.05,
                color: "#fff",
                letterSpacing: "-0.02em",
              }}
            >
              {project.name}
            </DialogTitle>
          </DialogHeader>

          <div className="divider" style={{ margin: "24px 0" }} />
          <p style={{ color: "#aaa", lineHeight: 1.8, fontSize: "1rem", fontFamily: "var(--inter)", fontWeight: 300, marginBottom: "8px" }}>
            {project.fullDescription}
          </p>

          {/* All tech badges */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginTop: "16px" }}>
            {project.tech.map((t) => (
              <span
                key={t}
                style={{
                  border: "1px solid #333",
                  color: "#888",
                  fontSize: "0.7rem",
                  padding: "4px 12px",
                  fontFamily: "var(--syne)",
                  textTransform: "uppercase",
                  letterSpacing: "0.06em",
                }}
              >
                {t}
              </span>
            ))}
          </div>

          {/* Action buttons */}
          <div style={{ display: "flex", gap: "12px", marginTop: "20px", flexWrap: "wrap" }}>
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "7px",
                padding: "10px 22px",
                border: "1px solid #444",
                color: "#fff",
                fontSize: "0.78rem",
                fontFamily: "var(--syne)",
                textTransform: "uppercase",
                letterSpacing: "0.08em",
                textDecoration: "none",
                transition: "border-color 0.2s, color 0.2s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "var(--accent)"
                e.currentTarget.style.color = "var(--accent)"
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "#444"
                e.currentTarget.style.color = "#fff"
              }}
            >
              <Github size={14} />
              View on GitHub
            </a>

            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "7px",
                  padding: "10px 22px",
                  background: "var(--accent)",
                  color: "#000",
                  fontSize: "0.78rem",
                  fontFamily: "var(--syne)",
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                  textDecoration: "none",
                  transition: "opacity 0.2s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.85")}
                onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
              >
                <ExternalLink size={14} />
                Live Site
              </a>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
