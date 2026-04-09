import TechHeader from "@/components/tech-header"
import HeroSection from "@/components/hero-section"
import AboutMissionSection from "@/components/about-mission-section"
import TechSkillsSection from "@/components/tech-skills-section"
import ProjectsShowcase from "@/components/projects-showcase"
import ExperienceTimeline from "@/components/experience-timeline"
import EducationSection from "@/components/education-section"
import ContactFooter from "@/components/contact-footer"

export default function Home() {
  return (
    <main className="relative bg-gray-950">
      <TechHeader />
      <HeroSection />
      <div className="relative z-10">
        <div id="about">
          <AboutMissionSection />
        </div>
        <div id="skills">
          <TechSkillsSection />
        </div>
        <div id="projects">
          <ProjectsShowcase />
        </div>
        <div id="experience">
          <ExperienceTimeline />
        </div>
        <div id="education">
          <EducationSection />
        </div>
        <div id="contact">
          <ContactFooter />
        </div>
      </div>
    </main>
  )
}
