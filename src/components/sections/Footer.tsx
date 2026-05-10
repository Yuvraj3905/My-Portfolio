import { Github, Linkedin, Mail } from "lucide-react";
import siteData from "@/data/site.json";
import type { SiteConfig } from "@/types";

const site = siteData as SiteConfig;

export const Footer = () => (
  <footer className="relative z-20 border-t border-white/5 bg-cyber-dark py-12 px-6">
    <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
      <div className="font-mono text-[10px] text-gray-400 uppercase tracking-[0.4em]">
        © 2024 {site.name} {"//"} AI Systems Architect
      </div>
      <nav aria-label="Social links" className="flex gap-8 text-gray-300">
        <a
          href={site.links.github}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="GitHub profile"
          className="hover:text-cyber-neon transition-colors focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyber-neon"
        >
          <Github size={20} aria-hidden="true" />
        </a>
        <a
          href={site.links.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="LinkedIn profile"
          className="hover:text-cyber-neon transition-colors focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyber-neon"
        >
          <Linkedin size={20} aria-hidden="true" />
        </a>
        <a
          href={`mailto:${site.links.email}`}
          aria-label="Send email"
          className="hover:text-cyber-neon transition-colors focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyber-neon"
        >
          <Mail size={20} aria-hidden="true" />
        </a>
      </nav>
    </div>
  </footer>
);
