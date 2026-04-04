import React from 'react';
import { User, Rocket, Zap, Send, Terminal, Palette, Award, ShieldCheck, Trophy, Briefcase, RotateCcw, LayoutGrid } from 'lucide-react';
import { WindowType } from '../types';
import { DOCK_ITEMS_ORDER, WINDOW_CATEGORIES } from '../constants';

interface DockProps {
  onToggle: (id: WindowType) => void;
  activeWindows: WindowType[];
  minimizedWindows: WindowType[];
  onResetLayout: () => void;
  onOpenAll: () => void;
}

const ICON_MAP: Record<WindowType, React.ElementType> = {
  [WindowType.ABOUT]: User,
  [WindowType.PROJECTS]: Rocket,
  [WindowType.EXPERIENCE]: Briefcase,
  [WindowType.SKILLS]: Zap,
  [WindowType.CERTIFICATIONS]: ShieldCheck,
  [WindowType.ACHIEVEMENTS]: Trophy,
  [WindowType.CONTACT]: Send,
  [WindowType.TERMINAL]: Terminal,
  [WindowType.MUSIC]: Award,
  [WindowType.PAINT]: Palette,
  [WindowType.GUESTBOOK]: Award,
};

const DockItem: React.FC<{
  icon: React.ElementType;
  label: string;
  onClick: () => void;
  isActive: boolean;
  isMinimized: boolean;
}> = ({ icon: Icon, label, onClick, isActive, isMinimized }) => (
  <div className="relative group flex items-center justify-start">
    {/* Tooltip Label */}
    <div className="absolute left-full pl-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200 pointer-events-none z-50 flex items-center">
      <span className="bg-black text-[#CCFF00] text-xs font-bold px-3 py-1.5 rounded-lg border-2 border-black shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] whitespace-nowrap">
        {label}
      </span>
    </div>

    {/* Active Indicator Bar */}
    {isActive && !isMinimized && (
      <div className="absolute -right-3 top-1/2 -translate-y-1/2 w-1.5 h-6 bg-black rounded-full" />
    )}
    {/* Minimized Indicator Dot */}
    {isMinimized && (
      <div className="absolute -right-2 top-1/2 -translate-y-1/2 w-2 h-2 bg-[#FFBD2E] rounded-full border border-black" />
    )}

    {/* Dock Button */}
    <button
      onClick={onClick}
      className={`relative flex items-center justify-center w-11 h-11 rounded-xl border-[3px] border-black transition-all duration-150 ease-out z-10
      hover:-translate-y-1 hover:translate-x-0.5 active:translate-y-0 active:translate-x-0 active:shadow-none
      ${
        isActive
          ? 'bg-black text-[#CCFF00] shadow-[4px_4px_0px_0px_rgba(204,255,0,1)] hover:shadow-[5px_5px_0px_0px_rgba(204,255,0,1)]'
          : 'bg-white text-black hover:bg-[#CCFF00] shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[5px_5px_0px_0px_rgba(0,0,0,1)]'
      }`}
      aria-label={`${isActive ? 'Hide' : 'Show'} ${label}`}
    >
      <Icon size={20} strokeWidth={2.5} />
    </button>
  </div>
);

const Dock: React.FC<DockProps> = ({ onToggle, activeWindows, minimizedWindows, onResetLayout, onOpenAll }) => {
  const coreItems = DOCK_ITEMS_ORDER.filter(item => WINDOW_CATEGORIES[item.id] === 'core');
  const playgroundItems = DOCK_ITEMS_ORDER.filter(item => WINDOW_CATEGORIES[item.id] === 'playground');

  return (
    <div className="desktop-dock fixed left-4 sm:left-5 top-1/2 -translate-y-1/2 flex flex-col gap-2 z-40 pointer-events-none">
      <div className="pointer-events-auto flex flex-col gap-2.5 p-2">
        {/* Core Section Label */}
        <div className="text-[8px] font-black uppercase tracking-[0.2em] text-gray-400 text-center mb-0.5 select-none">Work</div>

        {coreItems.map(item => (
          <DockItem
            key={item.id}
            icon={ICON_MAP[item.id]}
            label={item.label}
            isActive={activeWindows.includes(item.id)}
            isMinimized={minimizedWindows.includes(item.id)}
            onClick={() => onToggle(item.id)}
          />
        ))}

        {/* Divider */}
        <div className="h-[2px] w-8 bg-black/10 mx-auto rounded-full my-1" />

        {/* Playground Section Label */}
        <div className="text-[8px] font-black uppercase tracking-[0.2em] text-gray-400 text-center mb-0.5 select-none">Lab</div>

        {playgroundItems.map(item => (
          <DockItem
            key={item.id}
            icon={ICON_MAP[item.id]}
            label={item.label}
            isActive={activeWindows.includes(item.id)}
            isMinimized={minimizedWindows.includes(item.id)}
            onClick={() => onToggle(item.id)}
          />
        ))}

        {/* Divider */}
        <div className="h-[2px] w-8 bg-black/10 mx-auto rounded-full my-1" />

        {/* Actions */}
        <div className="relative group flex items-center justify-start">
          <div className="absolute left-full pl-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200 pointer-events-none z-50 flex items-center">
            <span className="bg-black text-[#CCFF00] text-xs font-bold px-3 py-1.5 rounded-lg border-2 border-black whitespace-nowrap">Open All</span>
          </div>
          <button
            onClick={onOpenAll}
            className="flex items-center justify-center w-11 h-11 rounded-xl border-[3px] border-black bg-[#6EE7B7] text-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 hover:shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] active:translate-y-0 active:shadow-none transition-all"
            aria-label="Open all important windows"
          >
            <LayoutGrid size={18} strokeWidth={2.5} />
          </button>
        </div>

        <div className="relative group flex items-center justify-start">
          <div className="absolute left-full pl-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200 pointer-events-none z-50 flex items-center">
            <span className="bg-black text-[#CCFF00] text-xs font-bold px-3 py-1.5 rounded-lg border-2 border-black whitespace-nowrap">Reset Layout</span>
          </div>
          <button
            onClick={onResetLayout}
            className="flex items-center justify-center w-11 h-11 rounded-xl border-[3px] border-black bg-white text-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 hover:shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] hover:bg-[#FCA5A5] active:translate-y-0 active:shadow-none transition-all"
            aria-label="Reset window layout"
          >
            <RotateCcw size={18} strokeWidth={2.5} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dock;