"use client";

import Link from "next/link";
import Image from "next/image";
import { Phone, ArrowRight } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { SITE_CONFIG } from "@/lib/constants";

const CTA_BG =
  "https://images.unsplash.com/photo-1562701226-f0cfe6d6a68c?auto=format&fit=crop&w=1920&q=80";

export default function CTASection() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="relative overflow-hidden min-h-[60vh] flex items-center" aria-label="Request a security assessment">
      {/* Background photo */}
      <div className="absolute inset-0 z-0">
        <Image
          src={CTA_BG}
          alt=""
          fill
          className="object-cover object-center"
          sizes="100vw"
          aria-hidden="true"
        />
      </div>
      {/* Clean dark overlay */}
      <div className="absolute inset-0 z-[1]" style={{ background: "linear-gradient(to right, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.75) 50%, rgba(0,0,0,0.5) 100%)" }} />
      <div className="absolute inset-0 z-[1]" style={{ background: "linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, transparent 40%, rgba(0,0,0,0.6) 100%)" }} />

      {/* Thin gold top border */}
      <div className="absolute top-0 left-0 right-0 h-px z-[2]" style={{ background: "linear-gradient(to right, transparent, rgba(196,154,42,0.5) 30%, rgba(196,154,42,0.5) 70%, transparent)" }} />

      <div className="relative z-10 container-wide py-24 md:py-32">
        <motion.div
          initial={shouldReduceMotion ? {} : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-2xl"
        >
          <p className="label-overline mb-6">Get Protected Today</p>

          <h2
            className="display-title text-white mb-6"
            style={{ fontSize: "clamp(2.75rem, 6.5vw, 5rem)" }}
          >
            Ready to Secure
            <br />
            <span className="gradient-gold">Your Property?</span>
          </h2>

          <div className="w-16 h-px bg-[#c49a2a] mb-8" />

          <p className="text-[1rem] text-[#a0b0c0] leading-relaxed mb-10 max-w-xl">
            Request a complimentary security assessment and speak with a
            Stratton senior advisor. We&apos;ll build a program that fits your
            property, risk profile, and budget.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 mb-12">
            <Link href="/contact" className="btn-primary text-sm px-8 py-4 group">
              Request a Free Assessment
              <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
            </Link>
            <a href={`tel:${SITE_CONFIG.phoneE164}`} className="btn-secondary text-sm px-8 py-4">
              <Phone size={15} />
              {SITE_CONFIG.phone}
            </a>
          </div>

          <div className="flex flex-wrap gap-6 text-[0.6875rem] text-[#606878] tracking-wide">
            <span>CA PPO License #{SITE_CONFIG.licenseNumber}</span>
            <span className="text-[#c49a2a]/30">·</span>
            <span>24/7 · 365 Availability</span>
            <span className="text-[#c49a2a]/30">·</span>
            <span>Licensed · Bonded · Insured</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
