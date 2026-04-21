"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, BadgeCheck, Clock, Shield, Settings2, Award, FileText } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { DIFFERENTIATORS } from "@/lib/constants";

const ACCENT_PHOTO =
  "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=800&q=80";

const ICON_MAP = { BadgeCheck, Clock, Shield, Settings2, Award, FileText } as const;

export default function WhyStratton() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section
      className="bg-[#050810]"
      aria-labelledby="why-heading"
    >
      <div className="container-wide py-24 md:py-32">
        <div className="grid lg:grid-cols-12 gap-16 items-start">

          {/* Left column */}
          <motion.div
            initial={shouldReduceMotion ? {} : { opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-4 lg:sticky lg:top-28"
          >
            {/* Accent photo — clean, no brackets */}
            <div className="relative w-full aspect-[4/3] mb-10 overflow-hidden">
              <Image
                src={ACCENT_PHOTO}
                alt="Stratton Security officers on patrol"
                fill
                className="object-cover object-center"
                sizes="(max-width: 1024px) 100vw, 400px"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            </div>

            <p className="label-overline mb-4">Why Stratton</p>
            <h2
              id="why-heading"
              className="display-title text-white mb-6"
              style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}
            >
              The Standard of
              <br />
              <span className="gradient-gold">Protective Excellence</span>
            </h2>
            <p className="text-[#a0b0c0] text-[0.9375rem] leading-relaxed mb-8">
              We don&apos;t offer generic security templates. Every Stratton program
              is built around your property, your risk profile, and your
              operational requirements.
            </p>
            <Link href="/about" className="btn-primary text-xs">
              About Our Team
              <ArrowRight size={13} />
            </Link>
          </motion.div>

          {/* Right column — clean list, no TiltCards */}
          <div className="lg:col-span-8">
            {DIFFERENTIATORS.map((item, i) => {
              const IconComponent = ICON_MAP[item.icon as keyof typeof ICON_MAP] ?? BadgeCheck;
              return (
                <motion.div
                  key={i}
                  initial={shouldReduceMotion ? {} : { opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ delay: i * 0.08, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  className="flex items-start gap-6 py-7 border-b border-[#1a2030] last:border-0"
                >
                  <div className="w-10 h-10 border border-[#1a2030] flex items-center justify-center shrink-0 mt-0.5">
                    <IconComponent size={17} className="text-[#c49a2a]" strokeWidth={1.5} />
                  </div>
                  <div>
                    <h3 className="font-[var(--font-sans)] text-[1rem] font-600 text-white mb-2">
                      {item.title}
                    </h3>
                    <p className="text-[0.875rem] text-[#606878] leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
