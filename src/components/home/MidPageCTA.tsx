"use client";

import Link from "next/link";
import { Phone, ArrowRight } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { SITE_CONFIG } from "@/lib/constants";

export default function MidPageCTA() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className="relative bg-[#080c12] border-y border-[#c49a2a]/40 overflow-hidden">
      {/* Left vertical gold accent */}
      <div
        className="absolute left-0 top-0 bottom-0 w-0.5 pointer-events-none"
        style={{ background: "linear-gradient(to bottom, transparent, rgba(196,154,42,0.7) 40%, rgba(196,154,42,0.7) 60%, transparent)" }}
        aria-hidden="true"
      />

      <div className="container-wide py-10 md:py-12">
        <motion.div
          initial={shouldReduceMotion ? {} : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col md:flex-row items-center justify-between gap-6"
        >
          <div className="relative">
            {/* Corner bracket */}
            <div className="absolute -top-2 -left-3 w-4 h-4 border-t border-l border-[#c49a2a]/40" aria-hidden="true" />
            <p
              className="font-[var(--font-display)] text-[#edf2f7] uppercase tracking-wide leading-tight"
              style={{ fontSize: "clamp(1.25rem, 2.8vw, 1.75rem)" }}
            >
              Ready to Protect Your Property?
            </p>
            <p className="text-[0.875rem] text-[#7a9ab8] mt-1.5 font-[var(--font-sans)]">
              Free assessment · Response within one business day · 24/7 availability
            </p>
          </div>
          <div className="flex flex-wrap gap-3 shrink-0">
            <Link href="/contact" className="btn-primary text-xs">
              Request Free Assessment
              <ArrowRight size={13} />
            </Link>
            <a href={`tel:${SITE_CONFIG.phoneE164}`} className="btn-secondary text-xs">
              <Phone size={13} />
              {SITE_CONFIG.phone}
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
