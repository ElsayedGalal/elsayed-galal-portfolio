import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { portfolioData } from '../data/portfolioData';
import { sounds } from '../utils/sound';
import { ArrowDownRight, FileDown, Mail } from 'lucide-react';

// أيقونات SVG مدمجة لتفادي مشاكل الحزم
const LinkedinIcon = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const GithubIcon = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

// --- مكون الكرت التفاعلي ثلاثي الأبعاد المائل مع حركة الماوس ---
function InteractiveTiltCard({ personal }) {
  const cardRef = useRef(null);

  // إحداثيات الماوس النسبية داخل الكرت
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // زنبرك فيزيائي لتنعيم الحركة والعودة السلسة عند خروج الماوس
  const springConfig = { damping: 20, stiffness: 220, mass: 0.5 };
  const mouseXSpring = useSpring(x, springConfig);
  const mouseYSpring = useSpring(y, springConfig);

  // حساب زوايا التمايل ثلاثي الأبعاد
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["14deg", "-14deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-14deg", "14deg"]);

  // تتبع الضوء الانعكاسي (Glare)
  const glareX = useTransform(mouseXSpring, [-0.5, 0.5], ["0%", "100%"]);
  const glareY = useTransform(mouseYSpring, [-0.5, 0.5], ["0%", "100%"]);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    // حساب موقع المؤشر من -0.5 إلى +0.5
    const mouseX = (e.clientX - rect.left) / width - 0.5;
    const mouseY = (e.clientY - rect.top) / height - 0.5;

    x.set(mouseX);
    y.set(mouseY);
  };

  const handleMouseLeave = () => {
    // تصفير الحركة ليعود الكرت لمستواه الطبيعي
    x.set(0);
    y.set(0);
  };

  return (
    <div 
      className="relative flex justify-center lg:justify-end py-4"
      style={{ perspective: 1200 }}
    >
      {/* توهج نيون محيطي خلف الكرت */}
      <div className="absolute -top-10 -right-8 w-52 h-52 bg-accent-cyan/15 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute -bottom-10 -left-8 w-52 h-52 bg-accent-indigo/20 rounded-full blur-3xl pointer-events-none"></div>

      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onMouseEnter={() => sounds.playHoverTick()}
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        className="relative w-full max-w-[340px] rounded-3xl p-1 bg-gradient-to-b from-white/15 via-white/5 to-transparent shadow-2xl transition-shadow duration-300 hover:shadow-[0_20px_50px_rgba(0,0,0,0.8)] cursor-pointer select-none"
      >
        {/* الحاوية الزجاجية الداخلية */}
        <div className="relative w-full rounded-[22px] overflow-hidden bg-[#121215]/95 border border-white/10 flex flex-col justify-between backdrop-blur-2xl">
          
          {/* طبقة الضوء الانعكاسي (Glare Effect) */}
          <motion.div
            className="absolute inset-0 pointer-events-none opacity-0 hover:opacity-100 transition-opacity duration-300 z-30"
            style={{
              background: `radial-gradient(circle 200px at ${glareX} ${glareY}, rgba(255,255,255,0.08), transparent 70%)`,
            }}
          />

          {/* شريط التحكم العلوي (Mac Terminal Style) */}
          <div 
            style={{ transform: "translateZ(30px)" }}
            className="flex items-center justify-between px-4 py-3 border-b border-white/5 bg-zinc-900/60 backdrop-blur-md z-20"
          >
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#EF4444]"></span>
              <span className="w-2.5 h-2.5 rounded-full bg-[#F59E0B]"></span>
              <span className="w-2.5 h-2.5 rounded-full bg-[#10B981]"></span>
            </div>
            <span className="text-[11px] font-mono text-zinc-400">telemetry_node_01: active</span>
          </div>

          {/* حاوية الصورة الموزونة بنسبة أبعاد سينمائية */}
          <div 
            style={{ transform: "translateZ(20px)" }}
            className="relative w-full h-[360px] overflow-hidden bg-gradient-to-b from-zinc-950/80 to-zinc-900 flex items-center justify-center"
          >
            <img
              src={personal.profileImg}
              alt={personal.name}
              className="w-full h-full object-cover object-top filter contrast-[1.03] brightness-[1.02] scale-[1.02] transition-transform duration-500 hover:scale-105"
            />
            {/* تدرج سفلي ناعم جداً لدمج الأكتاف بالخلفية بدون قص حاد */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#121215] via-[#121215]/30 to-transparent"></div>
          </div>

          {/* الشريط البياني السفلي (Float Effect) */}
          <div 
            style={{ transform: "translateZ(40px)" }}
            className="p-4 border-t border-white/5 bg-zinc-900/80 backdrop-blur-md flex items-center justify-between z-20"
          >
            <div>
              <p className="text-[10px] font-mono text-zinc-400 tracking-wider">Current Focus</p>
              <p className="text-xs font-bold text-white tracking-wide">Enterprise BI & MBA Studies</p>
            </div>
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-accent-cyan/10 border border-accent-cyan/30 shadow-sm shadow-accent-cyan/10">
              <span className="w-1.5 h-1.5 rounded-full bg-accent-cyan animate-pulse"></span>
              <span className="text-[10px] font-mono text-accent-cyan font-bold tracking-wider">SENIOR</span>
            </div>
          </div>

        </div>
      </motion.div>
    </div>
  );
}

