"use client";

import { motion, useReducedMotion } from "framer-motion";
import { CLIENT_LOGOS } from "@/lib/constants";

function getInitials(name: string): string {
  const words = name.replace(/&/g, "and").split(/\s+/).filter(Boolean);
  const stop = new Set(["of", "the", "and", "for", "group", "partners", "association"]);
  const meaningful = words.filter((w) => !stop.has(w.toLowerCase()));
  const source = meaningful.length >= 2 ? meaningful : words;
  return source.slice(0, 3).map((w) => w[0]).join("").toUpperCase();
}

export default function ClientLogosSection() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="bg-[#080c12] border-b border-[#0f2040] py-16 md:py-20" aria-labelledby="clients-heading">
      <div className="container-wide">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          <div className="lg:col-span-4">
            <p className="label-overline mb-4">Trusted By</p>
            <h2
              id="clients-heading"
              className="display-title text-[clamp(1.5rem,3vw,2rem)] text-[#edf2f7] mb-4"
            >
              Relied On Across
              <br />
              <span className="gradient-gold">Los Angeles</span>
            </h2>
            <p className="text-[#7a9ab8] text-[0.875rem] leading-relaxed font-[var(--font-sans)]">
              From Beverly Hills residential communities to Century City
              corporate campuses, Stratton protects properties trusted by
              property managers, HOA boards, and executives across Southern
              California.
            </p>
          </div>

          <div className="lg:col-span-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-[#0f2040]">
              {CLIENT_LOGOS.map((client, i) => {
                const initials = getInitials(client.name);
                return (
                  <motion.div
                    key={client.name}
                    initial={shouldReduceMotion ? {} : { opacity: 0, scale: 0.94, y: 12 }}
                    whileInView={{ opacity: 1, scale: 1, y: 0 }}
                    viewport={{ once: true, margin: "-40px" }}
                    transition={{
                      delay: (i % 4) * 0.05 + Math.floor(i / 4) * 0.1,
                      duration: 0.5,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    className="bg-[#080c12] group flex flex-col items-center justify-center aspect-[4/3] px-4 py-6 text-center hover:bg-[#0b1a2e] transition-all duration-200"
                    style={{ boxShadow: "none", transition: "background 0.2s ease, box-shadow 0.2s ease" }}
                    title={client.name}
                    onMouseEnter={(e) => { (e.currentTarget as HTMLDivElement).style.boxShadow = "inset 0 0 0 1px rgba(196,154,42,0.22)"; }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLDivElement).style.boxShadow = "none"; }}
                  >
                    <div className="font-[var(--font-display)] text-[1.625rem] md:text-[1.875rem] tracking-[0.05em] text-[#4a6880] group-hover:text-[#c49a2a] transition-colors leading-none">
                      {initials}
                    </div>
                    <div className="mt-3 h-px w-6 bg-[#1a3050] group-hover:bg-[#c49a2a]/50 transition-colors" />
                    <div className="mt-3 text-[0.625rem] text-[#4a6880] uppercase tracking-[0.15em]">
                      {client.industry}
                    </div>
                  </motion.div>
                );
              })}
            </div>
            <p className="mt-5 text-[0.6875rem] text-[#4a6880] tracking-wide uppercase font-[var(--font-sans)]">
              Client identities withheld for confidentiality · Representative sectors shown
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
