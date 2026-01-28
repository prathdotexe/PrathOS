import React from 'react';
import { User, Rocket, Zap, Send, Terminal, Palette, Award, ShieldCheck, Trophy } from 'lucide-react';
import { WindowType } from '../types';

interface DockProps {
  onToggle: (id: WindowType) => void;
  activeWindows: WindowType[];
}

const DockItem: React.FC<{ 
  icon: React.ElementType, 
  label: string, 
  onClick: () => void,
  isActive: boolean 
}> = ({ icon: Icon, label, onClick, isActive }) => (
  <div className="relative group flex items-center justify-start">
    {/* Tooltip Label */}
    <div className="absolute left-full pl-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200 pointer-events-none z-50 flex items-center">
        <span className="bg-black text-[#CCFF00] text-xs font-bold px-3 py-1.5 rounded-lg border-2 border-black shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] whitespace-nowrap">
            {label}
        </span>
    </div>

    {/* Active Indicator Bar */}
    {isActive && (
       <div className="absolute -right-3 top-1/2 -translate-y-1/2 w-1.5 h-6 bg-black rounded-full" />
    )}

    {/* Dock Button */}
    <button
      onClick={onClick}
      className={`relative flex items-center justify-center w-11 h-11 sm:w-12 sm:h-12 rounded-xl border-[3px] border-black transition-all duration-150 ease-out z-10 
      hover:-translate-y-1.5 hover:translate-x-1 active:translate-y-0 active:translate-x-0 active:shadow-none
      ${
          isActive 
              ? 'bg-black text-[#CCFF00] shadow-[4px_4px_0px_0px_rgba(204,255,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(204,255,0,1)]' 
              : 'bg-white text-black hover:bg-[#CCFF00] shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]'
      }`}
    >
      <Icon size={22} strokeWidth={2.5} />
    </button>
  </div>
);

const Dock: React.FC<DockProps> = ({ onToggle, activeWindows }) => {
  const dockItems = [
    { id: WindowType.ABOUT, icon: User, label: 'About Me' },
    { id: WindowType.SKILLS, icon: Zap, label: 'Skills' },
    { id: WindowType.PROJECTS, icon: Rocket, label: 'Projects' },
    { id: WindowType.CERTIFICATIONS, icon: ShieldCheck, label: 'Certifications' },
    { id: WindowType.ACHIEVEMENTS, icon: Trophy, label: 'Achievements' },
    { id: WindowType.CONTACT, icon: Send, label: 'Contact' },
    // Tools
    { id: WindowType.TERMINAL, icon: Terminal, label: 'Terminal' },
    { id: WindowType.PAINT, icon: Palette, label: 'Pixel Studio' },
  ];

  return (
    <div className="fixed left-4 sm:left-6 top-1/2 -translate-y-1/2 flex flex-col gap-3 sm:gap-4 z-40 pointer-events-none">
      <div className="pointer-events-auto flex flex-col gap-4 p-2">
        {dockItems.map((item, index) => (
            <React.Fragment key={item.id}>
                 {/* Visual Divider before tools */}
                 {index === 6 && <div className="h-[2px] w-8 bg-black/10 mx-auto rounded-full" />}
                 
                 <DockItem
                    icon={item.icon}
                    label={item.label}
                    isActive={activeWindows.includes(item.id)}
                    onClick={() => onToggle(item.id)}
                />
            </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default Dock;