import React, { useState } from 'react';
import { sounds } from '../utils/sound';
import { Volume2, VolumeX, Terminal } from 'lucide-react';

export default function Navbar() {
  const [isMuted, setIsMuted] = useState(false);

  const handleAudioToggle = () => {
    const state = sounds.toggleMute();
    setIsMuted(state);
    if (!state) sounds.playClickSnap();
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex justify-center p-4">
      <nav className="flex items-center justify-between w-full max-w-5xl px-5 py-3 rounded-2xl bg-zinc-900/70 border border-white/10 backdrop-blur-xl shadow-2xl">
        
        {/* الهوية البرمجية */}
        <a 
          href="#" 
          onMouseEnter={() => sounds.playHoverTick()}
          className="flex items-center gap-2 text-white font-mono font-bold text-sm tracking-tight"
        >
          <div className="w-8 h-8 rounded-lg bg-surface border border-white/10 flex items-center justify-center text-accent-cyan">
            <Terminal size={16} />
          </div>
          <span>EG<span className="text-accent-cyan">.data</span></span>
        </a>

        {/* روابط التنقل السريع الفعالة */}
        <div className="hidden md:flex items-center gap-6 text-xs font-medium text-zinc-400">
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
        </div>

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

      </nav>
    </header>
  );
}