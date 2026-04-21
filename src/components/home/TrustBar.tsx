"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Shield, Clock, Award, Star } from "lucide-react";
import { SITE_CONFIG } from "@/lib/constants";

const TRUST_ITEMS = [
  {
    icon: Shield,
    label: "California Licensed",
    value: `PPO #${SITE_CONFIG.licenseNumber}`,
    sub: "Licensed · Bonded · Insured",
  },
  {
    icon: Clock,
    label: "Always Available",
    value: "24/7 · 365",
    sub: "No holidays, no gaps",
  },
  {
    icon: Award,
    label: "Combined Experience",
    value: "50+ Years",
    sub: "Law enforcement & security",
  },
  {
    icon: Star,
    label: "Bark.com Rated",
    value: "5.0 ★",
    sub: "Verified client reviews",
  },
];

export default function TrustBar() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className="bg-[#050810] border-b border-[#1a2030]">
      <div className="container-wide">
        <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-[#1a2030]">
          {TRUST_ITEMS.map((item, i) => (
            <motion.div
              key={i}
              initial={shouldReduceMotion ? {} : { opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.5, ease: "easeOut" }}
              className="flex items-center gap-4 px-6 py-6 group"
            >
              <div className="w-10 h-10 border border-[#1a2030] flex items-center justify-center shrink-0 group-hover:border-[#c49a2a]/40 transition-colors">
                <item.icon size={17} className="text-[#c49a2a]" strokeWidth={1.5} />
              </div>
              <div>
                <div className="font-[var(--font-display)] text-base text-white uppercase tracking-wide leading-none mb-0.5">
                  {item.value}
                </div>
                <div className="text-[0.6875rem] text-[#606878] tracking-wide">
                  {item.sub}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
