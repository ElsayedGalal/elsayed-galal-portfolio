import React from 'react';
import ParticleIntro from './components/ParticleIntro';
import NetworkBackground from './components/NetworkBackground';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import MetricsStrip from './components/MetricsStrip';
import BentoGrid from './components/BentoGrid';
import Credentials from './components/Credentials';
import Footer from './components/Footer';

export default function App() {
  const scrollToContent = () => {
    const section = document.getElementById('portfolio-content');
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-canvas text-zinc-100 selection:bg-accent-cyan selection:text-black relative">
      
      {/* 1. شاشة البداية الجزيئية */}
      <ParticleIntro onScrollDown={scrollToContent} />

      {/* 2. خلفية الكرات الفضية والشبكة (z-0 ثابتة فوق الخلفية السوداء مباشرة) */}
      <NetworkBackground />

      {/* 3. محتوى البورتفوليو (يعلو الخلفية بـ z-10 لضمان ظهور الكرات خلف الكروت الشفافة) */}
      <div id="portfolio-content" className="relative z-10 overflow-x-hidden">
        <Navbar />
        <main>
          <Hero />
          <MetricsStrip />
          <BentoGrid />
          <Credentials />
        </main>
        <Footer />
      </div>

    </div>
  );
}