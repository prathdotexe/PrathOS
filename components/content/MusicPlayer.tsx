import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, SkipBack, SkipForward, Volume2, Upload, Music, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const DEFAULT_TRACK = "/Papletwali.mp3";

// Small helper: listens for 'toggle-music' events from MenuBar
const ToggleListener: React.FC<{ onToggle: () => void }> = ({ onToggle }) => {
  useEffect(() => {
    const handler = () => onToggle();
    window.addEventListener('toggle-music', handler);
    return () => window.removeEventListener('toggle-music', handler);
  }, [onToggle]);
  return null;
};
const MusicPlayer: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [trackUrl, setTrackUrl] = useState(DEFAULT_TRACK);
  const [trackName, setTrackName] = useState("Papletwali - feat. Chintamani");
  const [volume, setVolume] = useState(1);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
      if (isPlaying) {
        audioRef.current.play().catch(e => console.log("Playback failed", e));
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying, trackUrl, volume]);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const objectUrl = URL.createObjectURL(file);
      setTrackUrl(objectUrl);
      setTrackName(file.name.replace(/\.[^/.]+$/, ""));
      setIsPlaying(true);
      setIsExpanded(true);
    }
  };

  return (
    <>
      <audio ref={audioRef} src={trackUrl} loop />

      <style>{`
        @keyframes scroll-text {
          0% { transform: translateX(0); }
          100% { transform: translateX(-100%); }
        }
        .animate-scrolling {
          animation: scroll-text 8s linear infinite;
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .vinyl-spin {
          animation: spin 3s linear infinite;
        }
        .ease-elastic {
          transition-timing-function: cubic-bezier(0.68, -0.55, 0.265, 1.55);
        }
        @media (prefers-reduced-motion: reduce) {
          .vinyl-spin, .animate-scrolling { animation: none; }
        }
      `}</style>

      {/* Toggle listener — MenuBar dispatches 'toggle-music' event */}
      <ToggleListener onToggle={() => setIsExpanded(e => !e)} />

      {/* Expanded Player Panel */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
            className="fixed top-14 right-4 sm:right-8 w-[320px] bg-[#F2F0E9] border-x-[3px] border-b-[3px] border-t-0 border-black rounded-b-xl rounded-t-none shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] z-40 flex flex-col p-5 font-body will-change-transform overflow-hidden"
            role="region"
            aria-label="Music Player"
          >
            {/* Close button */}
            <button
              onClick={() => setIsExpanded(false)}
              className="absolute top-3 right-3 p-1 rounded-lg hover:bg-black/5 transition-colors z-30"
              aria-label="Hide player"
            >
              <X size={14} className="text-gray-400 hover:text-black" />
            </button>

            <div className="flex gap-5 relative mb-2 mt-2">
              {/* Vinyl */}
              <div
                className="relative w-20 h-20 shrink-0 group cursor-pointer"
                onClick={() => setIsPlaying(!isPlaying)}
                role="button"
                aria-label={isPlaying ? 'Pause music' : 'Play music'}
              >
                <div className="w-full h-full rounded-full bg-[#1a1a1a] border-2 border-black shadow-lg flex items-center justify-center relative overflow-hidden transition-transform active:scale-95 duration-200">
                  <div className={`absolute inset-0 w-full h-full rounded-full ${isPlaying ? 'vinyl-spin' : ''}`} style={{ animationPlayState: isPlaying ? 'running' : 'paused' }}>
                    <div className="absolute inset-0 rounded-full opacity-30"
                      style={{ background: 'repeating-radial-gradient(#333 0, #333 2px, transparent 3px, transparent 4px)' }}
                    />
                    <div className="absolute inset-0 rounded-full opacity-20"
                      style={{ background: 'conic-gradient(from 0deg, transparent 0deg, rgba(255,255,255,0.8) 60deg, transparent 100deg, transparent 200deg, rgba(255,255,255,0.8) 260deg, transparent 360deg)' }}
                    />
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-[#FF5F56] border-4 border-[#1a1a1a] flex items-center justify-center z-20 shadow-sm">
                      <div className="w-1.5 h-1.5 bg-black rounded-full opacity-80" />
                    </div>
                  </div>
                  <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-white/10 to-transparent pointer-events-none z-30" />
                </div>
              </div>

              {/* Track info */}
              <div className="flex-1 flex flex-col justify-center py-1 min-w-0 z-10">
                <div className="relative overflow-hidden h-7 mb-1">
                  <div className={`font-heading font-black text-lg whitespace-nowrap ${isPlaying && trackName.length > 15 ? 'animate-scrolling w-max' : ''}`}>
                    {trackName}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full ${isPlaying ? 'bg-[#27C93F] animate-pulse' : 'bg-red-400'}`} />
                  <span className={`text-[10px] font-bold uppercase tracking-wider ${isPlaying ? 'text-black' : 'text-gray-400'}`}>
                    {isPlaying ? 'Playing' : 'Paused'}
                  </span>
                </div>
              </div>

              {/* Tonearm */}
              <div
                className="absolute -top-4 left-[72px] w-5 h-28 origin-[10px_10px] transition-transform duration-700 ease-elastic z-20 pointer-events-none filter drop-shadow-md"
                style={{ transform: isPlaying ? 'rotate(25deg)' : 'rotate(0deg)' }}
              >
                <div className="w-5 h-5 rounded-full bg-gradient-to-b from-gray-200 to-gray-400 border-2 border-black absolute top-0 left-0 z-10 grid place-items-center">
                  <div className="w-1.5 h-1.5 bg-black rounded-full" />
                </div>
                <div className="w-1.5 h-20 bg-[#d4d4d4] border-x border-black absolute top-3 left-[7px]" />
                <div className="w-4 h-7 bg-black rounded-sm border-2 border-gray-700 absolute bottom-0 left-0.5" />
              </div>
            </div>

            {/* Controls */}
            <div className="mt-3 pt-3 border-t-2 border-black/10 flex items-center justify-between relative z-10">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => { if (audioRef.current) audioRef.current.currentTime -= 10; }}
                  className="p-1.5 hover:bg-black/5 rounded-lg active:scale-90 transition-transform"
                  aria-label="Rewind 10 seconds"
                >
                  <SkipBack size={18} fill="currentColor" className="text-black" />
                </button>

                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className={`w-10 h-10 flex items-center justify-center rounded-xl border-2 border-black transition-all duration-300 relative group overflow-hidden
                    ${isPlaying
                      ? 'bg-[#CCFF00] shadow-[inset_0_2px_4px_rgba(0,0,0,0.1)]'
                      : 'bg-black text-white shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-0.5'
                    } active:translate-y-[1px] active:shadow-none`}
                  aria-label={isPlaying ? 'Pause' : 'Play'}
                >
                  <div className="relative z-10 transition-transform duration-300 group-active:scale-90">
                    {isPlaying ? (
                      <Pause size={18} fill="currentColor" className="text-black" />
                    ) : (
                      <Play size={18} fill="currentColor" className="ml-0.5" />
                    )}
                  </div>
                </button>

                <button
                  onClick={() => { if (audioRef.current) audioRef.current.currentTime += 10; }}
                  className="p-1.5 hover:bg-black/5 rounded-lg active:scale-90 transition-transform"
                  aria-label="Skip 10 seconds"
                >
                  <SkipForward size={18} fill="currentColor" className="text-black" />
                </button>
              </div>

              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1.5 bg-white/50 p-1.5 rounded-lg border border-black/5">
                  <Volume2 size={14} className="text-gray-500" />
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.05"
                    value={volume}
                    onChange={(e) => setVolume(parseFloat(e.target.value))}
                    className="w-14 h-1 bg-gray-300 rounded-lg appearance-none cursor-pointer accent-black"
                    aria-label="Volume"
                  />
                </div>

                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="p-1.5 hover:bg-black/5 rounded-lg transition-colors"
                  aria-label="Upload custom track"
                >
                  <Upload size={14} className="text-gray-400 hover:text-black transition-colors" />
                </button>
              </div>
            </div>

            <input type="file" ref={fileInputRef} accept="audio/*" onChange={handleFileUpload} className="hidden" />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default MusicPlayer;