// --- المكون الرئيسي للـ Hero ---
export default function Hero() {
  const { personal } = portfolioData;

  return (
    <section className="relative pt-36 pb-12 max-w-5xl mx-auto px-4 overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        
        {/* عمود النصوص والأزرار */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="lg:col-span-7 space-y-6"
        >
          {/* شارة الحالة الحية */}
          <div 
            onMouseEnter={() => sounds.playHoverTick()}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900 border border-white/10 text-xs text-zinc-300"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent-emerald opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-accent-emerald"></span>
            </span>
            <span className="font-mono">{personal.statusBadge}</span>
          </div>

          <div className="space-y-2">
            <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
              Architecting <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-cyan via-accent-indigo to-white">Semantic Intelligence</span> & Data Models.
            </h1>
            <p className="text-base sm:text-lg font-medium text-zinc-300">
              {personal.name} — <span className="text-accent-cyan">{personal.title}</span>
            </p>
          </div>

          <p className="text-zinc-400 text-sm sm:text-base leading-relaxed max-w-xl">
            {personal.summary}
          </p>

          {/* أزرار التحويل المباشرة */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <a
              href="#case-studies"
              onClick={() => sounds.playClickSnap()}
              className="px-5 py-2.5 rounded-xl bg-white text-black font-semibold text-xs sm:text-sm hover:bg-zinc-200 transition-all flex items-center gap-2 shadow-lg shadow-white/5"
            >
              <span>Explore Architecture</span>
              <ArrowDownRight size={16} />
            </a>

            <a
              href={personal.socials.cvPath}
              download
              onClick={() => sounds.playClickSnap()}
              className="px-4 py-2.5 rounded-xl bg-surface text-zinc-300 border border-border hover:border-white/20 font-medium text-xs sm:text-sm transition-all flex items-center gap-2 hover:text-white"
            >
              <FileDown size={16} />
              <span>Executive CV</span>
            </a>

            <div className="flex items-center gap-2 pl-2 border-l border-zinc-800">
              <a
                href={personal.socials.linkedin}
                target="_blank"
                rel="noreferrer"
                onMouseEnter={() => sounds.playHoverTick()}
                className="p-2.5 rounded-xl bg-surface border border-border text-zinc-400 hover:text-accent-cyan hover:border-accent-cyan/30 transition-all"
              >
                <LinkedinIcon size={16} />
              </a>
              <a
                href={personal.socials.github}
                target="_blank"
                rel="noreferrer"
                onMouseEnter={() => sounds.playHoverTick()}
                className="p-2.5 rounded-xl bg-surface border border-border text-zinc-400 hover:text-white transition-all"
              >
                <GithubIcon size={16} />
              </a>
              <a
                href={`mailto:${personal.email}`}
                onMouseEnter={() => sounds.playHoverTick()}
                className="p-2.5 rounded-xl bg-surface border border-border text-zinc-400 hover:text-accent-emerald transition-all"
              >
                <Mail size={16} />
              </a>
            </div>
          </div>
        </motion.div>

        {/* عمود الكرت ثلاثي الأبعاد المائل */}
        <div className="lg:col-span-5">
          <InteractiveTiltCard personal={personal} />
        </div>

      </div>
    </section>
  );
}