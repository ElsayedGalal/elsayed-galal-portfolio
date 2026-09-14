import React, { useEffect, useRef } from 'react';

export default function NetworkBackground() {
  const canvasRef = useRef(null);

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
        this.radius = (Math.random() * 5 + 3.8) * this.z;
        this.vx = (Math.random() - 0.5) * 0.35;
        this.vy = (Math.random() - 0.5) * 0.35;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x < -40) this.x = width + 40;
        if (this.x > width + 40) this.x = -40;
        if (this.y < -40) this.y = height + 40;
        if (this.y > height + 40) this.y = -40;

        const dx = (mouse.targetX - width / 2) * 0.02 * this.z;
        const dy = (mouse.targetY - height / 2) * 0.02 * this.z;
        this.renderX = this.x + dx;
        this.renderY = this.y + dy;
      }

      draw(context) {
        const rx = this.renderX;
        const ry = this.renderY;
        const r = this.radius;

        const gradient = context.createRadialGradient(
          rx - r * 0.35,
          ry - r * 0.35,
          r * 0.08,
          rx,
          ry,
          r
        );

        gradient.addColorStop(0, '#FFFFFF');
        gradient.addColorStop(0.3, '#E2E8F0');
        gradient.addColorStop(0.7, '#475569');
        gradient.addColorStop(1, '#0F172A');

        context.beginPath();
        context.arc(rx, ry, r, 0, Math.PI * 2);
        context.fillStyle = gradient;
        context.shadowColor = 'rgba(255, 255, 255, 0.2)';
        context.shadowBlur = r * 1.5;
        context.fill();
        context.shadowBlur = 0;
      }
    }

    const nodes = Array.from({ length: nodeCount }, () => new MetallicNode());

    const render = () => {
      ctx.clearRect(0, 0, width, height);

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
            ctx.lineWidth = 1.1 * Math.min(nodes[i].z, nodes[j].z);
            ctx.stroke();
          }
        }
      }

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
    <div className="fixed inset-0 pointer-events-none z-0">
      <canvas ref={canvasRef} className="block w-full h-full" />
    </div>
  );
}