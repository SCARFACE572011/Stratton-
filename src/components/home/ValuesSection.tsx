"use client";

import { motion, useReducedMotion } from "framer-motion";
import { SITE_CONFIG } from "@/lib/constants";

const CERTIFICATIONS = [
  { title: "CA PPO License", value: `#${SITE_CONFIG.licenseNumber}`, sub: "Bureau of Security & Investigative Services" },
  { title: "TEAM Certified", value: "BSIS", sub: "Techniques for Effective Alcohol Management" },
  { title: "First Aid & CPR", value: "Certified", sub: "All active officers" },
  { title: "Power to Arrest", value: "Certified", sub: "Full compliance program" },
];

export default function ValuesSection() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="section-padding relative overflow-hidden bg-[#080c12]" aria-label="Our values and certifications">
      {/* Tactical grid */}
      <div
        className="absolute inset-0 opacity-[0.025] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(rgba(196,154,42,1) 1px, transparent 1px), linear-gradient(90deg, rgba(196,154,42,1) 1px, transparent 1px)`,
          backgroundSize: "80px 80px",
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 container-wide">
        {/* Mission header */}
        <motion.div
          initial={shouldReduceMotion ? {} : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-16"
        >
          <p className="label-overline mb-4">Our Foundation</p>
          <h2
            className="display-title text-[#edf2f7] mb-4"
            style={{ fontSize: "clamp(2.25rem, 5.5vw, 3.75rem)" }}
          >
            {SITE_CONFIG.mission}
          </h2>
          <p className="text-[#7a9ab8] text-[0.9375rem] max-w-2xl mx-auto leading-relaxed font-[var(--font-sans)]">
            {SITE_CONFIG.brand_promise}
          </p>
        </motion.div>

        {/* Values + Certifications */}
        <div className="grid lg:grid-cols-2 gap-10" style={{ perspective: "800px" }}>
          {/* Core Values */}
          <motion.div
            initial={shouldReduceMotion ? {} : { opacity: 0, rotateY: -8, x: -20 }}
            whileInView={{ opacity: 1, rotateY: 0, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="label-overline mb-6">Core Values</p>
            <div className="space-y-3">
              {SITE_CONFIG.values.map((value, i) => (
                <div
                  key={i}
                  className="relative flex items-center gap-4 p-4 bg-[#0b1a2e] border border-[#0f2040] group hover:border-[#c49a2a]/30 transition-colors overflow-hidden"
                >
                  {/* Left accent bar */}
                  <div className="absolute left-0 top-0 bottom-0 w-0 group-hover:w-1 bg-[#c49a2a] transition-all duration-300" />
                  <div className="w-8 h-8 border border-[#0f2040] flex items-center justify-center group-hover:border-[#c49a2a]/40 transition-colors shrink-0">
                    <span className="font-[var(--font-display)] text-xs text-[#c49a2a] font-700">
                      0{i + 1}
                    </span>
                  </div>
                  <span className="font-[var(--font-display)] text-base text-[#edf2f7] uppercase tracking-wide">
                    {value}
                  </span>
                </div>
              ))}
            </div>
            <div className="mt-6 p-5 border border-[#c49a2a]/20 bg-[#0b1a2e]">
              <p className="text-[0.8125rem] text-[#9fb5cb] leading-relaxed italic">
                &ldquo;{SITE_CONFIG.vision}&rdquo;
              </p>
              <p className="text-[0.6875rem] text-[#4a6880] mt-2 uppercase tracking-wide">
                — Stratton Security Group Vision
              </p>
            </div>
          </motion.div>

          {/* Certifications */}
          <motion.div
            initial={shouldReduceMotion ? {} : { opacity: 0, rotateY: 8, x: 20 }}
            whileInView={{ opacity: 1, rotateY: 0, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="label-overline mb-6">Credentials & Compliance</p>
            <div className="grid grid-cols-2 gap-3">
              {CERTIFICATIONS.map((cert, i) => (
                <div
                  key={i}
                  className="bg-[#0b1a2e] border border-[#0f2040] border-t-2 border-t-[#c49a2a]/30 p-5 hover:border-[#1e4878] transition-colors"
                >
                  <p className="text-[0.6875rem] text-[#4a6880] tracking-widest uppercase mb-1">{cert.title}</p>
                  <p className="font-[var(--font-display)] text-lg text-[#c49a2a] uppercase mb-1">{cert.value}</p>
                  <p className="text-[0.6875rem] text-[#4a6880] leading-snug">{cert.sub}</p>
                </div>
              ))}
            </div>
            <div className="mt-3 bg-[#0b1a2e] border border-[#0f2040] p-5">
              <p className="text-[0.75rem] text-[#7a9ab8] leading-relaxed font-[var(--font-sans)]">
                All Stratton officers are required to meet or exceed California state
                licensing requirements under BSIS. We maintain comprehensive general
                liability, commercial auto, and workers&apos; compensation insurance
                coverage across all operations.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
