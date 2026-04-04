import React from 'react';

const Background: React.FC = () => {
  return (
    <div className="fixed inset-0 z-0 overflow-hidden bg-[#F0F0F0] pointer-events-none select-none" aria-hidden="true">

      <style>{`
        @keyframes blob-drift {
          0% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(20px, -30px) scale(1.05); }
          100% { transform: translate(0, 0) scale(1); }
        }
        @keyframes blob-drift-slow {
          0% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(-20px, 25px) scale(1.08); }
          100% { transform: translate(0, 0) scale(1); }
        }
        .animate-blob-drift {
          animation: blob-drift 20s infinite ease-in-out alternate;
        }
        .animate-blob-drift-slow {
          animation: blob-drift-slow 25s infinite ease-in-out alternate;
        }
        @media (prefers-reduced-motion: reduce) {
          .animate-blob-drift,
          .animate-blob-drift-slow {
            animation: none;
          }
        }
      `}</style>

      {/* Gradient Blobs */}
      <div className="absolute inset-0 opacity-35 blur-[80px] saturate-150">
        <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-[#C4B5FD] rounded-full mix-blend-multiply filter blur-3xl animate-blob-drift" />
        <div className="absolute top-[-10%] right-[-10%] w-[50vw] h-[50vw] bg-[#FCA5A5] rounded-full mix-blend-multiply filter blur-3xl animate-blob-drift-slow" />
        <div className="absolute bottom-[-20%] left-[20%] w-[50vw] h-[50vw] bg-[#FCD34D] rounded-full mix-blend-multiply filter blur-3xl animate-blob-drift" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40vw] h-[40vw] bg-[#6EE7B7] rounded-full mix-blend-multiply filter blur-3xl animate-blob-drift-slow" />
      </div>

      {/* Glass overlay */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute inset-0 opacity-[0.15]"
          style={{
            background: "linear-gradient(135deg, rgba(255,255,255,0.25), rgba(255,255,255,0.05))"
          }}
        />
      </div>

      {/* Light streaks */}
      <div className="absolute inset-0 pointer-events-none mix-blend-screen opacity-[0.12]">
        <div
          className="absolute top-0 left-[-20%] w-[80vw] h-[200vh] rotate-45"
          style={{ background: "linear-gradient(to bottom, rgba(255,255,255,0.35), transparent)" }}
        />
        <div
          className="absolute bottom-0 right-[-20%] w-[80vw] h-[200vh] -rotate-45"
          style={{ background: "linear-gradient(to top, rgba(255,255,255,0.25), transparent)" }}
        />
      </div>

      {/* Dot grid */}
      <div
        className="absolute inset-0 opacity-[0.12]"
        style={{
          backgroundImage: 'radial-gradient(#000000 1.5px, transparent 1.5px)',
          backgroundSize: '24px 24px'
        }}
      />

      {/* Noise texture */}
      <div
        className="absolute inset-0 opacity-[0.15] mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.6' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='1'/%3E%3C/svg%3E")`,
        }}
      />
    </div>
  );
};

export default Background;