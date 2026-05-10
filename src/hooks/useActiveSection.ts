import { useEffect, useState } from "react";
import siteData from "@/data/site.json";
import type { SectionId, SiteConfig } from "@/types";

const site = siteData as SiteConfig;

export const useActiveSection = (): SectionId => {
  const [active, setActive] = useState<SectionId>("hero");

  useEffect(() => {
    const sections = site.nav.map((item) => item.id);
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id as SectionId);
        });
      },
      { threshold: 0.5 },
    );
    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return active;
};
