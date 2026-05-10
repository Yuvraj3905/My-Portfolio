import { Linkedin } from "lucide-react";
import siteData from "@/data/site.json";
import { CyberButton } from "@/components/CyberButton";
import { useResume } from "@/contexts/useResume";
import type { SiteConfig } from "@/types";

const site = siteData as SiteConfig;

export const Contact = () => {
  const { open: openResume } = useResume();
  return (
    <section
      id="contact"
      className="py-32 px-6 bg-[radial-gradient(circle_at_center,rgba(0,240,255,0.05),transparent)]"
      aria-label="Contact and links"
    >
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-4xl md:text-6xl font-black mb-8">
          BUILD THE <span className="text-cyber-neon">FUTURE</span>
        </h2>
        <p className="text-gray-300 mb-12 font-mono text-sm uppercase tracking-widest leading-loose italic">
          Currently open for high-impact AI/Full-Stack roles. Let&apos;s build
          agentic systems that scale.
        </p>
        <div className="flex flex-wrap justify-center gap-6 mt-8">
          <CyberButton onClick={openResume} variant="primary">
            Download Resume
          </CyberButton>
          <CyberButton href="#/resume" variant="secondary">
            View Online Resume
          </CyberButton>
          <CyberButton href={`mailto:${site.links.email}`} variant="secondary">
            Establish Link
          </CyberButton>
          <CyberButton
            href={site.links.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            variant="tertiary"
            className="flex items-center gap-3"
          >
            <Linkedin size={18} aria-hidden="true" /> Matrix
          </CyberButton>
        </div>
      </div>
    </section>
  );
};
