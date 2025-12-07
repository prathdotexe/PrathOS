import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, SkipBack, SkipForward, Volume2, Upload } from 'lucide-react';

const DEFAULT_TRACK = "public/Papletwali.mp3";

const MusicPlayer: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [trackUrl, setTrackUrl] = useState(DEFAULT_TRACK);
  const [trackName, setTrackName] = useState("Papletwali - feat. Chintamani");
  const [volume, setVolume] = useState(1);
  const [isHovered, setIsHovered] = useState(false);

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
    }
  };

  return (
    <div
      className="fixed top-14 right-4 sm:right-8 w-[320px] bg-[#F2F0E9] border-x-[3px] border-b-[3px] border-t-0 border-black rounded-b-xl rounded-t-none shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] z-40 flex flex-col p-5 transition-all duration-300 font-body will-change-transform overflow-hidden hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:translate-y-1"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
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
        
        @keyframes ripple {
          0% { box-shadow: 0 0 0 0 rgba(204, 255, 0, 0.7); }
          70% { box-shadow: 0 0 0 10px rgba(204, 255, 0, 0); }
          100% { box-shadow: 0 0 0 0 rgba(204, 255, 0, 0); }
        }

        .vinyl-spin {
            animation: spin 3s linear infinite;
        }
        
        .play-ripple {
            animation: ripple 2s infinite;
        }

        /* Smooth transition for the tonearm */
        .ease-elastic {
            transition-timing-function: cubic-bezier(0.68, -0.55, 0.265, 1.55);
        }
      `}</style>

      <audio ref={audioRef} src={trackUrl} loop />

      <div className="flex gap-5 relative mb-2 mt-4">

        <div className="relative w-24 h-24 shrink-0 group cursor-pointer" onClick={() => setIsPlaying(!isPlaying)}>
          <div className="w-full h-full rounded-full bg-[#1a1a1a] border-2 border-black shadow-lg flex items-center justify-center relative overflow-hidden transition-transform active:scale-95 duration-200">

            <div className={`absolute inset-0 w-full h-full rounded-full ${isPlaying ? 'vinyl-spin' : ''}`} style={{ animationPlayState: isPlaying ? 'running' : 'paused' }}>

              <div className="absolute inset-0 rounded-full opacity-30"
                style={{
                  background: 'repeating-radial-gradient(#333 0, #333 2px, transparent 3px, transparent 4px)'
                }}
              />

              <div className="absolute inset-0 rounded-full opacity-20"
                style={{
                  background: 'conic-gradient(from 0deg, transparent 0deg, rgba(255,255,255,0.8) 60deg, transparent 100deg, transparent 200deg, rgba(255,255,255,0.8) 260deg, transparent 360deg)'
                }}
              />

              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-[#FF5F56] border-4 border-[#1a1a1a] flex items-center justify-center z-20 shadow-sm">
                <div className="w-1.5 h-1.5 bg-black rounded-full opacity-80" />
              </div>
            </div>

            <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-white/10 to-transparent pointer-events-none z-30" />
          </div>
        </div>

        <div className="flex-1 flex flex-col justify-center py-1 min-w-0 z-10">
          <div className="relative overflow-hidden h-8 mask-fade-right mb-2">
            <div className={`font-heading font-black text-xl whitespace-nowrap ${isPlaying && trackName.length > 15 ? 'animate-scrolling w-max' : ''}`}>
              {trackName}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full ${isPlaying ? 'bg-[#27C93F] animate-pulse' : 'bg-red-400'}`}></div>
            <span className={`text-[10px] font-bold uppercase tracking-wider ${isPlaying ? 'text-black' : 'text-gray-400'}`}>
              {isPlaying ? 'Playing' : 'Paused'}
            </span>
          </div>
        </div>

        <div
          className={`absolute -top-6 left-[84px] w-6 h-32 origin-[12px_12px] transition-transform duration-700 ease-elastic z-20 pointer-events-none filter drop-shadow-md`}
          style={{ transform: isPlaying ? 'rotate(25deg)' : 'rotate(0deg)' }}
        >
          <div className="w-6 h-6 rounded-full bg-gradient-to-b from-gray-200 to-gray-400 border-2 border-black absolute top-0 left-0 z-10 grid place-items-center">
            <div className="w-2 h-2 bg-black rounded-full" />
          </div>

          <div className="w-2 h-24 bg-[#d4d4d4] border-x border-black absolute top-3 left-2" />

          <div className="w-5 h-8 bg-black rounded-sm border-2 border-gray-700 absolute bottom-0 left-0.5" />
        </div>
      </div>

      <div className="mt-4 pt-4 border-t-2 border-black/10 flex items-center justify-between relative z-10">
        <div className="flex items-center gap-3">
          <button
            onClick={() => (audioRef.current!.currentTime -= 10)}
            className="p-2 hover:bg-black/5 rounded-lg active:scale-90 transition-transform"
            title="Rewind 10s"
          >
            <SkipBack size={20} fill="currentColor" className="text-black" />
          </button>

          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className={`w-12 h-12 flex items-center justify-center rounded-xl border-2 border-black transition-all duration-300 relative group overflow-hidden
                ${isPlaying
                ? 'bg-[#CCFF00] shadow-[inset_0_2px_4px_rgba(0,0,0,0.1)]'
                : 'bg-black text-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]'
              } active:translate-y-[2px] active:shadow-none`}
          >

            <div className="relative z-10 transition-transform duration-300 group-active:scale-90">
              {isPlaying ? (
                <Pause size={22} fill="currentColor" className="text-black" />
              ) : (
                <Play size={22} fill="currentColor" className="ml-1" />
              )}
            </div>
          </button>

          <button
            onClick={() => (audioRef.current!.currentTime += 10)}
            className="p-2 hover:bg-black/5 rounded-lg active:scale-90 transition-transform"
            title="Skip 10s"
          >
            <SkipForward size={20} fill="currentColor" className="text-black" />
          </button>
        </div>

        <div className="flex items-center gap-2 bg-white/50 p-2 rounded-lg border border-black/5 group hover:bg-white transition-colors">
          <Volume2 size={16} className={`text-gray-500 transition-colors ${isHovered ? 'text-black' : ''}`} />
          <input
            type="range"
            min="0"
            max="1"
            step="0.05"
            value={volume}
            onChange={(e) => setVolume(parseFloat(e.target.value))}
            className="w-16 h-1 bg-gray-300 rounded-lg appearance-none cursor-pointer accent-black hover:accent-[#CCFF00]"
          />
        </div>
      </div>

      <div
        className="absolute top-5 right-5 opacity-30 hover:opacity-100 transition-opacity cursor-pointer z-20 hover:scale-110 duration-200"
        onClick={() => fileInputRef.current?.click()}
        title="Upload MP3"
      >
        <Upload size={18} />
      </div>
      <input type="file" ref={fileInputRef} accept="audio/*" onChange={handleFileUpload} className="hidden" />

    </div>
  );
};

export default MusicPlayer;