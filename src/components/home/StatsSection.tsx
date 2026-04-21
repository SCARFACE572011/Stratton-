"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { STATS } from "@/lib/constants";

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
    <section
      ref={sectionRef}
      className="bg-[#080c14] border-y border-[#1a2030]"
      aria-label="Company statistics"
    >
      <div className="container-wide py-16 md:py-20">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-[#1a2030]">
          {STATS.map((stat, i) => (
            <motion.div
              key={i}
              initial={shouldReduceMotion ? {} : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="bg-[#080c14] text-center px-8 py-10"
            >
              <div
                className="font-[var(--font-display)] font-800 leading-none mb-3 text-[#c49a2a]"
                style={{ fontSize: "clamp(2.75rem, 6vw, 4.5rem)" }}
                aria-label={`${stat.value}${stat.suffix}`}
              >
                <AnimatedCounter value={stat.value} suffix={stat.suffix} isVisible={isVisible} />
              </div>
              <p className="text-[0.6875rem] text-[#606878] tracking-[0.18em] uppercase">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
