import React from 'react';
import { motion } from 'framer-motion';
import { portfolioData } from '../data/portfolioData';
import { sounds } from '../utils/sound';

export default function MetricsStrip() {
  return (
    <section className="py-8 max-w-5xl mx-auto px-4">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {portfolioData.metrics.map((metric, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            onMouseEnter={() => sounds.playHoverTick()}
            className="p-5 rounded-2xl bg-card border border-border hover:border-accent-cyan/30 transition-all group"
          >
            <div className="text-3xl font-extrabold font-mono text-white group-hover:text-accent-cyan transition-colors">
              {metric.value}
            </div>
            <div className="text-xs sm:text-sm font-semibold text-zinc-200 mt-1">
              {metric.label}
            </div>
            <div className="text-[11px] text-zinc-400 mt-0.5 font-mono">
              {metric.detail}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}