import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { portfolioData } from '../data/portfolioData';
import { sounds } from '../utils/sound';
import { 
  ArrowUpRight, 
  ChevronLeft, 
  ChevronRight, 
  Maximize2, 
  X, 
  Layers, 
  Activity 
} from 'lucide-react';

// أيقونة GitHub مدمجة بصيغة SVG
const GithubIcon = ({ size = 15 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

// --- مكون عارض الداشبورد التفاعلي المتقدم داخل الكرت ---
function DashboardStage({ images, title, onExpand }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!images || images.length === 0) return null;

  const handlePrev = (e) => {
    e.stopPropagation();
    sounds.playClickSnap();
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = (e) => {
    e.stopPropagation();
    sounds.playClickSnap();
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="relative my-4 rounded-xl overflow-hidden border border-white/10 bg-zinc-950/80 group/viewer shadow-lg">
      {/* مساحة العرض الرئيسية 16:9 بنقاء فائق */}
      <div
        onClick={() => onExpand(images, currentIndex)}
        className="relative aspect-video w-full cursor-zoom-in overflow-hidden flex items-center justify-center bg-black/60"
      >
        <img
          src={images[currentIndex]}
          alt={`${title} - view ${currentIndex + 1}`}
          className="w-full h-full object-contain md:object-cover object-top transition-all duration-300 group-hover/viewer:scale-[1.01]"
        />

        {/* طبقة تفاعلية عند تمرير الماوس */}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/viewer:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
          <span className="px-3 py-1.5 rounded-lg bg-zinc-900/90 border border-white/20 text-xs text-white font-mono flex items-center gap-1.5 backdrop-blur-md shadow-2xl">
            <Maximize2 size={13} className="text-accent-cyan" />
            <span>Full View</span>
          </span>
        </div>

        {/* عداد الشاشات في الزاوية */}
        {images.length > 1 && (
          <div className="absolute top-2.5 right-2.5 px-2 py-0.5 rounded-md bg-black/75 border border-white/10 text-[10px] font-mono text-zinc-300 backdrop-blur-md pointer-events-none">
            {currentIndex + 1} / {images.length}
          </div>
        )}
      </div>

      {/* أزرار الأسهم وشريط التحكم السفلي إذا كان المشروع يحتوي أكثر من صورة */}
      {images.length > 1 && (
        <>
          <button
            onClick={handlePrev}
            aria-label="Previous view"
            className="absolute left-2 top-1/2 -translate-y-1/2 p-1.5 rounded-lg bg-black/70 border border-white/10 text-white opacity-0 group-hover/viewer:opacity-100 hover:bg-accent-cyan hover:text-black transition-all"
          >
            <ChevronLeft size={16} />
          </button>
          <button
            onClick={handleNext}
            aria-label="Next view"
            className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 rounded-lg bg-black/70 border border-white/10 text-white opacity-0 group-hover/viewer:opacity-100 hover:bg-accent-cyan hover:text-black transition-all"
          >
            <ChevronRight size={16} />
          </button>

          {/* شريط نقاط التنقل السريع */}
          <div className="flex items-center justify-center gap-1.5 py-2 bg-surface/90 border-t border-white/5">
            {images.map((_, idx) => (
              <button
                key={idx}
                onClick={(e) => {
                  e.stopPropagation();
                  sounds.playClickSnap();
                  setCurrentIndex(idx);
                }}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  idx === currentIndex
                    ? 'w-6 bg-accent-cyan'
                    : 'w-2 bg-zinc-700 hover:bg-zinc-500'
                }`}
                title={`Switch to screen ${idx + 1}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

// --- المكون الرئيسي لقسم المشاريع ---
export default function BentoGrid() {
  const [filter, setFilter] = useState('all');
  const [modalData, setModalData] = useState(null); // { images: [], index: 0 }

  const filteredProjects = portfolioData.projects.filter(project => {
    if (filter === 'enterprise') return project.tier === 'featured';
    if (filter === 'labs') return project.tier === 'lab';
    return true;
  });

  const openLightbox = (images, index) => {
    sounds.playClickSnap();
    setModalData({ images, index });
  };

  const nextLightboxImage = (e) => {
    e.stopPropagation();
    sounds.playClickSnap();
    setModalData(prev => ({
      ...prev,
      index: (prev.index + 1) % prev.images.length
    }));
  };

  const prevLightboxImage = (e) => {
    e.stopPropagation();
    sounds.playClickSnap();
    setModalData(prev => ({
      ...prev,
      index: prev.index === 0 ? prev.images.length - 1 : prev.index - 1
    }));
  };

  return (
    <section id="case-studies" className="py-20 max-w-5xl mx-auto px-4 relative">
      
      {/* رأس القسم وأزرار التصفية التفاعلية */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
        <div>
          <div className="flex items-center gap-2 text-accent-cyan text-xs font-mono mb-2">
            <Layers size={14} />
            <span>PORTFOLIO ARCHITECTURE</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Strategic Case Studies & Systems.
          </h2>
          <p className="text-zinc-400 text-sm mt-1">
            Enterprise analytics infrastructure, multi-site telemetry, and deployed applications.
          </p>
        </div>

        {/* أزرار الفلترة */}
        <div className="flex items-center gap-1.5 p-1 rounded-xl bg-card border border-border self-start">
          {[
            { id: 'all', label: 'All Architectures' },
            { id: 'enterprise', label: 'Enterprise Core' },
            { id: 'labs', label: 'Domain Labs' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => {
                sounds.playClickSnap();
                setFilter(tab.id);
              }}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
                filter === tab.id 
                  ? 'bg-zinc-800 text-white shadow' 
                  : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* شبكة البنتو جرد المتجاوبة */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {filteredProjects.map((project) => (
          <motion.div
            layout
            key={project.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            onMouseEnter={() => sounds.playHoverTick()}
            className={`glass-card rounded-2xl p-6 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 ${
              project.featured ? 'md:col-span-12 lg:col-span-6' : 'md:col-span-6 lg:col-span-4'
            }`}
          >
            <div>
              {/* شارات الحالة وروابط الـ GitHub / Live App */}
              <div className="flex items-center justify-between gap-2 mb-3">
                <span className="px-2.5 py-1 rounded-md text-[11px] font-mono font-medium bg-zinc-800/80 text-accent-cyan border border-white/5">
                  {project.badge}
                </span>

                <div className="flex items-center gap-2.5">
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noreferrer"
                      onClick={() => sounds.playClickSnap()}
                      className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-accent-emerald/10 border border-accent-emerald/30 text-xs font-semibold text-accent-emerald hover:bg-accent-emerald/20 transition-all"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-accent-emerald animate-pulse"></span>
                      <span>Live App</span>
                      <ArrowUpRight size={13} />
                    </a>
                  )}
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noreferrer"
                      onClick={() => sounds.playClickSnap()}
                      className="text-zinc-400 hover:text-white transition-colors p-1"
                      title="Source Code Repository"
                    >
                      <GithubIcon size={16} />
                    </a>
                  )}
                </div>
              </div>

              {/* العنوان والوصف التنفيذي */}
              <h3 className="text-lg font-bold text-white mb-2 leading-snug">
                {project.title}
              </h3>
              <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed">
                {project.summary}
              </p>

              {/* مسرح الداشبورد التفاعلي بدلاً من المصغرات المضغوطة */}
              <DashboardStage 
                images={project.images} 
                title={project.title} 
                onExpand={openLightbox} 
              />
            </div>

            {/* الأثر التنفيذي وتقنيات المشروع */}
            <div className="border-t border-white/5 pt-4 mt-2">
              <p className="text-xs text-zinc-300 font-medium mb-3 flex items-start gap-1.5">
                <Activity size={14} className="text-accent-emerald shrink-0 mt-0.5" />
                <span><strong className="text-accent-emerald">Executive Impact:</strong> {project.impact}</span>
              </p>
              <div className="flex flex-wrap gap-1.5">
                {project.techStack.map((tech, i) => (
                  <span key={i} className="text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-900 text-zinc-400 border border-white/5">
                    {tech}
                  </span>
                ))}
              </div>
            </div>

          </motion.div>
        ))}
      </div>

      {/* نافذة التكبير السينمائية الكاملة (Full Modal Lightbox مع إمكانية التنقل) */}
      <AnimatePresence>
        {modalData && (
          <div 
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md"
            onClick={() => setModalData(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-6xl w-full bg-surface border border-white/15 rounded-2xl overflow-hidden shadow-2xl p-2 flex flex-col"
            >
              {/* زر الإغلاق وعداد الصور العلوي */}
              <div className="flex items-center justify-between px-3 py-2 border-b border-white/10 mb-2">
                <span className="text-xs font-mono text-zinc-400">
                  Dashboard Screen {modalData.index + 1} of {modalData.images.length}
                </span>
                <button
                  onClick={() => {
                    sounds.playClickSnap();
                    setModalData(null);
                  }}
                  className="p-1.5 rounded-lg bg-zinc-800 text-zinc-300 hover:text-white transition-colors"
                >
                  <X size={18} />
                </button>
              </div>

              {/* حاوية الصورة المكبرة مع أسهم التنقل */}
              <div className="relative flex items-center justify-center bg-black/60 rounded-xl overflow-hidden min-h-[50vh]">
                <img 
                  src={modalData.images[modalData.index]} 
                  alt="Enlarged Dashboard View" 
                  className="w-full h-auto max-h-[75vh] object-contain mx-auto" 
                />

                {modalData.images.length > 1 && (
                  <>
                    <button
                      onClick={prevLightboxImage}
                      className="absolute left-3 p-2 rounded-xl bg-black/70 border border-white/10 text-white hover:bg-accent-cyan hover:text-black transition-all"
                    >
                      <ChevronLeft size={22} />
                    </button>
                    <button
                      onClick={nextLightboxImage}
                      className="absolute right-3 p-2 rounded-xl bg-black/70 border border-white/10 text-white hover:bg-accent-cyan hover:text-black transition-all"
                    >
                      <ChevronRight size={22} />
                    </button>
                  </>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </section>
  );
}