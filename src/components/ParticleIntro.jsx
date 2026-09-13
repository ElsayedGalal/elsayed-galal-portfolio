import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { sounds } from '../utils/sound';
import { ChevronDown, Sparkles } from 'lucide-react';

export default function ParticleIntro({ onScrollDown }) {
  const canvasRef = useRef(null);
  const [assembled, setAssembled] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    let animationFrameId;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // فئة إدارة حركة الجزيئات الفردية
    class Particle {
      constructor(destX, destY) {
        // البدء من موقع عشوائي تماماً (فوضى في الفضاء)
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.destX = destX;
        this.destY = destY;
        // سرعة ومرونة الحركة نحو الهدف
        this.vx = 0;
        this.vy = 0;
        this.accX = 0;
        this.accY = 0;
        this.friction = 0.91;
        this.ease = 0.012 + Math.random() * 0.008;
        this.size = Math.random() * 1.6 + 0.8;
        this.alpha = Math.random() * 0.5 + 0.5;
      }

      update() {
        this.accX = (this.destX - this.x) * this.ease;
        this.accY = (this.destY - this.y) * this.ease;
        this.vx = (this.vx + this.accX) * this.friction;
        this.vy = (this.vy + this.accY) * this.friction;
        this.x += this.vx;
        this.y += this.vy;
      }

      draw(context) {
        context.fillStyle = `rgba(255, 255, 255, ${this.alpha})`;
        context.fillRect(this.x, this.y, this.size, this.size);
      }
    }

    let particles = [];

    // استخراج إحداثيات رسم الحروف بدقة
    const initParticles = () => {
      particles = [];
      ctx.clearRect(0, 0, width, height);

      // ضبط حجم الخط متجاوباً مع عرض الشاشة
      const fontSize = Math.min(width / 9, 100);
      ctx.font = `900 ${fontSize}px 'Inter', sans-serif`;
      ctx.fillStyle = '#FFFFFF';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';

      const text = 'ELSAYED GALAL';
      ctx.fillText(text, width / 2, height / 2 - 30);

      // قراءة بكسلات الحروف من الشاشة
      const imgData = ctx.getImageData(0, 0, width, height).data;
      ctx.clearRect(0, 0, width, height);

      // كثافة سحب النقاط (خطوة كل 4 بكسل لسرعة وأداء فائقين)
      const step = width < 768 ? 4 : 3;

      for (let y = 0; y < height; y += step) {
        for (let x = 0; x < width; x += step) {
          const index = (y * width + x) * 4;
          if (imgData[index + 3] > 140) {
            particles.push(new Particle(x, y));
          }
        }
      }

      // إضافة 200 ذرة غبار محيطية في الخلفية لتعميق الإحساس بالفضاء
      for (let i = 0; i < 200; i++) {
        const p = new Particle(Math.random() * width, Math.random() * height);
        p.size = Math.random() * 1.2;
        p.alpha = Math.random() * 0.3;
        particles.push(p);
      }
    };

    initParticles();

    // حلقة التحريك المستمر
    const render = () => {
      ctx.clearRect(0, 0, width, height);
      for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw(ctx);
      }
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    // إشعار اكتمال التجمع لإظهار النصوص السفلية
    const timer = setTimeout(() => {
      setAssembled(true);
    }, 2800);

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      initParticles();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      clearTimeout(timer);
    };
  }, []);

  const handleScrollClick = () => {
    sounds.playClickSnap();
    if (onScrollDown) {
      onScrollDown();
    } else {
      const target = document.getElementById('portfolio-content');
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <section className="relative w-full h-screen bg-black overflow-hidden flex flex-col items-center justify-between select-none">
      
      {/* شبكة الكانفاس المسؤولة عن تحريك الذرات */}
      <canvas ref={canvasRef} className="absolute inset-0 z-0 block w-full h-full" />

      {/* مساحة علوية موازنة */}
      <div className="pt-12 z-10"></div>

      {/* النصوص والشارات السفلية المرافقة (تظهر بتلاشٍ ناعم مع اكتمال تشكل الاسم) */}
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: assembled ? 1 : 0, y: assembled ? 0 : 25 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="z-10 flex flex-col items-center gap-5 px-4 mb-16 text-center"
      >
        {/* شارة الهوية المؤسسية */}
        <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900/80 border border-white/10 text-[11px] font-mono text-zinc-300 backdrop-blur-md">
          <Sparkles size={12} className="text-accent-cyan animate-pulse" />
          <span>ENTERPRISE DATA ARCHITECT & BI SPECIALIST</span>
        </div>

        {/* المبدأ المعماري */}
        <p className="text-xs sm:text-sm font-mono tracking-widest text-zinc-400 uppercase max-w-md">
          Intelligence Organizing Chaos Into Structure
        </p>

        {/* زر النزول التفاعلي لاستعراض البورتفوليو */}
        <button
          onClick={handleScrollClick}
          onMouseEnter={() => sounds.playHoverTick()}
          className="mt-6 group flex flex-col items-center gap-2 text-zinc-400 hover:text-white transition-all cursor-pointer"
        >
          <span className="text-[11px] font-mono tracking-wider text-zinc-400 group-hover:text-accent-cyan transition-colors">
            SCROLL TO EXPLORE ARCHITECTURE
          </span>
          <div className="p-2 rounded-full border border-white/10 bg-zinc-900/60 group-hover:border-accent-cyan/50 group-hover:translate-y-1 transition-all">
            <ChevronDown size={16} className="text-zinc-400 group-hover:text-accent-cyan" />
          </div>
        </button>
      </motion.div>

    </section>
  );
}