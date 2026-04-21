"use client";

import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { Phone, ArrowRight, ChevronDown } from "lucide-react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { SITE_CONFIG } from "@/lib/constants";

const HERO_BG =
  "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1920&q=80";

const LINE1 = ["Excellence"];
const LINE2 = ["In", "Protection"];

const TRUST_SIGNALS = [
  `CA PPO License #${SITE_CONFIG.licenseNumber}`,
  "24/7 · 365 Operations",
  "Licensed, Bonded & Insured",
  "Serving Los Angeles & SoCal",
];

export default function HeroSection() {
  const prefersReduced = useReducedMotion();
  const containerRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  const bgScale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);

  const wordVariant = {
    hidden: prefersReduced ? { opacity: 0 } : { opacity: 0, rotateX: 90, y: 20 },
    visible: { opacity: 1, rotateX: 0, y: 0 },
  };

  return (
    <section
      ref={containerRef}
      className="relative min-h-dvh flex flex-col justify-center overflow-hidden bg-[#080c12]"
      aria-label="Hero — Stratton Security Group"
    >
      {/* ── Parallax background ── */}
      <motion.div
        className="absolute inset-0 z-0"
        style={prefersReduced ? {} : { y: bgY, scale: bgScale }}
      >
        <Image
          src={HERO_BG}
          alt=""
          fill
          priority
          quality={85}
          className="object-cover object-center"
          sizes="100vw"
          aria-hidden="true"
        />
      </motion.div>

      {/* ── Tactical grid overlay ── */}
      <div
        className="absolute inset-0 z-[1] pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(rgba(196,154,42,0.045) 1px, transparent 1px),
            linear-gradient(90deg, rgba(196,154,42,0.045) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
        }}
        aria-hidden="true"
      />

      {/* ── Gradient vignettes ── */}
      <div
        className="absolute inset-0 z-[2] pointer-events-none"
        style={{
          background: `linear-gradient(
            to bottom,
            rgba(8,12,18,0.94) 0%,
            rgba(8,12,18,0.42) 28%,
            rgba(8,12,18,0.42) 62%,
            rgba(8,12,18,0.97) 100%
          )`,
        }}
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 z-[2] pointer-events-none"
        style={{ background: "radial-gradient(ellipse at 60% 50%, transparent 25%, rgba(8,12,18,0.72) 100%)" }}
        aria-hidden="true"
      />

      {/* ── Left gold accent line ── */}
      <div
        className="absolute left-0 top-0 bottom-0 w-px z-[3] pointer-events-none"
        style={{ background: "linear-gradient(to bottom, transparent 8%, rgba(196,154,42,0.5) 32%, rgba(196,154,42,0.5) 68%, transparent 92%)" }}
        aria-hidden="true"
      />

      {/* ── HUD status bar ── */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.0, duration: 0.5 }}
        className="absolute top-28 left-6 lg:left-[4.5rem] z-10 hidden lg:flex items-center gap-2.5"
        aria-hidden="true"
      >
        <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#16a34a", animation: "hud-pulse 2.4s ease-in-out infinite" }} />
        <span style={{ fontFamily: "var(--font-sans)", fontSize: "0.5625rem", letterSpacing: "0.22em", textTransform: "uppercase", color: "rgba(196,154,42,0.65)" }}>
          Sys: Active · LA Operations Center
        </span>
      </motion.div>

      {/* ── Hero content ── */}
      <div className="relative z-10 container-wide flex flex-col justify-center min-h-dvh py-24 pt-36 lg:pt-40">

        {/* Corner brackets */}
        <div className="absolute top-[8.5rem] left-4 lg:left-[3.5rem] w-5 h-5 border-t border-l border-[#c49a2a]/45 pointer-events-none" aria-hidden="true" />
        <div className="absolute bottom-16 right-4 lg:right-[3.5rem] w-5 h-5 border-b border-r border-[#c49a2a]/45 pointer-events-none" aria-hidden="true" />

        {/* Overline */}
        <motion.div
          initial={{ opacity: 0, x: -16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.55, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="flex items-center gap-3 mb-7"
        >
          <div className="w-8 h-px bg-[#c49a2a]" />
          <span className="label-overline">Professional Security Services</span>
          <div className="w-5 h-px bg-[#c49a2a]/35" />
        </motion.div>

        {/* Headline line 1 */}
        <div className="overflow-hidden mb-1" style={{ perspective: "800px" }}>
          <motion.h1
            className="display-hero text-[#edf2f7] leading-[0.88]"
            style={{ fontSize: "clamp(3.75rem, 10.5vw, 9rem)" }}
            initial="hidden"
            animate="visible"
            variants={{ visible: { transition: { staggerChildren: 0.12, delayChildren: 0.35 } } }}
          >
            {LINE1.map((word, i) => (
              <motion.span
                key={i}
                variants={wordVariant}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                style={{ display: "inline-block", transformOrigin: "50% 100%", marginRight: "0.2em" }}
              >
                {word}
              </motion.span>
            ))}
          </motion.h1>
        </div>

        {/* Headline line 2 — gold outline */}
        <div className="overflow-hidden mb-8" style={{ perspective: "800px" }}>
          <motion.div
            className="display-hero leading-[0.88]"
            style={{
              fontSize: "clamp(3.75rem, 10.5vw, 9rem)",
              WebkitTextStroke: "1.5px rgba(196,154,42,0.65)",
              color: "transparent",
            }}
            initial="hidden"
            animate="visible"
            variants={{ visible: { transition: { staggerChildren: 0.12, delayChildren: 0.58 } } }}
          >
            {LINE2.map((word, i) => (
              <motion.span
                key={i}
                variants={wordVariant}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                style={{ display: "inline-block", transformOrigin: "50% 100%", marginRight: "0.2em" }}
              >
                {word}
              </motion.span>
            ))}
          </motion.div>
        </div>

        {/* Gold divider */}
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ delay: 0.95, duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          style={{ transformOrigin: "left" }}
          className="w-20 h-px bg-[#c49a2a] mb-7"
        />

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1.05, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-[480px] text-[1.0625rem] text-[#7a9ab8] leading-relaxed mb-9"
          style={{ fontFamily: "var(--font-sans)", fontWeight: 300 }}
        >
          In a world where risk is constantly changing, Stratton Security Group
          is your most reliable security partner — protecting people, assets,
          and peace of mind across Southern California.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.15, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col sm:flex-row gap-3 mb-14"
        >
          <Link href="/contact" className="btn-primary group text-sm px-7 py-4">
            Request a Free Assessment
            <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
          </Link>
          <a href={`tel:${SITE_CONFIG.phoneE164}`} className="btn-secondary group text-sm px-7 py-4">
            <Phone size={14} />
            {SITE_CONFIG.phone}
          </a>
        </motion.div>

        {/* Trust signals */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.3 }}
          className="flex flex-wrap gap-x-6 gap-y-2"
        >
          {TRUST_SIGNALS.map((signal, i) => (
            <div key={i} className="flex items-center gap-2">
              <div className="w-1 h-1 rounded-full bg-[#c49a2a]" />
              <span className="text-[0.75rem] text-[#4a6880] tracking-wide" style={{ fontFamily: "var(--font-sans)" }}>
                {signal}
              </span>
            </div>
          ))}
        </motion.div>
      </div>

      {/* ── Scroll indicator ── */}
      {!prefersReduced && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.7 }}
          className="absolute bottom-7 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1.5"
          aria-hidden="true"
        >
          <span style={{ fontFamily: "var(--font-sans)", fontSize: "0.5rem", letterSpacing: "0.3em", textTransform: "uppercase", color: "#4a6880" }}>
            Scroll
          </span>
          <motion.div animate={{ y: [0, 6, 0] }} transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}>
            <ChevronDown size={15} className="text-[#4a6880]" />
          </motion.div>
        </motion.div>
      )}

      {/* ── Bottom separator ── */}
      <div
        className="absolute bottom-0 left-0 right-0 h-px z-10 pointer-events-none"
        style={{ background: "linear-gradient(to right, transparent, rgba(196,154,42,0.4) 30%, rgba(196,154,42,0.4) 70%, transparent)" }}
      />
    </section>
  );
}
