"use client";

import Link from "next/link";
import Image from "next/image";
import { Phone, ArrowRight, Shield } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { SITE_CONFIG } from "@/lib/constants";

const CTA_BG =
  "https://images.unsplash.com/photo-1562701226-f0cfe6d6a68c?auto=format&fit=crop&w=1920&q=80";

export default function CTASection() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="relative overflow-hidden py-24 md:py-32" aria-label="Request a security assessment">
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
      {/* Dark overlays */}
      <div className="absolute inset-0 z-[1] bg-[#080c12]/82" />
      <div
        className="absolute inset-0 z-[1]"
        style={{ background: "radial-gradient(ellipse at center, rgba(8,12,18,0.4) 0%, rgba(8,12,18,0.94) 100%)" }}
      />
      {/* Tactical grid */}
      <div
        className="absolute inset-0 z-[2] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(rgba(196,154,42,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(196,154,42,0.03) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
        aria-hidden="true"
      />

      {/* Gold accent lines */}
      <div className="absolute top-0 left-0 right-0 h-px z-[3]" style={{ background: "linear-gradient(to right, transparent, rgba(196,154,42,0.8) 30%, rgba(196,154,42,0.8) 70%, transparent)" }} />
      <div className="absolute bottom-0 left-0 right-0 h-px z-[3]" style={{ background: "linear-gradient(to right, transparent, rgba(196,154,42,0.8) 30%, rgba(196,154,42,0.8) 70%, transparent)" }} />

      {/* Shield watermark */}
      <div className="absolute right-4 top-1/2 -translate-y-1/2 opacity-[0.04] pointer-events-none z-[2]" aria-hidden="true">
        <Shield size={420} strokeWidth={0.3} className="text-[#c49a2a]" />
      </div>

      <div className="relative z-10 container-wide">
        <motion.div
          initial={shouldReduceMotion ? {} : { opacity: 0, scale: 0.96, y: 32 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-3xl mx-auto text-center relative"
        >
          {/* Corner brackets */}
          <div className="absolute -top-6 -left-4 lg:-left-10 w-7 h-7 border-t-2 border-l-2 border-[#c49a2a]/50" aria-hidden="true" />
          <div className="absolute -bottom-6 -right-4 lg:-right-10 w-7 h-7 border-b-2 border-r-2 border-[#c49a2a]/50" aria-hidden="true" />

          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="h-px w-10 bg-[#c49a2a]/50" />
            <span className="label-overline">Get Protected Today</span>
            <div className="h-px w-10 bg-[#c49a2a]/50" />
          </div>

          <h2
            className="display-title text-[#edf2f7] mb-6"
            style={{ fontSize: "clamp(2.75rem, 6.5vw, 5rem)" }}
          >
            Ready to Secure
            <br />
            <span className="gradient-gold">Your Property?</span>
          </h2>

          <p className="text-[1rem] text-[#7a9ab8] leading-relaxed mb-10 max-w-2xl mx-auto font-[var(--font-sans)]">
            Request a complimentary security assessment and speak with a
            Stratton senior advisor. We&apos;ll analyze your needs, your property,
            and your risk exposure — and build a program that fits.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10">
            <Link href="/contact" className="btn-primary text-sm px-8 py-4 group">
              Request a Free Assessment
              <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
            </Link>
            <a href={`tel:${SITE_CONFIG.phoneE164}`} className="btn-secondary text-sm px-8 py-4 group">
              <Phone size={15} />
              {SITE_CONFIG.phone}
            </a>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6 text-[0.6875rem] text-[#4a6880] tracking-wide">
            <span>CA PPO License #{SITE_CONFIG.licenseNumber}</span>
            <span className="w-1 h-1 rounded-full bg-[#2a3d50]" />
            <span>24/7 · 365 Availability</span>
            <span className="w-1 h-1 rounded-full bg-[#2a3d50]" />
            <span>Licensed · Bonded · Insured</span>
            <span className="w-1 h-1 rounded-full bg-[#2a3d50]" />
            <span>Serving Los Angeles & Southern California</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
