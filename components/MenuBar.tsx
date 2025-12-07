import React, { useState, useEffect } from 'react';
import { Terminal } from 'lucide-react';

const MenuBar: React.FC = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="fixed top-0 left-0 right-0 h-14 bg-white/80 backdrop-blur-md border-b-[3px] border-black flex items-center justify-between px-4 sm:px-6 z-50 select-none">
      <div className="flex items-center gap-3">
        <div className="group flex items-center gap-2 font-heading font-black text-xs sm:text-sm tracking-tighter bg-black text-white px-2.5 py-1.5 border-2 border-black rounded-lg shadow-[2px_2px_0px_0px_rgba(204,255,0,1)] hover:-translate-y-0.5 hover:shadow-[3px_3px_0px_0px_rgba(204,255,0,1)] transition-all cursor-pointer">
            <Terminal size={12} className="text-[#CCFF00]" strokeWidth={3} />
            <span>prath<span className="text-[#CCFF00]">.exe</span></span>
        </div>
      </div>
      
      <div className="flex items-center">
         <div className="font-heading font-bold text-xs sm:text-sm hidden sm:block tracking-[0.2em] uppercase text-black">
            prathdotexe studios
         </div>
      </div>
      
      <div className="flex items-center gap-4">
         <div className="flex items-center gap-3 text-black">
            <span className="font-heading font-bold text-xs uppercase tracking-wider text-gray-600 hidden sm:block">
                {formatDate(time)}
            </span>
            <span className="w-[1px] h-4 bg-gray-300 hidden sm:block"></span>
            <span className="font-mono font-bold text-sm min-w-[5ch] text-right">
                {formatTime(time)}
            </span>
         </div>
      </div>
    </div>
  );
};

export default MenuBar;