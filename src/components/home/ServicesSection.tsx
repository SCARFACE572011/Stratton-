"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Shield, ShieldCheck, Building2, Home, ShoppingBag, HardHat, Briefcase, Star } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { SERVICES } from "@/lib/constants";

const SERVICES_BG =
  "https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=1920&q=80";

const ICON_MAP = { Shield, ShieldCheck, Building2, Home, ShoppingBag, HardHat, Briefcase, Star } as const;

const ICON_COLOR_MAP = {
  blue: "text-[#3f6ef5]",
  gold: "text-[#c49a2a]",
  steel: "text-[#7a9ab8]",
};

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
    setTilt({ x: -dy * 7, y: dx * 7 });
  };

  return (
    <div style={{ perspective: "1000px" }}>
      <motion.div
        ref={ref}
        onMouseMove={onMouseMove}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => { setTilt({ x: 0, y: 0 }); setHovered(false); }}
        animate={{ rotateX: tilt.x, rotateY: tilt.y, scale: hovered ? 1.02 : 1 }}
        transition={{ type: "spring", stiffness: 280, damping: 24, mass: 0.5 }}
        style={{ transformStyle: "preserve-3d", willChange: "transform", height: "100%" }}
      >
        {children}
      </motion.div>
    </div>
  );
}

export default function ServicesSection() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="section-padding relative overflow-hidden bg-[#080c12]" aria-labelledby="services-heading">
      {/* Background accent photo */}
      <div className="absolute inset-0 z-0">
        <Image
          src={SERVICES_BG}
          alt=""
          fill
          className="object-cover object-center opacity-[0.05]"
          sizes="100vw"
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#080c12]/90 to-[#080c12]/95" />
      </div>

      <div className="container-wide relative z-10">
        {/* Section header */}
        <motion.div
          initial={shouldReduceMotion ? {} : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mb-14 max-w-2xl"
        >
          <p className="label-overline mb-4">What We Do</p>
          <h2
            id="services-heading"
            className="display-title text-[clamp(2.25rem,5vw,3.5rem)] text-[#edf2f7] mb-5"
          >
            Security Services
            <br />
            <span className="gradient-gold">Built for Your Needs</span>
          </h2>
          <p className="text-[#7a9ab8] text-[1rem] leading-relaxed font-[var(--font-sans)]">
            From mobile patrol and commercial guard services to specialized residential
            protection, Stratton delivers tailored security programs matched to your
            property type, risk profile, and operational requirements.
          </p>
        </motion.div>

        {/* Services grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {SERVICES.map((service, i) => {
            const IconComponent = ICON_MAP[service.icon as keyof typeof ICON_MAP] ?? Shield;
            const iconColor = ICON_COLOR_MAP[service.color as keyof typeof ICON_COLOR_MAP] ?? "text-[#c49a2a]";

            return (
              <motion.div
                key={service.id}
                initial={shouldReduceMotion ? {} : { opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ delay: (i % 4) * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              >
                <TiltCard>
                  <Link
                    href={`/services/${service.slug}`}
                    className="card-tactical group block p-6 h-full"
                    aria-label={service.title}
                  >
                    {/* Shimmer line */}
                    <div className="w-0 group-hover:w-full h-px bg-[#c49a2a]/50 transition-all duration-500 mb-5" />

                    <div className={`w-10 h-10 border border-[#1a3050] flex items-center justify-center mb-4 group-hover:border-current transition-colors ${iconColor}`}>
                      <IconComponent size={17} strokeWidth={1.5} />
                    </div>

                    {/* Number watermark */}
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="font-[var(--font-display)] text-[0.9375rem] text-[#edf2f7] uppercase tracking-wide leading-snug">
                        {service.title}
                      </h3>
                      <span className="font-[var(--font-display)] text-[2rem] text-[#1e4878]/60 font-800 leading-none ml-2 shrink-0">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                    </div>

                    <p className="text-[0.8125rem] text-[#7a9ab8] leading-relaxed mb-5">
                      {service.shortDescription}
                    </p>

                    <div className="flex items-center gap-1.5 text-[0.75rem] text-[#4a6880] group-hover:text-[#c49a2a] transition-colors uppercase tracking-wide mt-auto">
                      Learn more
                      <ArrowRight size={12} className="transition-transform group-hover:translate-x-1" />
                    </div>
                  </Link>
                </TiltCard>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={shouldReduceMotion ? {} : { opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="mt-12 flex flex-col sm:flex-row items-center gap-4"
        >
          <div className="h-px flex-1 bg-[#0f2040] hidden sm:block" />
          <Link href="/services" className="btn-secondary text-xs px-6">
            View All Services
            <ArrowRight size={13} className="ml-1" />
          </Link>
          <div className="h-px flex-1 bg-[#0f2040] hidden sm:block" />
        </motion.div>
      </div>
    </section>
  );
}
