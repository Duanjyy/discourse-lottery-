import BasicSection from "@/features/editor/sections/BasicSection"
import EducationSection from "@/features/editor/sections/EducationSection"
import ExperienceSection from "@/features/editor/sections/ExperienceSection"
import ProjectsSection from "@/features/editor/sections/ProjectsSection"
import SkillsSection from "@/features/editor/sections/SkillsSection"
import SummarySection from "@/features/editor/sections/SummarySection"

export default function EditorForm() {
  return (
    <div className="grid gap-3">
      <BasicSection />
      <EducationSection />
      <ExperienceSection />
      <ProjectsSection />
      <SkillsSection />
      <SummarySection />
    </div>
  )
}

