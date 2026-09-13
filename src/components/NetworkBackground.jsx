import React, { useEffect, useRef, useState } from 'react';

export default function NetworkBackground() {
  const canvasRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  // استخدام IntersectionObserver لاكتشاف النزول لمحتوى البورتفوليو بدقة
  useEffect(() => {
    const target = document.getElementById('portfolio-content');
    if (!target) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.05 }
    );

    observer.observe(target);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const mouse = { 
      x: width / 2, 
      y: height / 2, 
      targetX: width / 2, 
      targetY: height / 2 
    };

    const handleMouseMove = (e) => {
      mouse.targetX = e.clientX;
      mouse.targetY = e.clientY;
    };
    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    // كثافة وعدد العقد المعدنية
    const nodeCount = width < 768 ? 32 : 65;
    const maxConnectionDistance = 150;

    class MetallicNode {
      constructor() {
        this.reset(true);
      }

      reset(init = false) {
        this.x = Math.random() * width;
        this.y = init ? Math.random() * height : (Math.random() > 0.5 ? -20 : height + 20);
        this.z = Math.random() * 0.8 + 0.4;
        this.radius = (Math.random() * 5 + 4) * this.z;
        this.vx = (Math.random() - 0.5) * 0.4;
        this.vy = (Math.random() - 0.5) * 0.4;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x < -40) this.x = width + 40;
        if (this.x > width + 40) this.x = -40;
        if (this.y < -40) this.y = height + 40;
        if (this.y > height + 40) this.y = -40;

        // حركة تفاعلية هادئة مع الفأرة
        const dx = (mouse.targetX - width / 2) * 0.02 * this.z;
        const dy = (mouse.targetY - height / 2) * 0.02 * this.z;
        this.renderX = this.x + dx;
        this.renderY = this.y + dy;
      }

      draw(context) {
        const rx = this.renderX;
        const ry = this.renderY;
        const r = this.radius;

        // تدرج لوني يعكس لمعان الكروم الفضي ثلاثي الأبعاد
        const gradient = context.createRadialGradient(
          rx - r * 0.35,
          ry - r * 0.35,
          r * 0.08,
          rx,
          ry,
          r
        );

        gradient.addColorStop(0, '#FFFFFF');        // نقطة الضوء العاكسة
        gradient.addColorStop(0.3, '#E2E8F0');     // فضي لامع
        gradient.addColorStop(0.7, '#475569');     // ظل معدني رمادي
        gradient.addColorStop(1, '#0F172A');       // حافة الظل الداكنة

        context.beginPath();
        context.arc(rx, ry, r, 0, Math.PI * 2);
        context.fillStyle = gradient;
        context.shadowColor = 'rgba(255, 255, 255, 0.25)';
        context.shadowBlur = r * 1.8;
        context.fill();
        context.shadowBlur = 0;
      }
    }

    const nodes = Array.from({ length: nodeCount }, () => new MetallicNode());

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // رسم أسلاك وشبكات الترابط بين الكرات
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].renderX - nodes[j].renderX;
          const dy = nodes[i].renderY - nodes[j].renderY;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < maxConnectionDistance) {
            const alpha = (1 - dist / maxConnectionDistance) * 0.35 * Math.min(nodes[i].z, nodes[j].z);
            ctx.beginPath();
            ctx.moveTo(nodes[i].renderX, nodes[i].renderY);
            ctx.lineTo(nodes[j].renderX, nodes[j].renderY);
            ctx.strokeStyle = `rgba(226, 232, 240, ${alpha})`;
            ctx.lineWidth = 1.2 * Math.min(nodes[i].z, nodes[j].z);
            ctx.stroke();
          }
        }
      }

      // رسم الكرات الفضية
      for (let i = 0; i < nodes.length; i++) {
        nodes[i].update();
        nodes[i].draw(ctx);
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div
      className={`fixed inset-0 pointer-events-none z-0 transition-opacity duration-700 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
    >
      <canvas ref={canvasRef} className="block w-full h-full" />
    </div>
  );
}