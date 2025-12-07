import React, { useState, useCallback, useEffect } from 'react';
import { User, Briefcase, Rocket, Zap, Send, Terminal, Palette } from 'lucide-react';
import { WindowType, WindowState } from '../types';
import { INITIAL_POSITIONS, WINDOW_THEMES } from '../constants';
import MenuBar from './MenuBar';
import Dock from './Dock';
import Window from './Window';
import Background from './Background';
import AboutMe from './content/AboutMe';
import Projects from './content/Projects';
import Experience from './content/Experience';
import Skills from './content/Skills';
import Contact from './content/Contact';
import TerminalApp from './content/Terminal';
import MusicPlayer from './content/MusicPlayer';
import Paint from './content/Paint';
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

  // --- Toast Logic ---
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

  // --- Konami Code Easter Egg ---
  useEffect(() => {
    const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
    let cursor = 0;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === konamiCode[cursor]) {
        cursor++;
        if (cursor === konamiCode.length) {
          setIsHackerMode(prev => !prev);
          addToast(isHackerMode ? "HACKER MODE DEACTIVATED" : "HACKER MODE ACTIVATED", "success");
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

        if (openWindows.length >= 2) {
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
      case WindowType.SKILLS: return <Skills />;
      case WindowType.CONTACT: return <Contact />;
      case WindowType.TERMINAL: return <TerminalApp />;
      case WindowType.PAINT: return <Paint />;
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
      case WindowType.SKILLS:
        return { title: 'Skills', icon: Zap, theme: WINDOW_THEMES[WindowType.SKILLS] };
      case WindowType.CONTACT:
        return { title: 'Contact', icon: Send, theme: WINDOW_THEMES[WindowType.CONTACT] };
      case WindowType.TERMINAL:
        return { title: 'Terminal', icon: Terminal, theme: WINDOW_THEMES[WindowType.TERMINAL] };
      case WindowType.PAINT:
        return { title: 'Pixel Studio', icon: Palette, theme: WINDOW_THEMES[WindowType.PAINT] };
      default:
        return { title: 'Window', icon: User, theme: { headerColor: 'bg-gray-200', textColor: 'text-black' } };
    }
  };

  const currentMaxZ = Math.max(...activeWindows.filter(w => w.isOpen).map(w => w.zIndex), 0);

  return (
    <div className={`relative w-screen h-screen overflow-hidden font-body selection:bg-black selection:text-white bg-[#F0F0F0] ${isHackerMode ? 'invert hue-rotate-180' : ''} transition-all duration-700`}>

      <Background />
      <MenuBar />
      <MusicPlayer />
      <ToastContainer toasts={toasts} />

      <Dock
        onToggle={toggleWindow}
        activeWindows={activeWindows.filter(w => w.isOpen).map(w => w.id)}
      />

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