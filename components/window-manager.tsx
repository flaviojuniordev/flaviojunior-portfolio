import { AboutWindow } from "./windows/about-window"
import { ProjectsWindow } from "./windows/projects-window"
import { SkillsWindow } from "./windows/skills-window"
import { ContactWindow } from "./windows/contact-window"
import { ResumeWindow } from "./windows/resume-window"

interface WindowManagerProps {
  openWindows: string[]
  activeWindow: string | null
  onClose: (windowId: string) => void
  onMinimize: (windowId: string) => void
  onActivate: (windowId: string) => void
}

export function WindowManager({ openWindows, activeWindow, onClose, onMinimize, onActivate }: WindowManagerProps) {
  const renderWindow = (windowId: string) => {
    const isActive = activeWindow === windowId
    const zIndex = isActive ? 30 : 20

    const commonProps = {
      isActive,
      onClose: () => onClose(windowId),
      onMinimize: () => onMinimize(windowId),
      onActivate: () => onActivate(windowId),
      style: { zIndex },
    }

    switch (windowId) {
      case "about":
        return <AboutWindow key={windowId} {...commonProps} />
      case "projects":
        return <ProjectsWindow key={windowId} {...commonProps} />
      case "skills":
        return <SkillsWindow key={windowId} {...commonProps} />
      case "contact":
        return <ContactWindow key={windowId} {...commonProps} />
      case "resume":
        return <ResumeWindow key={windowId} {...commonProps} />
      default:
        return null
    }
  }

  return <>{openWindows.map(renderWindow)}</>
}
