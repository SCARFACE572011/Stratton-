"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { STATS } from "@/lib/constants";

const STATS_BG =
  "https://images.unsplash.com/photo-1563788850-bdd5b04e1832?auto=format&fit=crop&w=1920&q=80";

function AnimatedCounter({ value, suffix, isVisible }: { value: number; suffix: string; isVisible: boolean }) {
  const shouldReduceMotion = useReducedMotion();
  const [count, setCount] = useState(0);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!isVisible || hasAnimated.current || shouldReduceMotion) {
      if (shouldReduceMotion) setCount(value);
      return;
    }
    hasAnimated.current = true;
    const duration = 1800;
    const startTime = performance.now();
    const step = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * value));
      if (progress < 1) requestAnimationFrame(step);
      else setCount(value);
    };
    requestAnimationFrame(step);
  }, [isVisible, value, shouldReduceMotion]);

  return <span>{count}{suffix}</span>;
}

export default function StatsSection() {
  const shouldReduceMotion = useReducedMotion();
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setIsVisible(true); observer.disconnect(); } },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="relative overflow-hidden" aria-label="Company statistics">
      {/* Background photo */}
      <div className="absolute inset-0 z-0">
        <Image
          src={STATS_BG}
          alt=""
          fill
          className="object-cover object-center opacity-[0.08]"
          sizes="100vw"
          aria-hidden="true"
        />
      </div>
      {/* Dark overlays */}
      <div className="absolute inset-0 z-[1] bg-[#080c12]/88" />
      <div
        className="absolute inset-0 z-[1]"
        style={{ background: "linear-gradient(135deg, #0a1428 0%, #080c12 55%, #080c12 100%)" }}
      />
      {/* Left gold accent */}
      <div
        className="absolute left-0 top-0 bottom-0 w-px z-[2]"
        style={{ background: "linear-gradient(to bottom, transparent, #c49a2a 30%, #c49a2a 70%, transparent)" }}
      />

      <div className="relative z-10 container-wide py-16 md:py-20">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-0 lg:divide-x divide-[#0f2040]">
          {STATS.map((stat, i) => (
            <motion.div
              key={i}
              initial={shouldReduceMotion ? {} : { opacity: 0, scale: 0.82, y: 20 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                delay: i * 0.12,
                duration: 0.65,
                ease: [0.22, 1, 0.36, 1],
                scale: { type: "spring", stiffness: 220, damping: 22 },
              }}
              className="text-center lg:px-8"
            >
              <motion.div
                animate={isVisible && !shouldReduceMotion ? { scale: [0.88, 1.06, 1] } : {}}
                transition={{ delay: i * 0.12 + 0.3, duration: 0.5, ease: "easeOut" }}
                className="font-[var(--font-display)] font-800 leading-none mb-2"
                style={{
                  fontSize: "clamp(2.5rem,6vw,4rem)",
                  background: "linear-gradient(135deg, #e0b84a 0%, #c49a2a 60%, #f5df9e 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
                aria-label={`${stat.value}${stat.suffix}`}
              >
                <AnimatedCounter value={stat.value} suffix={stat.suffix} isVisible={isVisible} />
              </motion.div>
              <p className="text-[0.75rem] text-[#4a6880] tracking-[0.14em] uppercase font-medium label-overline" style={{ color: "#4a6880" }}>
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
