import React from 'react';
import { motion } from 'framer-motion';
import { portfolioData } from '../data/portfolioData';
import { sounds } from '../utils/sound';
import { GraduationCap, Award, CheckCircle2, BookOpen, ShieldCheck } from 'lucide-react';

export default function Credentials() {
  const { education, credentials } = portfolioData;

  return (
    <section id="credentials" className="py-20 max-w-5xl mx-auto px-4 relative">
      
      {/* رأس القسم */}
      <div className="mb-12">
        <div className="flex items-center gap-2 text-accent-cyan text-xs font-mono mb-2">
          <ShieldCheck size={14} />
          <span>VERIFIED FOUNDATION & GOVERNANCE</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Academic Pedigree & Certifications.
        </h2>
        <p className="text-zinc-400 text-sm mt-1">
          Bridging Computer Science rigorous engineering with strategic MBA business governance.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* العمود الأيسر: المسار الأكاديمي (Education) */}
        <div className="lg:col-span-6 space-y-4">
          <div className="flex items-center gap-2 text-sm font-semibold text-zinc-200 mb-2">
            <GraduationCap size={18} className="text-accent-cyan" />
            <span>Academic Degrees</span>
          </div>

          {education.map((edu, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: idx * 0.1 }}
              onMouseEnter={() => sounds.playHoverTick()}
              className="glass-card rounded-2xl p-5 relative overflow-hidden group hover:border-accent-cyan/30 transition-all"
            >
              <div className="flex items-start justify-between gap-2 mb-2">
                <h3 className="text-base font-bold text-white group-hover:text-accent-cyan transition-colors">
                  {edu.degree}
                </h3>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-800 text-zinc-300 shrink-0 border border-white/5">
                  {edu.period}
                </span>
              </div>

              <p className="text-xs font-medium text-accent-cyan/90 mb-3 flex items-center gap-1.5">
                <BookOpen size={13} />
                <span>{edu.institution}</span>
              </p>

              <div className="text-xs text-zinc-400 leading-relaxed pt-2 border-t border-white/5">
                <strong className="text-zinc-300 font-mono text-[11px]">Key Focus:</strong> {edu.focus}
              </div>
            </motion.div>
          ))}
        </div>

        {/* العمود الأيمن: الاعتمادات الاحترافية (Certifications) */}
        <div className="lg:col-span-6 space-y-4">
          <div className="flex items-center gap-2 text-sm font-semibold text-zinc-200 mb-2">
            <Award size={18} className="text-accent-emerald" />
            <span>Professional Credentials</span>
          </div>

          <div className="space-y-2.5">
            {credentials.map((cred, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: 15 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: idx * 0.08 }}
                onMouseEnter={() => sounds.playHoverTick()}
                className="p-4 rounded-xl bg-card border border-border hover:border-accent-emerald/40 transition-all flex items-start gap-3.5 group"
              >
                <div className="w-7 h-7 rounded-lg bg-accent-emerald/10 border border-accent-emerald/20 flex items-center justify-center shrink-0 mt-0.5 group-hover:bg-accent-emerald group-hover:text-black transition-colors">
                  <CheckCircle2 size={15} className="text-accent-emerald group-hover:text-black" />
                </div>

                <div className="flex-1 min-w-0">
                  <h4 className="text-xs sm:text-sm font-semibold text-zinc-100 group-hover:text-white transition-colors leading-snug">
                    {cred.title}
                  </h4>
                  <p className="text-[11px] font-mono text-zinc-400 mt-1">
                    Issued by: <span className="text-zinc-300">{cred.issuer}</span>
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}