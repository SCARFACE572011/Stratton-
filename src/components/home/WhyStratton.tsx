"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, BadgeCheck, Clock, Shield, Settings2, Award, FileText } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { DIFFERENTIATORS } from "@/lib/constants";

const ACCENT_PHOTO =
  "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=600&q=80";

const ICON_MAP = { BadgeCheck, Clock, Shield, Settings2, Award, FileText } as const;

function TiltCard({ children }: { children: React.ReactNode }) {
  const prefersReduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (prefersReduced || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const dx = (e.clientX - (rect.left + rect.width / 2)) / (rect.width / 2);
    const dy = (e.clientY - (rect.top + rect.height / 2)) / (rect.height / 2);
    setTilt({ x: -dy * 6, y: dx * 6 });
  };

  return (
    <div style={{ perspective: "900px" }}>
      <motion.div
        ref={ref}
        onMouseMove={onMouseMove}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => { setTilt({ x: 0, y: 0 }); setHovered(false); }}
        animate={{ rotateX: tilt.x, rotateY: tilt.y, scale: hovered ? 1.015 : 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 24, mass: 0.5 }}
        style={{ transformStyle: "preserve-3d", willChange: "transform" }}
      >
        {children}
      </motion.div>
    </div>
  );
}

export default function WhyStratton() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section
      className="section-padding relative overflow-hidden bg-[#080c12]"
      aria-labelledby="why-heading"
    >
      {/* Background gold accent */}
      <div
        className="absolute top-0 right-0 w-96 h-96 opacity-[0.025] pointer-events-none"
        style={{ background: "radial-gradient(circle, #c49a2a 0%, transparent 70%)" }}
        aria-hidden="true"
      />

      <div className="container-wide relative z-10">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">

          {/* Left column */}
          <motion.div
            initial={shouldReduceMotion ? {} : { opacity: 0, rotateY: -8, x: -20 }}
            whileInView={{ opacity: 1, rotateY: 0, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            style={{ perspective: "800px" }}
            className="lg:col-span-4 lg:sticky lg:top-28"
          >
            {/* Accent photo with diagonal clip */}
            <div
              className="relative w-full aspect-[4/3] mb-8 overflow-hidden"
              style={{ clipPath: "polygon(0 0, 100% 0, 100% 85%, 90% 100%, 0 100%)" }}
            >
              <Image
                src={ACCENT_PHOTO}
                alt="Stratton Security officers on patrol"
                fill
                className="object-cover object-center"
                sizes="(max-width: 1024px) 100vw, 400px"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#080c12]/65 to-transparent" />
              {/* Corner brackets on photo */}
              <div className="absolute top-3 left-3 w-5 h-5 border-t border-l border-[#c49a2a]/55" aria-hidden="true" />
              <div className="absolute bottom-7 right-3 w-5 h-5 border-b border-r border-[#c49a2a]/55" aria-hidden="true" />
            </div>

            <p className="label-overline mb-4">Why Stratton</p>
            <h2
              id="why-heading"
              className="display-title text-[clamp(2rem,4.5vw,3rem)] text-[#edf2f7] mb-6"
            >
              The Standard of
              <br />
              <span className="gradient-gold">Protective Excellence</span>
            </h2>
            <p className="text-[#7a9ab8] text-[0.9375rem] leading-relaxed mb-8 font-[var(--font-sans)]">
              We don't offer generic security templates. Every Stratton program
              is built around your property, your risk profile, and your
              operational requirements — staffed by licensed professionals held
              to disciplined internal standards.
            </p>
            <div className="w-12 h-0.5 bg-[#c49a2a] mb-8" />
            <blockquote className="border-l-2 border-[#c49a2a] pl-4 mb-10">
              <p className="text-[0.875rem] text-[#9fb5cb] italic leading-relaxed">
                "Professional security is not just about presence — it's about
                the quality, consistency, and accountability of that presence."
              </p>
            </blockquote>
            <Link href="/about" className="btn-primary text-xs">
              About Our Team
              <ArrowRight size={13} />
            </Link>
          </motion.div>

          {/* Right column */}
          <div className="lg:col-span-8 grid sm:grid-cols-2 gap-4">
            {DIFFERENTIATORS.map((item, i) => {
              const IconComponent = ICON_MAP[item.icon as keyof typeof ICON_MAP] ?? BadgeCheck;
              return (
                <motion.div
                  key={i}
                  initial={shouldReduceMotion ? {} : { opacity: 0, rotateY: -12, x: -20 }}
                  whileInView={{ opacity: 1, rotateY: 0, x: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{
                    delay: Math.floor(i / 2) * 0.15 + (i % 2) * 0.08,
                    duration: 0.65,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  style={{ perspective: "900px" }}
                >
                  <TiltCard>
                    <div className="card-tactical p-6 group h-full hover:border-[#1e4878] transition-all duration-200">
                      <div className="flex items-start justify-between mb-5">
                        <div className="w-10 h-10 border border-[#1a3050] flex items-center justify-center group-hover:border-[#c49a2a]/40 transition-colors">
                          <IconComponent size={17} className="text-[#c49a2a]" strokeWidth={1.5} />
                        </div>
                        <span className="font-[var(--font-display)] text-[2rem] text-[#1e4878]/70 font-800 leading-none">
                          0{i + 1}
                        </span>
                      </div>
                      <h3 className="font-[var(--font-sans)] text-[0.9375rem] font-600 text-[#edf2f7] mb-2.5">
                        {item.title}
                      </h3>
                      <p className="text-[0.8125rem] text-[#7a9ab8] leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </TiltCard>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
