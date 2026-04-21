"use client";

import { Star } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { TESTIMONIALS, BARK_REVIEWS } from "@/lib/constants";

function StarRating({ count = 5 }: { count?: number }) {
  return (
    <div className="flex gap-0.5" aria-label={`${count} out of 5 stars`}>
      {Array.from({ length: count }).map((_, i) => (
        <Star key={i} size={12} className="text-[#c49a2a] fill-[#c49a2a]" style={{ filter: "drop-shadow(0 0 3px rgba(196,154,42,0.4))" }} />
      ))}
    </div>
  );
}

export default function TestimonialsSection() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="section-padding bg-[#080c12]" aria-labelledby="testimonials-heading">
      <div className="container-wide">
        {/* Header */}
        <motion.div
          initial={shouldReduceMotion ? {} : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12"
        >
          <div>
            <p className="label-overline mb-4">Client Testimonials</p>
            <h2 id="testimonials-heading" className="display-title text-[clamp(2rem,4.5vw,3rem)] text-[#edf2f7]">
              Trusted by Clients
              <br />
              <span className="gradient-gold">Across Los Angeles</span>
            </h2>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <div className="text-right">
              <div className="flex items-center justify-end gap-1 mb-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} size={14} className="text-[#c49a2a] fill-[#c49a2a]" />
                ))}
              </div>
              <p className="text-[0.75rem] text-[#7a9ab8]">5.0 on Bark.com</p>
              <p className="text-[0.6875rem] text-[#4a6880]">Verified reviews</p>
            </div>
            <div className="w-12 h-12 border border-[#c49a2a]/30 flex items-center justify-center">
              <span className="font-[var(--font-display)] text-xl text-[#c49a2a] font-700">5★</span>
            </div>
          </div>
        </motion.div>

        {/* Testimonials grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
          {TESTIMONIALS.map((item, i) => (
            <motion.blockquote
              key={i}
              initial={shouldReduceMotion ? {} : { opacity: 0, rotateX: 8, y: 24 }}
              whileInView={{ opacity: 1, rotateX: 0, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ delay: (i % 3) * 0.1, duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
              style={shouldReduceMotion ? {} : { perspective: "800px", transformOrigin: "50% 0%" }}
              className="card-tactical p-6 flex flex-col gap-3 hover:border-[#1e4878] transition-colors"
            >
              {/* Decorative quote mark */}
              <div
                className="font-[var(--font-display)] leading-none select-none -mb-2"
                style={{ fontSize: "3.5rem", color: "rgba(196,154,42,0.1)" }}
                aria-hidden="true"
              >
                &ldquo;
              </div>
              <StarRating count={item.stars} />
              <p className="text-[0.9375rem] text-[#b8cce0] leading-relaxed flex-1 italic">
                &ldquo;{item.quote}&rdquo;
              </p>
              <footer className="flex items-center gap-3 pt-2 border-t border-[#1a3050]">
                <div className="w-8 h-8 bg-[#0f2040] flex items-center justify-center shrink-0 text-[0.6875rem] font-600 text-[#c49a2a] font-[var(--font-sans)]">
                  {item.initials}
                </div>
                <div>
                  <cite className="text-[0.8125rem] text-[#edf2f7] not-italic font-medium block">{item.author}</cite>
                  <span className="text-[0.6875rem] text-[#4a6880]">{item.company}</span>
                </div>
              </footer>
            </motion.blockquote>
          ))}
        </div>

        {/* Bark.com verified strip */}
        <motion.div
          initial={shouldReduceMotion ? {} : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="card-tactical p-6"
        >
          <div className="flex items-center gap-3 mb-5">
            <div className="w-1 h-6 bg-[#c49a2a]" />
            <p className="text-[0.75rem] text-[#7a9ab8] tracking-widest uppercase">Verified on Bark.com</p>
          </div>
          <div className="grid md:grid-cols-3 gap-5">
            {BARK_REVIEWS.map((review, i) => (
              <div key={i} className="space-y-2">
                <StarRating count={review.stars} />
                <p className="text-[0.8125rem] text-[#9fb5cb] leading-relaxed italic">&ldquo;{review.quote}&rdquo;</p>
                <div>
                  <p className="text-[0.8125rem] text-[#edf2f7] font-medium">{review.author}</p>
                  <p className="text-[0.6875rem] text-[#4a6880]">{review.role}</p>
                  <p className="text-[0.625rem] text-[#2a3d50] mt-0.5">{review.date}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
