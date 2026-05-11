import type { LucideIcon } from "lucide-react";

export type IconName =
  | "Home"
  | "Zap"
  | "Globe"
  | "Trophy"
  | "Server"
  | "Mail"
  | "Cpu"
  | "Database"
  | "Bot"
  | "ChevronDown"
  | "Code2"
  | "Terminal"
  | "Github"
  | "Linkedin"
  | "Monitor"
  | "Command"
  | "X"
  | "Layout"
  | "ExternalLink"
  | "Activity";

export interface NavItem {
  id: SectionId;
  icon: IconName;
  label: string;
}

export type SectionId =
  | "hero"
  | "skills"
  | "activity"
  | "projects"
  | "achievements"
  | "experience"
  | "contact";

export interface SkillGroup {
  title: string;
  icon: IconName;
  skills: string[];
}

export interface Project {
  title: string;
  type: string;
  icon: IconName;
  impact: string;
  tech: string[];
  description: string;
}

export interface Achievement {
  title: string;
  type: string;
  icon: IconName;
  impact: string;
  tech: string[];
  description: string;
}

export interface ExperienceEntry {
  role: string;
  period: string;
  current: boolean;
  description: string;
  highlights: string[];
}

export interface SiteConfig {
  name: string;
  role: string;
  bio: string;
  resumeUrl: string;
  resumeFileName: string;
  links: {
    github: string;
    linkedin: string;
    email: string;
  };
  nav: NavItem[];
}

export type IconComponent = LucideIcon;

export type LogType = "system" | "user" | "error" | "success";

export interface TerminalLog {
  type: LogType;
  content: string;
}
