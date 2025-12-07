import React from 'react';

const BLOCK_SIZE = 24; // Matches the background grid size

const Background: React.FC = () => {
  return (
    <div className="fixed inset-0 z-0 overflow-hidden bg-[#F0F0F0] pointer-events-none select-none">

      <style>{`
        @keyframes blob-bounce {
          0% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0, 0) scale(1); }
        }
        @keyframes blob-bounce-slow {
          0% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(-30px, 40px) scale(1.2); }
          100% { transform: translate(0, 0) scale(1); }
        }
        .animate-blob { 
          animation: blob-bounce 10s infinite ease-in-out alternate; 
        }
        .animate-blob-slow { 
          animation: blob-bounce-slow 15s infinite ease-in-out alternate; 
        }
      `}</style>

      <div className="absolute inset-0 opacity-40 blur-[80px] saturate-150">
        <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-[#C4B5FD] rounded-full mix-blend-multiply filter blur-3xl animate-blob" />
        <div className="absolute top-[-10%] right-[-10%] w-[50vw] h-[50vw] bg-[#FCA5A5] rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000" />
        <div className="absolute bottom-[-20%] left-[20%] w-[50vw] h-[50vw] bg-[#FCD34D] rounded-full mix-blend-multiply filter blur-3xl animate-blob-slow animation-delay-4000" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40vw] h-[40vw] bg-[#6EE7B7] rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000" />
      </div>

      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute inset-0 opacity-[0.18] backdrop-blur-xl"
          style={{
            background:
              "linear-gradient(135deg, rgba(255,255,255,0.25), rgba(255,255,255,0.05))"
          }}
        />
      </div>

      <div className="absolute inset-0 pointer-events-none mix-blend-screen opacity-[0.15]">

        <div
          className="absolute top-0 left-[-20%] w-[80vw] h-[200vh] rotate-45"
          style={{
            background:
              "linear-gradient(to bottom, rgba(255,255,255,0.35), transparent)"
          }}
        />

        <div
          className="absolute bottom-0 right-[-20%] w-[80vw] h-[200vh] -rotate-45"
          style={{
            background:
              "linear-gradient(to top, rgba(255,255,255,0.25), transparent)"
          }}
        />
      </div>

      <div
        className="absolute inset-0 opacity-[0.15]"
        style={{
          backgroundImage: 'radial-gradient(#000000 1.5px, transparent 1.5px)',
          backgroundSize: `${BLOCK_SIZE}px ${BLOCK_SIZE}px`
        }}
      />

      <div
        className="absolute inset-0 opacity-20 mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.6' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='1'/%3E%3C/svg%3E")`,
        }}
      />

    </div>
  );
};

export default Background;