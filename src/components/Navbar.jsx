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

        {/* روابط التنقل السريع */}
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

        {/* زر تفعيل/كتم المؤثرات الصوتية */}
        <div className="flex items-center gap-3">
          <button
            onClick={handleAudioToggle}
            className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-surface border border-border text-zinc-400 hover:text-white text-xs font-mono transition-all"
            title="Toggle Micro-Audio"
          >
            {isMuted ? <VolumeX size={14} className="text-red-400" /> : <Volume2 size={14} className="text-accent-cyan" />}
            <span className="hidden sm:inline">{isMuted ? 'Muted' : 'Audio On'}</span>
          </button>
        </div>

      </nav>
    </header>
  );
}