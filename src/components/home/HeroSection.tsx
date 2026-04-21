"use client";

import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { SITE_CONFIG } from "@/lib/constants";

const HERO_BG =
  "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1920&q=80";

export default function HeroSection() {
  const prefersReduced = useReducedMotion();
  const containerRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "35%"]);

  return (
    <section
      ref={containerRef}
      className="relative min-h-dvh flex flex-col justify-end overflow-hidden"
      style={{ backgroundColor: "#000000" }}
      aria-label="Hero — Stratton Security Group"
    >
      {/* Parallax background */}
      <motion.div
        className="absolute inset-0 z-0"
        style={prefersReduced ? {} : { y: bgY }}
      >
        <Image
          src={HERO_BG}
          alt=""
          fill
          priority
          quality={90}
          className="object-cover object-center"
          sizes="100vw"
          aria-hidden="true"
        />
      </motion.div>

      {/* Single clean dark overlay — bottom-weighted */}
      <div
        className="absolute inset-0 z-[1] pointer-events-none"
        style={{
          background:
            "linear-gradient(to bottom, rgba(0,0,0,0.25) 0%, rgba(0,0,0,0.5) 40%, rgba(0,0,0,0.92) 100%)",
        }}
        aria-hidden="true"
      />
      {/* Left edge fade */}
      <div
        className="absolute inset-0 z-[1] pointer-events-none"
        style={{ background: "linear-gradient(to right, rgba(0,0,0,0.6) 0%, transparent 60%)" }}
        aria-hidden="true"
      />

      {/* Content — anchored to bottom-left like Anduril */}
      <div className="relative z-10 container-wide pb-20 md:pb-28 pt-40">
        <motion.p
          initial={prefersReduced ? {} : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="label-overline mb-6"
        >
          Los Angeles Security Professionals
        </motion.p>

        {/* Main headline */}
        <motion.h1
          className="display-hero text-white mb-6 max-w-4xl"
          style={{ fontSize: "clamp(4rem, 11vw, 9.5rem)", lineHeight: 0.88 }}
          initial={prefersReduced ? {} : { opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
        >
          Excellence
          <br />
          <span style={{ WebkitTextStroke: "1.5px rgba(196,154,42,0.7)", color: "transparent" }}>
            In Protection
          </span>
        </motion.h1>

        {/* Thin gold line */}
        <motion.div
          className="w-16 h-px bg-[#c49a2a] mb-7"
          initial={prefersReduced ? {} : { scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          style={{ transformOrigin: "left" }}
          transition={{ delay: 0.7, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        />

        <motion.p
          className="text-[#a0b0c0] max-w-lg text-[1.0625rem] leading-relaxed mb-10"
          style={{ fontWeight: 300 }}
          initial={prefersReduced ? {} : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          Stratton Security Group protects people, assets, and peace of mind
          across Southern California — 24 hours a day, 365 days a year.
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row gap-3"
          initial={prefersReduced ? {} : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.95, ease: [0.22, 1, 0.36, 1] }}
        >
          <Link href="/contact" className="btn-primary group text-sm px-7 py-4">
            Request a Free Assessment
            <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
          </Link>
          <a href={`tel:${SITE_CONFIG.phoneE164}`} className="btn-secondary text-sm px-7 py-4">
            {SITE_CONFIG.phone}
          </a>
        </motion.div>
      </div>
    </section>
  );
}
