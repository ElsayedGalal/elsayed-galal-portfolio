import React, { useState } from 'react';
import { portfolioData } from '../data/portfolioData';
import { sounds } from '../utils/sound';
import { Mail, Phone, Copy, Check, Terminal, ExternalLink } from 'lucide-react';

export default function Footer() {
  const { personal } = portfolioData;
  const [copiedItem, setCopiedItem] = useState(null);

  const copyToClipboard = (text, type) => {
    sounds.playClickSnap();
    navigator.clipboard.writeText(text);
    setCopiedItem(type);
    setTimeout(() => setCopiedItem(null), 2500);
  };

  return (
    <footer id="contact" className="border-t border-white/5 bg-zinc-950/80 pt-16 pb-12 mt-24 scroll-mt-20">
      <div className="max-w-5xl mx-auto px-4">
        
        {/* حاوية بطاقة الاتصال التنفيذية */}
        <div className="glass-card rounded-3xl p-8 mb-12 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-2 text-center md:text-left">
            <span className="text-[11px] font-mono px-2.5 py-1 rounded bg-accent-cyan/10 border border-accent-cyan/20 text-accent-cyan">
              DIRECT DISPATCH
            </span>
            <h3 className="text-2xl font-bold text-white tracking-tight pt-1">
              Let's Discuss Enterprise Architecture.
            </h3>
            <p className="text-zinc-400 text-xs sm:text-sm max-w-md">
              Available for high-impact Business Intelligence, Dimensional Modeling, and Strategic Analytics roles across Saudi Arabia and remote deployments.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
            {/* زر نسخ البريد الإلكتروني */}
            <button
              onClick={() => copyToClipboard(personal.email, 'email')}
              className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-surface border border-border hover:border-accent-cyan/40 text-xs font-mono text-zinc-300 flex items-center justify-center gap-2 transition-all hover:text-white"
            >
              <Mail size={14} className="text-accent-cyan" />
              <span>{personal.email}</span>
              {copiedItem === 'email' ? <Check size={14} className="text-accent-emerald" /> : <Copy size={13} className="text-zinc-500" />}
            </button>

            {/* زر نسخ رقم الهاتف */}
            <button
              onClick={() => copyToClipboard(personal.phone, 'phone')}
              className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-surface border border-border hover:border-accent-emerald/40 text-xs font-mono text-zinc-300 flex items-center justify-center gap-2 transition-all hover:text-white"
            >
              <Phone size={14} className="text-accent-emerald" />
              <span>{personal.phone}</span>
              {copiedItem === 'phone' ? <Check size={14} className="text-accent-emerald" /> : <Copy size={13} className="text-zinc-500" />}
            </button>
          </div>
        </div>

        {/* الشريط السفلي النهائي */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-zinc-400 pt-6 border-t border-white/5">
          <div className="flex items-center gap-2">
            <Terminal size={14} className="text-accent-cyan" />
            <span>{personal.name} © {new Date().getFullYear()}</span>
          </div>

          <div className="flex items-center gap-4">
            <a
              href={personal.socials.linkedin}
              target="_blank"
              rel="noreferrer"
              className="hover:text-white transition-colors flex items-center gap-1"
            >
              <span>LinkedIn</span>
              <ExternalLink size={12} />
            </a>
            <a
              href={personal.socials.github}
              target="_blank"
              rel="noreferrer"
              className="hover:text-white transition-colors flex items-center gap-1"
            >
              <span>GitHub</span>
              <ExternalLink size={12} />
            </a>
            <a
              href={personal.socials.cvPath}
              download
              className="hover:text-accent-cyan transition-colors"
            >
              Download CV
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
}