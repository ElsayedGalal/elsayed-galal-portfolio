import React, { useState } from 'react';
import { portfolioData } from '../data/portfolioData';
import { sounds } from '../utils/sound';
import { Volume2, VolumeX, FileDown, Layers } from 'lucide-react';

export default function Navbar() {
  const { personal } = portfolioData;
  const [isAudioOn, setIsAudioOn] = useState(sounds.enabled);

  const handleToggleSound = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const newState = sounds.toggleSound();
    setIsAudioOn(newState);
  };

  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-md bg-canvas/80 border-b border-white/5 transition-all">
      <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
        
        {/* الهوية الشخصية والحالة */}
        <div className="flex items-center gap-3">
          <a
            href="#"
            onClick={() => sounds.playClickSnap()}
            className="flex items-center gap-2 text-white font-bold text-sm tracking-tight hover:text-accent-cyan transition-colors"
          >
            <Layers size={18} className="text-accent-cyan" />
            <span>{personal.name}</span>
          </a>
          <span className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-mono bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>Available</span>
          </span>
        </div>

        {/* روابط التنقل السريع */}
        <nav className="hidden md:flex items-center gap-6 text-xs font-medium text-zinc-400">
          <a 
            href="#case-studies" 
            onMouseEnter={() => sounds.playHoverTick()}
            onClick={() => sounds.playClickSnap()}
            className="hover:text-white transition-colors"
          >
            Architecture
          </a>
          <a 
            href="#credentials" 
            onMouseEnter={() => sounds.playHoverTick()}
            onClick={() => sounds.playClickSnap()}
            className="hover:text-white transition-colors"
          >
            Credentials
          </a>
          <a 
            href="#contact" 
            onMouseEnter={() => sounds.playHoverTick()}
            onClick={() => sounds.playClickSnap()}
            className="hover:text-white transition-colors"
          >
            Contact
          </a>
        </nav>

        {/* أدوات التحكم: زر كتم/تشغيل الصوت وزر تحميل الـ CV */}
        <div className="flex items-center gap-2.5">
          
          {/* زر الصوت التفاعلي المباشر */}
          <button
            type="button"
            onClick={handleToggleSound}
            aria-label={isAudioOn ? "Mute interactive audio" : "Enable interactive audio"}
            title={isAudioOn ? "Audio: Active (Click to mute)" : "Audio: Muted (Click to enable)"}
            className={`p-2 rounded-xl border transition-all cursor-pointer flex items-center gap-1.5 text-xs font-mono ${
              isAudioOn 
                ? 'bg-zinc-900/90 border-accent-cyan/40 text-accent-cyan hover:border-accent-cyan shadow-sm shadow-accent-cyan/10' 
                : 'bg-zinc-900/40 border-white/5 text-zinc-500 hover:text-zinc-300 hover:border-white/20'
            }`}
          >
            {isAudioOn ? (
              <>
                <Volume2 size={15} />
                <span className="hidden sm:inline text-[10px]">SFX ON</span>
              </>
            ) : (
              <>
                <VolumeX size={15} />
                <span className="hidden sm:inline text-[10px]">MUTED</span>
              </>
            )}
          </button>

          {/* زر تحميل السيرة الذاتية */}
          <a
            href={personal.socials.cvPath}
            download
            onClick={() => sounds.playClickSnap()}
            onMouseEnter={() => sounds.playHoverTick()}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-accent-cyan/10 border border-accent-cyan/30 text-accent-cyan hover:bg-accent-cyan hover:text-black transition-all text-xs font-semibold"
          >
            <FileDown size={14} />
            <span>CV</span>
          </a>

        </div>

      </div>
    </header>
  );
}