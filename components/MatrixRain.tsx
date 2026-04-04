import React, { useRef, useEffect, useState } from 'react';

const MatrixRain: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [opacity, setOpacity] = useState(1);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%^&*()_+-=[]{}|;:,.<>?/~`アイウエオカキクケコサシスセソ';
    const fontSize = 14;
    const columns = Math.floor(canvas.width / fontSize);
    const drops: number[] = Array(columns).fill(1);

    const draw = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = '#0F0';
      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        const text = chars.charAt(Math.floor(Math.random() * chars.length));

        // Brighter green for newest characters
        if (Math.random() > 0.5) {
          ctx.fillStyle = '#0F0';
        } else {
          ctx.fillStyle = '#0a0';
        }

        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    };

    const intervalId = setInterval(draw, 33);

    // Auto-dismiss after 5 seconds
    const fadeTimer = setTimeout(() => setOpacity(0), 4500);
    const endTimer = setTimeout(() => onComplete(), 5200);

    return () => {
      clearInterval(intervalId);
      clearTimeout(fadeTimer);
      clearTimeout(endTimer);
    };
  }, [onComplete]);

  return (
    <div
      className="fixed inset-0 z-[250] cursor-pointer"
      onClick={onComplete}
      style={{ opacity, transition: 'opacity 0.7s ease-out' }}
    >
      <canvas ref={canvasRef} className="w-full h-full" />
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-[#0F0] font-mono text-sm opacity-70 animate-pulse">
        Click anywhere to exit · Auto-closing in 5s
      </div>
    </div>
  );
};

export default MatrixRain;
