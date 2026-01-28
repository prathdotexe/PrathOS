import React, { useState, useCallback, useEffect } from 'react';
import { User, Briefcase, Rocket, Zap, Send, Terminal, Palette, MessageSquare, Award, ShieldCheck, Trophy } from 'lucide-react';
import { WindowType, WindowState } from '../types';
import { INITIAL_POSITIONS, WINDOW_THEMES } from '../constants';
import MenuBar from './MenuBar';
import Dock from './Dock';
import Window from './Window';
import Background from './Background';
import AboutMe from './content/AboutMe';
import Projects from './content/Projects';
import Experience from './content/Experience';
import Certifications from './content/Certifications';
import Achievements from './content/Achievements';
import Skills from './content/Skills';
import Contact from './content/Contact';
import TerminalApp from './content/Terminal';
import MusicPlayer from './content/MusicPlayer';
import Paint from './content/Paint';
import Guestbook from './content/GuestBook';
import ToastContainer, { Toast } from './ToastContainer';

const Desktop: React.FC = () => {
  const [activeWindows, setActiveWindows] = useState<WindowState[]>([
    { 
        id: WindowType.ABOUT, 
        isOpen: true, 
        zIndex: 10, 
        position: INITIAL_POSITIONS[WindowType.ABOUT] 
    }
  ]);
  const [highestZ, setHighestZ] = useState(10);
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [isHackerMode, setIsHackerMode] = useState(false);

  const addToast = useCallback((message: string, type: 'success' | 'error' | 'info' = 'info') => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
        setToasts(prev => prev.filter(t => t.id !== id));
    }, 3000);
  }, []);

  useEffect(() => {
    const handleShowToast = (e: CustomEvent<{ message: string; type: 'success' | 'error' | 'info' }>) => {
        addToast(e.detail.message, e.detail.type);
    };
    window.addEventListener('show-toast' as any, handleShowToast as any);
    return () => window.removeEventListener('show-toast' as any, handleShowToast as any);
  }, [addToast]);

  useEffect(() => {
    const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
    let cursor = 0;

    const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === konamiCode[cursor]) {
            cursor++;
            if (cursor === konamiCode.length) {
                setIsHackerMode(prev => !prev);
                addToast(isHackerMode ? "Hacker Mode Deactivated" : "HACKER MODE ACTIVATED", "success");
                cursor = 0;
            }
        } else {
            cursor = 0;
        }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [addToast, isHackerMode]);

  const bringToFront = useCallback((id: WindowType) => {
    setHighestZ(prev => {
        const newZ = prev + 1;
        setActiveWindows(windows => 
            windows.map(w => w.id === id ? { ...w, zIndex: newZ } : w)
        );
        return newZ;
    });
  }, []);

  const toggleWindow = useCallback((id: WindowType) => {
    setActiveWindows(prev => {
      const targetWindow = prev.find(w => w.id === id);
      const isCurrentlyOpen = targetWindow?.isOpen;

      if (isCurrentlyOpen) {
        return prev.map(w => w.id === id ? { ...w, isOpen: false } : w);
      } else {
        let newWindows = [...prev];
        const openWindows = newWindows.filter(w => w.isOpen);

        if (openWindows.length >= 4 && id !== WindowType.GUESTBOOK) {
            const sortedByZ = [...openWindows].sort((a, b) => a.zIndex - b.zIndex);
            const toClose = sortedByZ[0]; 
            newWindows = newWindows.map(w => w.id === toClose.id ? { ...w, isOpen: false } : w);
        }

        setHighestZ(h => h + 1);
        const exists = newWindows.find(w => w.id === id);
        
        if (exists) {
            return newWindows.map(w => w.id === id ? { ...w, isOpen: true, zIndex: highestZ + 1 } : w);
        } else {
             return [...newWindows, { 
                id, 
                isOpen: true, 
                zIndex: highestZ + 1, 
                position: INITIAL_POSITIONS[id] 
            }];
        }
      }
    });
  }, [highestZ]);

  const closeWindow = useCallback((id: WindowType) => {
    setActiveWindows(prev => prev.map(w => w.id === id ? { ...w, isOpen: false } : w));
  }, []);

  const updateWindowPosition = useCallback((id: WindowType, pos: { x: number; y: number }) => {
    setActiveWindows(prev => prev.map(w => w.id === id ? { ...w, position: pos } : w));
  }, []);

  const renderWindowContent = (id: WindowType) => {
    switch (id) {
      case WindowType.ABOUT: return <AboutMe />;
      case WindowType.PROJECTS: return <Projects />;
      case WindowType.EXPERIENCE: return <Experience />;
      case WindowType.CERTIFICATIONS: return <Certifications />;
      case WindowType.ACHIEVEMENTS: return <Achievements />;
      case WindowType.SKILLS: return <Skills />;
      case WindowType.CONTACT: return <Contact />;
      case WindowType.TERMINAL: return <TerminalApp />;
      case WindowType.PAINT: return <Paint />;
      case WindowType.GUESTBOOK: return <Guestbook />;
      default: return null;
    }
  };

  const getWindowConfig = (id: WindowType): { title: string; icon: React.ElementType; theme: { headerColor: string; textColor: string }; width?: string } => {
    switch (id) {
      case WindowType.ABOUT: 
        return { title: 'About Me', icon: User, theme: WINDOW_THEMES[WindowType.ABOUT] };
      case WindowType.PROJECTS: 
        return { title: 'Projects', icon: Rocket, theme: WINDOW_THEMES[WindowType.PROJECTS] };
      case WindowType.EXPERIENCE: 
        return { title: 'Experience', icon: Briefcase, theme: WINDOW_THEMES[WindowType.EXPERIENCE] };
      case WindowType.CERTIFICATIONS: 
        return { title: 'Certifications', icon: ShieldCheck, theme: WINDOW_THEMES[WindowType.CERTIFICATIONS] };
      case WindowType.ACHIEVEMENTS: 
        return { title: 'Achievements', icon: Trophy, theme: WINDOW_THEMES[WindowType.ACHIEVEMENTS] };
      case WindowType.SKILLS: 
        return { title: 'Skills', icon: Zap, theme: WINDOW_THEMES[WindowType.SKILLS] };
      case WindowType.CONTACT: 
        return { title: 'Contact', icon: Send, theme: WINDOW_THEMES[WindowType.CONTACT] };
      case WindowType.TERMINAL: 
        return { title: 'Terminal', icon: Terminal, theme: WINDOW_THEMES[WindowType.TERMINAL] };
      case WindowType.PAINT: 
        return { title: 'Pixel Studio', icon: Palette, theme: WINDOW_THEMES[WindowType.PAINT] };
      case WindowType.GUESTBOOK: 
        return { title: 'Feedback Hub', icon: MessageSquare, theme: WINDOW_THEMES[WindowType.GUESTBOOK], width: 'w-[320px]' };
      default: 
        return { title: 'Window', icon: User, theme: { headerColor: 'bg-gray-200', textColor: 'text-black' } };
    }
  };

  const currentMaxZ = Math.max(...activeWindows.filter(w => w.isOpen).map(w => w.zIndex), 0);

  return (
    <div className={`relative w-screen h-screen overflow-hidden font-body selection:bg-black selection:text-white bg-[#F0F0F0] ${isHackerMode ? 'invert hue-rotate-180' : ''} transition-all duration-700`}>
      <style>{`
        @keyframes wiggle {
          0%, 100% { transform: rotate(0deg); }
          25% { transform: rotate(-8deg); }
          75% { transform: rotate(8deg); }
        }
        .animate-wiggle { animation: wiggle 0.5s ease-in-out infinite; }
      `}</style>

      <Background />
      <MenuBar />
      <MusicPlayer />
      <ToastContainer toasts={toasts} />
      
      <Dock 
        onToggle={toggleWindow} 
        activeWindows={activeWindows.filter(w => w.isOpen).map(w => w.id)} 
      />

      {/* Suggestion FAB */}
      <div className="fixed bottom-6 right-6 z-[60] flex flex-col items-end gap-3 group">
         <div className="bg-black text-[#FFD60A] text-[10px] font-black uppercase px-3 py-1.5 rounded-lg border-2 border-black opacity-0 group-hover:opacity-100 transition-opacity translate-x-2 group-hover:translate-x-0">
            Leave a Suggestion
         </div>
         <button 
            onClick={() => toggleWindow(WindowType.GUESTBOOK)}
            className="w-14 h-14 bg-[#FFD60A] border-[3px] border-black rounded-full flex items-center justify-center shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all active:scale-95 group-hover:animate-wiggle"
         >
            <MessageSquare size={24} strokeWidth={2.5} />
         </button>
      </div>

      <div className="absolute top-14 left-0 right-0 bottom-0 pointer-events-none">
        {activeWindows.map(win => {
            const config = getWindowConfig(win.id);
            const isActive = win.zIndex === currentMaxZ;

            return (
                <div key={win.id} className="pointer-events-auto">
                    <Window
                        id={win.id}
                        title={config.title}
                        isOpen={win.isOpen}
                        zIndex={win.zIndex}
                        onClose={closeWindow}
                        onFocus={bringToFront}
                        onPositionChange={updateWindowPosition}
                        initialPosition={win.position}
                        icon={config.icon}
                        headerColor={`${config.theme.headerColor} ${config.theme.textColor}`}
                        isDark={false}
                        width={config.width}
                        isActive={isActive}
                    >
                        {renderWindowContent(win.id)}
                    </Window>
                </div>
            );
        })}
      </div>
    </div>
  );
};

export default Desktop;