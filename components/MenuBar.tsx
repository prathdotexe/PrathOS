import React, { useState, useEffect } from 'react';
import { Terminal, Moon, Sun, Eye, Music } from 'lucide-react';

interface MenuBarProps {
  isDark: boolean;
  onToggleDark: () => void;
}

const MenuBar: React.FC<MenuBarProps> = ({ isDark, onToggleDark }) => {
  const [time, setTime] = useState(new Date());
  const [visitorCount, setVisitorCount] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Visitor counter (localStorage-based)
  useEffect(() => {
    const key = 'prath-visitor-count';
    const stored = parseInt(localStorage.getItem(key) || '0');
    // Only increment once per session
    const sessionKey = 'prath-session-counted';
    if (!sessionStorage.getItem(sessionKey)) {
      const newCount = stored + 1;
      localStorage.setItem(key, newCount.toString());
      sessionStorage.setItem(sessionKey, 'true');
      setVisitorCount(newCount);
    } else {
      setVisitorCount(stored);
    }
  }, []);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 h-14 backdrop-blur-md border-b-[3px] flex items-center justify-between px-4 sm:px-6 z-50 select-none transition-colors duration-300
        ${isDark
          ? 'bg-[#1a1a1a]/90 border-white/20 text-white'
          : 'bg-white/80 border-black text-black'
        }`}
      role="banner"
    >
      <div className="flex items-center gap-3">
        <div className={`group flex items-center gap-2 font-heading font-black text-xs sm:text-sm tracking-tighter px-2.5 py-1.5 border-2 rounded-lg transition-all cursor-pointer
          ${isDark
            ? 'bg-white text-black border-white shadow-[2px_2px_0px_0px_rgba(204,255,0,1)] hover:-translate-y-0.5 hover:shadow-[3px_3px_0px_0px_rgba(204,255,0,1)]'
            : 'bg-black text-white border-black shadow-[2px_2px_0px_0px_rgba(204,255,0,1)] hover:-translate-y-0.5 hover:shadow-[3px_3px_0px_0px_rgba(204,255,0,1)]'
          }`}>
          <Terminal size={12} className="text-[#CCFF00]" strokeWidth={3} />
          <span>prath<span className="text-[#CCFF00]">.exe</span></span>
        </div>
        {/* Availability Indicator */}
        <div className={`hidden sm:flex items-center gap-2 px-3 py-1 rounded-full ${isDark ? 'bg-[#065F46]/30 border border-[#6EE7B7]/30' : 'bg-[#F0FFF4] border border-[#6EE7B7]'}`}>
          <div className="w-2 h-2 bg-[#27C93F] rounded-full animate-pulse" />
          <span className={`font-body font-bold text-[10px] uppercase tracking-wider ${isDark ? 'text-[#6EE7B7]' : 'text-[#065F46]'}`}>
            Open to opportunities
          </span>
        </div>
      </div>

      <div className="flex items-center">
        <div className={`font-heading font-bold text-xs sm:text-sm hidden md:block tracking-[0.15em] uppercase ${isDark ? 'text-white/60' : 'text-black'}`}>
          prathdotexe studios
        </div>
      </div>

      <div className="flex items-center gap-2 sm:gap-3">
        {/* Music Toggle */}
        <button
          onClick={() => window.dispatchEvent(new Event('toggle-music'))}
          className={`p-2 rounded-lg border-2 transition-all hover:-translate-y-0.5 active:translate-y-0
            ${isDark
              ? 'border-white/20 bg-white/10 text-white/60 shadow-[2px_2px_0px_0px_rgba(255,255,255,0.2)]'
              : 'border-black/10 bg-black/[0.02] text-gray-500 shadow-[2px_2px_0px_0px_rgba(0,0,0,0.1)]'
            }`}
          aria-label="Toggle music player"
        >
          <Music size={14} />
        </button>

        {/* Visitor Counter */}
        {visitorCount > 0 && (
          <div className={`hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-lg border ${isDark ? 'border-white/10 bg-white/5' : 'border-black/5 bg-black/[0.02]'}`}>
            <Eye size={11} className={isDark ? 'text-white/40' : 'text-gray-400'} />
            <span className={`font-mono text-[10px] font-bold ${isDark ? 'text-white/50' : 'text-gray-400'}`}>
              #{(4700 + visitorCount).toLocaleString()}
            </span>
          </div>
        )}

        {/* Dark Mode Toggle */}
        <button
          onClick={onToggleDark}
          className={`p-2 rounded-lg border-2 transition-all hover:-translate-y-0.5 active:translate-y-0
            ${isDark
              ? 'border-white/20 bg-white/10 text-[#FFD60A] shadow-[2px_2px_0px_0px_rgba(255,255,255,0.2)] hover:shadow-[3px_3px_0px_0px_rgba(255,255,255,0.2)]'
              : 'border-black/10 bg-black/[0.02] text-gray-600 shadow-[2px_2px_0px_0px_rgba(0,0,0,0.1)] hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,0.1)]'
            }`}
          aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
        >
          {isDark ? <Sun size={14} /> : <Moon size={14} />}
        </button>

        {/* Time */}
        <div className="flex items-center gap-3">
          <span className={`font-heading font-bold text-xs uppercase tracking-wider hidden sm:block ${isDark ? 'text-white/40' : 'text-gray-500'}`}>
            {formatDate(time)}
          </span>
          <span className={`w-[1px] h-4 hidden sm:block ${isDark ? 'bg-white/10' : 'bg-gray-300'}`} />
          <span className={`font-mono font-bold text-sm min-w-[5ch] text-right ${isDark ? 'text-white' : 'text-black'}`}>
            {formatTime(time)}
          </span>
        </div>
      </div>
    </header>
  );
};

export default MenuBar;