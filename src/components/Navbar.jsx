import React, { useState } from 'react';
import { portfolioData } from '../data/portfolioData';
import { sounds } from '../utils/sound';
import { Volume2, VolumeX, FileDown } from 'lucide-react';

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
        
        {/* الاسم الشخصي الهادئ */}
        <a
          href="#"
          onClick={() => sounds.playClickSnap()}
          className="text-white font-bold text-sm tracking-tight hover:text-accent-cyan transition-colors"
        >
          {personal.name}
        </a>

        {/* روابط التنقل الرئيسية */}
        <nav className="hidden md:flex items-center gap-7 text-xs font-medium text-zinc-400">
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

        {/* أدوات التحكم المينيمال */}
        <div className="flex items-center gap-3">
          
          {/* أيقونة الصوت الهادئة (أيقونة فقط بدون نصوص جانبية) */}
          <button
            type="button"
            onClick={handleToggleSound}
            aria-label={isAudioOn ? "Mute audio" : "Enable audio"}
            className={`p-2 rounded-lg border transition-all cursor-pointer ${
              isAudioOn 
                ? 'border-accent-cyan/30 text-accent-cyan bg-accent-cyan/5 hover:border-accent-cyan' 
                : 'border-white/10 text-zinc-500 hover:text-zinc-300 hover:border-white/20'
            }`}
          >
            {isAudioOn ? <Volume2 size={16} /> : <VolumeX size={16} />}
          </button>

          {/* زر السيرة الذاتية */}
          <a
            href={personal.socials.cvPath}
            download
            onClick={() => sounds.playClickSnap()}
            onMouseEnter={() => sounds.playHoverTick()}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-zinc-800/80 hover:bg-zinc-700/80 border border-white/10 text-white text-xs font-medium transition-all"
          >
            <FileDown size={14} className="text-accent-cyan" />
            <span>Executive CV</span>
          </a>

        </div>

      </div>
    </header>
  );
}