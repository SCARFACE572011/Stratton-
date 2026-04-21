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
    flicker: true,
  },
  {
    icon: Clock,
    label: "Always Available",
    value: "24/7 · 365",
    sub: "No holidays, no gaps",
    flicker: false,
  },
  {
    icon: Award,
    label: "Combined Experience",
    value: "50+ Years",
    sub: "Law enforcement & security",
    flicker: false,
  },
  {
    icon: Star,
    label: "Bark.com Rated",
    value: "5.0 ★",
    sub: "Verified client reviews",
    flicker: false,
  },
];

export default function TrustBar() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className="bg-[#080c12] border-y border-[#0f2040]">
      {/* HUD status bar */}
      <div className="container-wide">
        <div className="flex items-center gap-2.5 py-2 border-b border-[#0f2040]">
          <div
            style={{
              width: 5,
              height: 5,
              borderRadius: "50%",
              background: "#16a34a",
              boxShadow: "0 0 6px #16a34a",
              animation: "hud-pulse 2.4s ease-in-out infinite",
              flexShrink: 0,
            }}
          />
          <span style={{ fontFamily: "var(--font-sans)", fontSize: "0.5rem", letterSpacing: "0.25em", textTransform: "uppercase", color: "rgba(196,154,42,0.5)" }}>
            Operations Center Online · Los Angeles, CA
          </span>
        </div>
      </div>

      <div className="container-wide py-0">
        <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-y lg:divide-y-0 divide-[#0f2040]">
          {TRUST_ITEMS.map((item, i) => (
            <motion.div
              key={i}
              initial={shouldReduceMotion ? {} : { opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.5, ease: "easeOut" }}
              className="flex items-center gap-4 px-6 py-5 group"
            >
              <div
                className="w-10 h-10 border border-[#0f2040] flex items-center justify-center shrink-0 transition-all duration-300 group-hover:border-[#c49a2a]/40"
                style={{ transition: "border-color 0.3s ease, box-shadow 0.3s ease" }}
              >
                <item.icon
                  size={17}
                  className="text-[#c49a2a] transition-none"
                  strokeWidth={1.5}
                  style={{ filter: "drop-shadow(0 0 0px rgba(196,154,42,0))", transition: "filter 0.3s ease" }}
                />
              </div>
              <div>
                <div
                  className="font-[var(--font-display)] text-base text-[#edf2f7] uppercase tracking-wide leading-none mb-0.5"
                  style={item.flicker && !shouldReduceMotion ? { animation: "data-flicker 9s ease-in-out infinite" } : {}}
                >
                  {item.value}
                </div>
                <div className="text-[0.6875rem] text-[#4a6880] tracking-wide">
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
