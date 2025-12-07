import React, { useState, useRef } from 'react';
import { Eraser, Trash2, Download, Palette, Undo } from 'lucide-react';

const GRID_SIZE = 16;
const DEFAULT_COLOR = '#000000';

const COLORS = [
  '#000000', '#FFFFFF', '#FF5F56', '#FFBD2E', '#27C93F',
  '#29CDFF', '#C4B5FD', '#FF9F1C', '#FF6AD5', '#6EE7B7'
];

const Paint: React.FC = () => {
  const [grid, setGrid] = useState<string[]>(Array(GRID_SIZE * GRID_SIZE).fill('#FFFFFF'));
  const [selectedColor, setSelectedColor] = useState(DEFAULT_COLOR);
  const [isDrawing, setIsDrawing] = useState(false);
  const [history, setHistory] = useState<string[][]>([]);

  const handleDraw = (index: number) => {
    const newGrid = [...grid];
    if (newGrid[index] !== selectedColor) {
      if (history.length > 10) {
        setHistory([...history.slice(1), [...grid]]);
      } else {
        setHistory([...history, [...grid]]);
      }
      newGrid[index] = selectedColor;
      setGrid(newGrid);
    }
  };

  const handleMouseDown = (index: number) => {
    setIsDrawing(true);
    handleDraw(index);
  };

  const handleMouseEnter = (index: number) => {
    if (isDrawing) {
      handleDraw(index);
    }
  };

  const handleMouseUp = () => {
    setIsDrawing(false);
  };

  const clearGrid = () => {
    setHistory([...history, [...grid]]);
    setGrid(Array(GRID_SIZE * GRID_SIZE).fill('#FFFFFF'));
    window.dispatchEvent(new CustomEvent('show-toast', { detail: { message: 'Canvas cleared', type: 'info' } }));
  };

  const undo = () => {
    if (history.length > 0) {
      const previous = history[history.length - 1];
      setGrid(previous);
      setHistory(history.slice(0, -1));
    }
  };

  const downloadArt = () => {
    const canvas = document.createElement('canvas');
    const SCALE = 32;
    canvas.width = GRID_SIZE * SCALE;
    canvas.height = GRID_SIZE * SCALE;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    grid.forEach((color, i) => {
      const x = (i % GRID_SIZE) * SCALE;
      const y = Math.floor(i / GRID_SIZE) * SCALE;
      ctx.fillStyle = color;
      ctx.fillRect(x, y, SCALE, SCALE);
    });

    const link = document.createElement('a');
    link.download = `pixel-art-${Date.now()}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();

    window.dispatchEvent(new CustomEvent('show-toast', { detail: { message: 'Masterpiece saved to Downloads!', type: 'success' } }));
  };

  return (
    <div className="h-full flex flex-col bg-gray-50 dark:bg-zinc-900 overflow-hidden" onMouseUp={handleMouseUp} onMouseLeave={handleMouseUp}>
      <div className="p-4 bg-white dark:bg-black border-b-[3px] border-black dark:border-white flex flex-wrap items-center justify-between gap-4 shrink-0">

        <div className="flex gap-2 flex-wrap">
          {COLORS.map((color) => (
            <button
              key={color}
              onClick={() => setSelectedColor(color)}
              className={`w-6 h-6 rounded-md border-2 border-black/20 transition-transform hover:scale-110 ${selectedColor === color ? 'ring-2 ring-black dark:ring-white scale-110 z-10' : ''}`}
              style={{ backgroundColor: color }}
              aria-label={`Select color ${color}`}
            />
          ))}
          <div className="w-[1px] h-6 bg-black/10 dark:bg-white/10 mx-1"></div>
          <button
            onClick={() => setSelectedColor('#FFFFFF')}
            className={`p-1 rounded hover:bg-gray-200 dark:hover:bg-gray-700 ${selectedColor === '#FFFFFF' ? 'bg-gray-200 dark:bg-gray-700' : ''}`}
            title="Eraser"
          >
            <Eraser size={18} className="text-black dark:text-white" />
          </button>
        </div>

        <div className="flex gap-2">
          <button onClick={undo} disabled={history.length === 0} className="p-2 bg-gray-100 dark:bg-gray-800 rounded border-2 border-transparent hover:border-black dark:hover:border-white disabled:opacity-30 disabled:hover:border-transparent transition-all">
            <Undo size={16} className="text-black dark:text-white" />
          </button>
          <button onClick={clearGrid} className="p-2 bg-[#FF5F56] rounded border-2 border-black text-white hover:bg-red-600 transition-colors shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-y-0.5 active:shadow-none">
            <Trash2 size={16} />
          </button>
          <button onClick={downloadArt} className="p-2 bg-[#29CDFF] rounded border-2 border-black text-black hover:bg-blue-400 transition-colors shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-y-0.5 active:shadow-none">
            <Download size={16} />
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-auto flex items-center justify-center p-8 bg-[url('https://www.transparenttextures.com/patterns/graphy.png')]">
        <div
          className="grid gap-[1px] bg-gray-300 border-[3px] border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,0.2)]"
          style={{
            gridTemplateColumns: `repeat(${GRID_SIZE}, minmax(20px, 1fr))`,
            width: 'min(100%, 400px)',
            aspectRatio: '1/1'
          }}
        >
          {grid.map((color, i) => (
            <div
              key={i}
              onMouseDown={() => handleMouseDown(i)}
              onMouseEnter={() => handleMouseEnter(i)}
              className="w-full h-full bg-white cursor-crosshair hover:opacity-90 transition-opacity"
              style={{ backgroundColor: color }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Paint;