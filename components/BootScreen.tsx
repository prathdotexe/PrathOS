import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const BOOT_LINES = [
  { text: '> PrathOS v1.0.0 starting...', delay: 0 },
  { text: '> Loading window manager...', delay: 300 },
  { text: '> Mounting components [■■■■■■■■■■]', delay: 600 },
  { text: '> Initializing skills database... OK', delay: 900 },
  { text: '> Connecting project repos... OK', delay: 1100 },
  { text: '> System ready.', delay: 1400 },
];

const BootScreen: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const [visibleLines, setVisibleLines] = useState(0);
  const [fadingOut, setFadingOut] = useState(false);

  useEffect(() => {
    const timers: NodeJS.Timeout[] = [];
    BOOT_LINES.forEach((line, i) => {
      timers.push(setTimeout(() => setVisibleLines(i + 1), line.delay));
    });

    // Start fade-out after last line
    timers.push(setTimeout(() => setFadingOut(true), 1800));
    // Complete boot
    timers.push(setTimeout(() => onComplete(), 2300));

    return () => timers.forEach(clearTimeout);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!fadingOut && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.02, filter: 'blur(8px)' }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-[300] bg-[#0a0a0a] flex items-center justify-center"
        >
          {/* CRT scanlines */}
          <div className="absolute inset-0 pointer-events-none opacity-10"
            style={{
              background: 'linear-gradient(rgba(18,16,16,0) 50%, rgba(0,0,0,0.25) 50%)',
              backgroundSize: '100% 4px',
            }}
          />

          <div className="max-w-lg w-full px-8 font-mono">
            {/* Logo */}
            <div className="text-[#CCFF00] text-xs mb-6 tracking-widest opacity-60">
              ╔═══════════════════╗<br />
              ║  PRATH.EXE  v1.0 ║<br />
              ╚═══════════════════╝
            </div>

            {/* Boot lines */}
            {BOOT_LINES.slice(0, visibleLines).map((line, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.15 }}
                className={`text-sm mb-1.5 ${i === visibleLines - 1 ? 'text-[#CCFF00]' : 'text-[#33ff00]/70'}`}
              >
                {line.text}
                {i === visibleLines - 1 && <span className="animate-pulse ml-1">█</span>}
              </motion.div>
            ))}

            {/* Progress bar */}
            <div className="mt-6 h-1 bg-[#333] rounded-full overflow-hidden">
              <motion.div
                initial={{ width: '0%' }}
                animate={{ width: `${(visibleLines / BOOT_LINES.length) * 100}%` }}
                transition={{ duration: 0.3 }}
                className="h-full bg-[#CCFF00] rounded-full"
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default BootScreen;
