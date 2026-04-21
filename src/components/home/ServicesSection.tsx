"use client";

import Link from "next/link";
import { ArrowRight, Shield, ShieldCheck, Building2, Home, ShoppingBag, HardHat, Briefcase, Star } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { SERVICES } from "@/lib/constants";

const ICON_MAP = { Shield, ShieldCheck, Building2, Home, ShoppingBag, HardHat, Briefcase, Star } as const;

export default function ServicesSection() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="bg-[#050810]" aria-labelledby="services-heading">
      <div className="container-wide py-24 md:py-32">
        {/* Header */}
        <motion.div
          initial={shouldReduceMotion ? {} : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16"
        >
          <div>
            <p className="label-overline mb-4">What We Do</p>
            <h2
              id="services-heading"
              className="display-title text-white"
              style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)" }}
            >
              Protection Programs
            </h2>
          </div>
          <Link href="/services" className="btn-secondary text-xs shrink-0">
            View All Services
            <ArrowRight size={13} />
          </Link>
        </motion.div>

        {/* Anduril-style full-width service rows */}
        <div>
          {SERVICES.map((service, i) => {
            const IconComponent = ICON_MAP[service.icon as keyof typeof ICON_MAP] ?? Shield;
            return (
              <motion.div
                key={service.id}
                initial={shouldReduceMotion ? {} : { opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ delay: i * 0.06, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              >
                <Link
                  href={`/services/${service.slug}`}
                  className="group flex items-center gap-6 md:gap-10 py-7 border-b border-[#1a2030] hover:border-[#c49a2a]/30 transition-colors"
                >
                  {/* Number */}
                  <span className="font-[var(--font-display)] text-[0.75rem] text-[#3a4a58] tracking-widest w-8 shrink-0 group-hover:text-[#c49a2a]/60 transition-colors">
                    {String(i + 1).padStart(2, "0")}
                  </span>

                  {/* Icon */}
                  <div className="w-9 h-9 border border-[#1a2030] flex items-center justify-center shrink-0 group-hover:border-[#c49a2a]/40 transition-colors">
                    <IconComponent size={16} className="text-[#c49a2a]" strokeWidth={1.5} />
                  </div>

                  {/* Title */}
                  <h3 className="font-[var(--font-display)] text-[1.0625rem] md:text-[1.25rem] text-white uppercase tracking-wide group-hover:text-[#c49a2a] transition-colors w-56 shrink-0">
                    {service.title}
                  </h3>

                  {/* Description — hidden on mobile */}
                  <p className="hidden md:block text-[0.875rem] text-[#606878] leading-relaxed flex-1">
                    {service.shortDescription}
                  </p>

                  {/* Arrow */}
                  <ArrowRight
                    size={18}
                    className="text-[#3a4a58] group-hover:text-[#c49a2a] group-hover:translate-x-2 transition-all shrink-0 ml-auto"
                  />
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
