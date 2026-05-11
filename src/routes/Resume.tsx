import siteData from "@/data/site.json";
import skillsData from "@/data/skills.json";
import projectsData from "@/data/projects.json";
import achievementsData from "@/data/achievements.json";
import experienceData from "@/data/experience.json";
import type {
  Achievement,
  ExperienceEntry,
  Project,
  SiteConfig,
  SkillGroup,
} from "@/types";

const site = siteData as SiteConfig;
const skills = skillsData as SkillGroup[];
const projects = projectsData as Project[];
const achievements = achievementsData as Achievement[];
const experience = experienceData as ExperienceEntry[];

const Section = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => (
  <section className="mb-6">
    <h2 className="text-sm font-bold uppercase tracking-[0.3em] text-cyber-neon border-b border-cyber-neon/40 pb-1 mb-3 print:text-black print:border-black">
      {title}
    </h2>
    {children}
  </section>
);

export const ResumePage = () => (
  <div className="min-h-screen bg-cyber-dark text-white print:bg-white print:text-black p-8 md:p-12">
    <div className="max-w-3xl mx-auto bg-cyber-panel/30 print:bg-white border border-white/5 print:border-0 p-10 print:p-0 font-mono text-sm">
      <header className="mb-8 border-b border-cyber-neon/30 pb-6 print:border-black">
        <h1 className="text-4xl font-black tracking-tighter uppercase print:text-black">
          {site.name}
        </h1>
        <p className="text-cyber-neon text-xs tracking-[0.4em] uppercase mt-1 print:text-black">
          {site.role}
        </p>
        <div className="flex flex-wrap gap-4 text-[11px] mt-3 text-gray-300 print:text-black">
          <a href={`mailto:${site.links.email}`}>{site.links.email}</a>
          <a href={site.links.github} target="_blank" rel="noopener noreferrer">
            github.com/Yuvraj3905
          </a>
          <a
            href={site.links.linkedin}
            target="_blank"
            rel="noopener noreferrer"
          >
            linkedin.com/in/Yuvraj3905
          </a>
        </div>
      </header>

      <Section title="Summary">
        <p className="text-gray-300 print:text-black leading-relaxed">
          {site.bio.replace(/^>\s*/, "")}
        </p>
      </Section>

      <Section title="Experience">
        {experience.map((e) => (
          <div key={e.role + e.period} className="mb-4">
            <div className="flex justify-between font-bold">
              <span>{e.role}</span>
              <span className="text-cyber-neon print:text-black">
                {e.period}
              </span>
            </div>
            <p className="text-gray-300 print:text-black mt-1 leading-relaxed">
              {e.description}
            </p>
          </div>
        ))}
      </Section>

      <Section title="Selected Projects">
        {projects.slice(0, 5).map((p) => (
          <div key={p.title} className="mb-3">
            <div className="flex justify-between">
              <span className="font-bold">{p.title}</span>
              <span className="text-cyber-neon text-[11px] print:text-black">
                {p.impact}
              </span>
            </div>
            <p className="text-gray-300 print:text-black text-[12px]">
              {p.description}
            </p>
            <p className="text-[10px] text-gray-400 print:text-black mt-1">
              Stack: {p.tech.join(" · ")}
            </p>
          </div>
        ))}
      </Section>

      <Section title="Achievements">
        <ul className="list-disc list-inside text-gray-300 print:text-black space-y-1">
          {achievements.map((a) => (
            <li key={a.title}>
              <span className="font-bold">{a.title}</span> {"//"} {a.impact}
            </li>
          ))}
        </ul>
      </Section>

      <Section title="Skills">
        {skills.map((g) => (
          <div key={g.title} className="mb-2">
            <span className="text-cyber-neon print:text-black uppercase text-[11px] tracking-widest">
              {g.title}:
            </span>{" "}
            <span className="text-gray-300 print:text-black">
              {g.skills.join(" · ")}
            </span>
          </div>
        ))}
      </Section>

      <div className="mt-10 flex gap-3 no-print">
        <button
          type="button"
          onClick={() => window.print()}
          className="px-4 py-2 bg-cyber-neon text-black font-bold uppercase text-xs tracking-widest hover:bg-white transition-colors"
        >
          Print / Save PDF
        </button>
        <button
          type="button"
          onClick={() => {
            window.location.hash = "";
          }}
          className="px-4 py-2 border border-cyber-neon text-cyber-neon font-bold uppercase text-xs tracking-widest hover:bg-cyber-neon hover:text-black transition-colors"
        >
          Back to Portfolio
        </button>
      </div>
    </div>
  </div>
);
