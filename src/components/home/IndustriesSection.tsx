"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { INDUSTRIES } from "@/lib/constants";

export default function IndustriesSection() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="section-padding bg-[#080c12]" aria-labelledby="industries-heading">
      <div className="container-wide">
        <div className="grid lg:grid-cols-12 gap-12 items-start">
          {/* Left */}
          <motion.div
            initial={shouldReduceMotion ? {} : { opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-4"
          >
            <p className="label-overline mb-4">Industries Served</p>
            <motion.h2
              id="industries-heading"
              initial={shouldReduceMotion ? {} : { opacity: 0, rotateX: 15, y: 12 }}
              whileInView={{ opacity: 1, rotateX: 0, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
              style={shouldReduceMotion ? {} : { transformOrigin: "50% 100%", perspective: "600px" }}
              className="display-title text-[clamp(2rem,4.5vw,3rem)] text-[#edf2f7] mb-6"
            >
              Protecting Every
              <br />
              <span className="gradient-gold">Industry Sector</span>
            </motion.h2>
            <p className="text-[#7a9ab8] text-[0.9375rem] leading-relaxed mb-8 font-[var(--font-sans)]">
              Stratton&apos;s security programs span 14+ industry verticals — from
              luxury residential and commercial real estate to government
              facilities and distribution centers. Whatever your sector, we
              build security programs that match your specific risk landscape.
            </p>
            <Link href="/industries" className="btn-primary text-xs">
              Explore All Industries
              <ArrowRight size={13} />
            </Link>
          </motion.div>

          {/* Right */}
          <div className="lg:col-span-8">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {INDUSTRIES.map((industry, i) => (
                <motion.div
                  key={industry.slug}
                  initial={shouldReduceMotion ? {} : { opacity: 0, x: i % 2 === 0 ? -16 : 16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{
                    delay: Math.floor(i / 3) * 0.06 + (i % 3) * 0.04,
                    duration: 0.45,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  <Link
                    href={`/industries/${industry.slug}`}
                    className="group flex items-center gap-3 p-3 border border-[#0f2040] hover:border-[#c49a2a]/45 hover:bg-[#0a1520] transition-all duration-200"
                  >
                    <span className="text-[#1a3050] group-hover:text-[#c49a2a] transition-colors text-sm shrink-0 select-none font-[var(--font-sans)]">
                      →
                    </span>
                    <span className="text-[0.8125rem] text-[#7a9ab8] group-hover:text-[#b8cce0] transition-colors font-[var(--font-sans)]">
                      {industry.label}
                    </span>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
