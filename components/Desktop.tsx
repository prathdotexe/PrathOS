import React, { useState, useCallback, useEffect, lazy, Suspense } from 'react';
import { User, Briefcase, Rocket, Zap, Send, Terminal, Palette, MessageSquare, Award, ShieldCheck, Trophy, RotateCcw, LayoutGrid, X, Keyboard, StickyNote, GripVertical } from 'lucide-react';
import { WindowType, WindowState } from '../types';
import { DEFAULT_POSITIONS, getInitialPositions, WINDOW_THEMES, WINDOW_CATEGORIES, IMPORTANT_WINDOWS, SNAP_GRID_SIZE } from '../constants';
import { motion, AnimatePresence } from 'framer-motion';
import MenuBar from './MenuBar';
import Dock from './Dock';
import Window from './Window';
import Background from './Background';

import ContextMenu from './ContextMenu';
import AboutMe from './content/AboutMe';
import Projects from './content/Projects';
import Experience from './content/Experience';
import Certifications from './content/Certifications';
import Achievements from './content/Achievements';
import Skills from './content/Skills';
import Contact from './content/Contact';
import TerminalApp from './content/Terminal';
import ToastContainer, { Toast } from './ToastContainer';

// Lazy-load playground + heavy components
const MusicPlayer = lazy(() => import('./content/MusicPlayer'));
const Paint = lazy(() => import('./content/Paint'));
const Guestbook = lazy(() => import('./content/GuestBook'));
const MatrixRain = lazy(() => import('./MatrixRain'));

const LazyFallback = () => (
  <div className="h-full flex items-center justify-center bg-white dark:bg-zinc-900">
    <div className="animate-pulse font-heading font-bold text-sm text-gray-400 uppercase tracking-wider">Loading...</div>
  </div>
);

// ─── Keyboard Shortcuts Overlay ───
const ShortcutsOverlay: React.FC<{ onClose: () => void }> = ({ onClose }) => (
  <div className="fixed inset-0 z-[250] flex items-center justify-center bg-black/60 backdrop-blur-sm" onClick={onClose}>
    <motion.div
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.9, opacity: 0 }}
      onClick={(e) => e.stopPropagation()}
      className="bg-white dark:bg-zinc-900 border-[3px] border-black dark:border-white rounded-2xl shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] max-w-md w-full mx-4 overflow-hidden"
    >
      <div className="bg-[#CCFF00] border-b-[3px] border-black px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Keyboard size={20} className="text-black" />
          <h2 className="font-heading font-black text-lg uppercase tracking-wider">Keyboard Shortcuts</h2>
        </div>
        <button onClick={onClose} className="p-1 hover:bg-black/10 rounded-lg transition-colors">
          <X size={18} />
        </button>
      </div>
      <div className="p-6 space-y-3 max-h-[60vh] overflow-y-auto custom-scrollbar">
        {[
          { keys: 'Esc', desc: 'Close top window' },
          { keys: '?', desc: 'Toggle this shortcuts panel' },
          { keys: 'Ctrl+Shift+D', desc: 'Toggle dark mode' },
          { keys: 'Ctrl+Shift+A', desc: 'Open all important windows' },
          { keys: 'Ctrl+Shift+R', desc: 'Reset window layout' },
          { keys: 'Right-Click', desc: 'Desktop context menu' },
          { keys: '↑ ↑ ↓ ↓ ← → ← → B A', desc: 'Hacker mode (Konami code)' },
        ].map(item => (
          <div key={item.keys} className="flex items-center justify-between py-2 border-b border-black/5 last:border-0">
            <span className="font-body text-sm font-medium text-gray-600 dark:text-gray-400">{item.desc}</span>
            <kbd className="bg-gray-100 dark:bg-zinc-800 border border-black/10 px-2.5 py-1 rounded-lg font-mono text-xs font-bold text-black dark:text-white shadow-sm whitespace-nowrap">{item.keys}</kbd>
          </div>
        ))}
        <div className="pt-3 mt-3 border-t-2 border-black/10">
          <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 text-center">
            Terminal: type 'help' for all commands · Try 'matrix' or 'neofetch'
          </p>
        </div>
      </div>
    </motion.div>
  </div>
);

// ─── Sticky Note ───
const StickyNoteWidget: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [text, setText] = useState(() => localStorage.getItem('prath-sticky') || 'Double-click to edit...');
  const [pos, setPos] = useState({ x: 600, y: 200 });
  const [dragging, setDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });

  useEffect(() => { localStorage.setItem('prath-sticky', text); }, [text]);

  const handleMouseDown = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).tagName === 'TEXTAREA') return;
    setDragging(true);
    setDragOffset({ x: e.clientX - pos.x, y: e.clientY - pos.y });
  };

  useEffect(() => {
    if (!dragging) return;
    const move = (e: MouseEvent) => setPos({ x: e.clientX - dragOffset.x, y: e.clientY - dragOffset.y });
    const up = () => setDragging(false);
    window.addEventListener('mousemove', move);
    window.addEventListener('mouseup', up);
    return () => { window.removeEventListener('mousemove', move); window.removeEventListener('mouseup', up); };
  }, [dragging, dragOffset]);

  return (
    <motion.div
      initial={{ scale: 0.8, opacity: 0, rotate: -5 }}
      animate={{ scale: 1, opacity: 1, rotate: 2 }}
      exit={{ scale: 0.8, opacity: 0, rotate: 5 }}
      className="fixed z-[45] w-[200px] select-none"
      style={{ top: pos.y, left: pos.x }}
      onMouseDown={handleMouseDown}
    >
      <div className="bg-[#FFD60A] border-[3px] border-black rounded-xl shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] overflow-hidden cursor-grab active:cursor-grabbing">
        <div className="flex items-center justify-between px-3 py-2 border-b-2 border-black/10">
          <div className="flex items-center gap-1.5">
            <GripVertical size={12} className="text-black/30" />
            <span className="font-heading font-black text-[9px] uppercase tracking-widest text-black/50">Note</span>
          </div>
          <button onClick={onClose} className="p-0.5 hover:bg-black/10 rounded transition-colors">
            <X size={12} className="text-black/40" />
          </button>
        </div>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="w-full h-[120px] bg-transparent p-3 text-sm font-body font-medium text-black/80 resize-none border-none outline-none placeholder-black/30"
          placeholder="Write a note..."
        />
      </div>
    </motion.div>
  );
};

// ─── Main Desktop ───
const Desktop: React.FC = () => {
  const [isMobile, setIsMobile] = useState(typeof window !== 'undefined' ? window.innerWidth < 768 : false);
  const [isDark, setIsDark] = useState(false);
  const [showShortcuts, setShowShortcuts] = useState(false);
  const [showSticky, setShowSticky] = useState(false);
  const [showMatrix, setShowMatrix] = useState(false);
  const [contextMenu, setContextMenu] = useState<{ x: number; y: number } | null>(null);

  const [activeWindows, setActiveWindows] = useState<WindowState[]>([
    {
      id: WindowType.ABOUT,
      isOpen: true,
      isMinimized: false,
      isMaximized: false,
      zIndex: 10,
      position: DEFAULT_POSITIONS[WindowType.ABOUT],
      category: 'core',
    }
  ]);
  const [highestZ, setHighestZ] = useState(10);
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [isHackerMode, setIsHackerMode] = useState(false);

  // Dark mode: toggle class on <html>
  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDark);
  }, [isDark]);

  // Responsive listener
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const addToast = useCallback((message: string, type: 'success' | 'error' | 'info' = 'info') => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), 3000);
  }, []);

  useEffect(() => {
    const handleShowToast = (e: CustomEvent<{ message: string; type: 'success' | 'error' | 'info' }>) => {
      addToast(e.detail.message, e.detail.type);
    };
    window.addEventListener('show-toast' as any, handleShowToast as any);
    return () => window.removeEventListener('show-toast' as any, handleShowToast as any);
  }, [addToast]);

  // Listen for open-window events from Terminal
  useEffect(() => {
    const handleOpenWindow = (e: CustomEvent<{ window: WindowType }>) => {
      toggleWindow(e.detail.window, true);
    };
    window.addEventListener('open-window' as any, handleOpenWindow as any);
    return () => window.removeEventListener('open-window' as any, handleOpenWindow as any);
  }, []);

  // Listen for matrix event from Terminal
  useEffect(() => {
    const handleMatrix = () => setShowMatrix(true);
    window.addEventListener('trigger-matrix' as any, handleMatrix);
    return () => window.removeEventListener('trigger-matrix' as any, handleMatrix);
  }, []);

  // Konami code
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

  // Global keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;
      const isInput = target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable;

      // ? key — toggle shortcuts (but not in inputs)
      if (e.key === '?' && !isInput) {
        e.preventDefault();
        setShowShortcuts(prev => !prev);
        return;
      }

      // Escape — close top window or overlay
      if (e.key === 'Escape') {
        if (showShortcuts) { setShowShortcuts(false); return; }
        if (showMatrix) { setShowMatrix(false); return; }
        if (contextMenu) { setContextMenu(null); return; }
        const openWins = activeWindows.filter(w => w.isOpen && !w.isMinimized);
        if (openWins.length > 0) {
          const topWindow = openWins.reduce((a, b) => a.zIndex > b.zIndex ? a : b);
          closeWindow(topWindow.id);
        }
        return;
      }

      // Ctrl+Shift combos
      if (e.ctrlKey && e.shiftKey) {
        switch (e.key) {
          case 'D':
            e.preventDefault();
            setIsDark(prev => !prev);
            addToast(isDark ? 'Light mode enabled' : 'Dark mode enabled', 'info');
            break;
          case 'A':
            e.preventDefault();
            openAllImportant();
            break;
          case 'R':
            e.preventDefault();
            resetLayout();
            break;
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeWindows, showShortcuts, showMatrix, contextMenu, isDark]);

  // Right-click handler
  const handleContextMenu = useCallback((e: React.MouseEvent) => {
    // Only trigger on the desktop background, not on windows
    if ((e.target as HTMLElement).closest('.window-content, .window-header, [role="dialog"], [role="region"], nav, button, a')) return;
    e.preventDefault();
    setContextMenu({ x: e.clientX, y: e.clientY });
  }, []);

  const bringToFront = useCallback((id: WindowType) => {
    setHighestZ(prev => {
      const newZ = prev + 1;
      setActiveWindows(windows =>
        windows.map(w => w.id === id ? { ...w, zIndex: newZ, isMinimized: false } : w)
      );
      return newZ;
    });
  }, []);

  const toggleWindow = useCallback((id: WindowType, forceOpen = false) => {
    setActiveWindows(prev => {
      const targetWindow = prev.find(w => w.id === id);
      const isCurrentlyOpen = targetWindow?.isOpen;

      if (isCurrentlyOpen && !forceOpen) {
        if (targetWindow?.isMinimized) {
          setHighestZ(h => h + 1);
          return prev.map(w => w.id === id ? { ...w, isMinimized: false, zIndex: highestZ + 1 } : w);
        }
        return prev.map(w => w.id === id ? { ...w, isOpen: false, isMinimized: false, isMaximized: false } : w);
      } else {
        setHighestZ(h => h + 1);
        const exists = prev.find(w => w.id === id);
        if (exists) {
          return prev.map(w => w.id === id ? { ...w, isOpen: true, isMinimized: false, zIndex: highestZ + 1 } : w);
        } else {
          return [...prev, {
            id, isOpen: true, isMinimized: false, isMaximized: false,
            zIndex: highestZ + 1, position: getInitialPositions()[id], category: WINDOW_CATEGORIES[id],
          }];
        }
      }
    });
  }, [highestZ]);

  const closeWindow = useCallback((id: WindowType) => {
    setActiveWindows(prev => prev.map(w => w.id === id ? { ...w, isOpen: false, isMinimized: false, isMaximized: false } : w));
  }, []);

  const minimizeWindow = useCallback((id: WindowType) => {
    setActiveWindows(prev => prev.map(w => w.id === id ? { ...w, isMinimized: true } : w));
  }, []);

  const maximizeWindow = useCallback((id: WindowType) => {
    setActiveWindows(prev => prev.map(w => w.id === id ? { ...w, isMaximized: !w.isMaximized } : w));
  }, []);

  const updateWindowPosition = useCallback((id: WindowType, pos: { x: number; y: number }) => {
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const clampedX = Math.max(0, Math.min(pos.x, vw - 200));
    const clampedY = Math.max(0, Math.min(pos.y, vh - 100));
    const snappedX = Math.round(clampedX / SNAP_GRID_SIZE) * SNAP_GRID_SIZE;
    const snappedY = Math.round(clampedY / SNAP_GRID_SIZE) * SNAP_GRID_SIZE;
    setActiveWindows(prev => prev.map(w => w.id === id ? { ...w, position: { x: snappedX, y: snappedY } } : w));
  }, []);

  const resetLayout = useCallback(() => {
    const defaults = getInitialPositions();
    setActiveWindows(prev => prev.map(w => ({
      ...w, position: defaults[w.id], isMinimized: false, isMaximized: false,
    })));
    addToast('Layout reset to defaults', 'info');
  }, [addToast]);

  const openAllImportant = useCallback(() => {
    setActiveWindows(prev => {
      let newWindows = [...prev];
      let z = highestZ;
      for (const winId of IMPORTANT_WINDOWS) {
        z++;
        const exists = newWindows.find(w => w.id === winId);
        if (exists) {
          newWindows = newWindows.map(w => w.id === winId ? { ...w, isOpen: true, isMinimized: false, zIndex: z } : w);
        } else {
          newWindows.push({
            id: winId, isOpen: true, isMinimized: false, isMaximized: false,
            zIndex: z, position: getInitialPositions()[winId], category: WINDOW_CATEGORIES[winId],
          });
        }
      }
      setHighestZ(z);
      return newWindows;
    });
    addToast('Opened key sections', 'info');
  }, [highestZ, addToast]);

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
      case WindowType.PAINT: return <Suspense fallback={<LazyFallback />}><Paint /></Suspense>;
      case WindowType.GUESTBOOK: return <Suspense fallback={<LazyFallback />}><Guestbook /></Suspense>;
      default: return null;
    }
  };

  const getWindowConfig = (id: WindowType): { title: string; icon: React.ElementType; theme: { headerColor: string; textColor: string }; width?: string } => {
    switch (id) {
      case WindowType.ABOUT: return { title: 'About Me', icon: User, theme: WINDOW_THEMES[WindowType.ABOUT] };
      case WindowType.PROJECTS: return { title: 'Projects', icon: Rocket, theme: WINDOW_THEMES[WindowType.PROJECTS] };
      case WindowType.EXPERIENCE: return { title: 'Experience', icon: Briefcase, theme: WINDOW_THEMES[WindowType.EXPERIENCE] };
      case WindowType.CERTIFICATIONS: return { title: 'Certifications', icon: ShieldCheck, theme: WINDOW_THEMES[WindowType.CERTIFICATIONS] };
      case WindowType.ACHIEVEMENTS: return { title: 'Achievements', icon: Trophy, theme: WINDOW_THEMES[WindowType.ACHIEVEMENTS] };
      case WindowType.SKILLS: return { title: 'Skills', icon: Zap, theme: WINDOW_THEMES[WindowType.SKILLS] };
      case WindowType.CONTACT: return { title: 'Contact', icon: Send, theme: WINDOW_THEMES[WindowType.CONTACT] };
      case WindowType.TERMINAL: return { title: 'Terminal', icon: Terminal, theme: WINDOW_THEMES[WindowType.TERMINAL] };
      case WindowType.PAINT: return { title: 'Pixel Studio', icon: Palette, theme: WINDOW_THEMES[WindowType.PAINT] };
      case WindowType.GUESTBOOK: return { title: 'Feedback Hub', icon: MessageSquare, theme: WINDOW_THEMES[WindowType.GUESTBOOK], width: 'w-[320px]' };
      default: return { title: 'Window', icon: User, theme: { headerColor: 'bg-gray-200', textColor: 'text-black' } };
    }
  };

  const openWindows = activeWindows.filter(w => w.isOpen);
  const currentMaxZ = Math.max(...openWindows.map(w => w.zIndex), 0);

  const mobileWindowOrder: WindowType[] = [
    WindowType.ABOUT, WindowType.PROJECTS, WindowType.EXPERIENCE,
    WindowType.SKILLS, WindowType.CERTIFICATIONS, WindowType.ACHIEVEMENTS,
    WindowType.CONTACT, WindowType.TERMINAL, WindowType.PAINT, WindowType.GUESTBOOK,
  ];

  return (
    <div
      className={`relative w-screen h-screen overflow-hidden font-body selection:bg-black selection:text-white
        ${isDark ? 'bg-[#1a1a1a]' : 'bg-[#F0F0F0]'}
        ${isHackerMode ? 'invert hue-rotate-180' : ''} transition-colors duration-500
        ${isMobile ? 'overflow-y-auto h-auto min-h-screen' : ''}`}
      onContextMenu={handleContextMenu}
    >

      <Background />
      <MenuBar isDark={isDark} onToggleDark={() => { setIsDark(d => !d); addToast(isDark ? 'Light mode' : 'Dark mode', 'info'); }} />

      {/* Music Player - lazy loaded */}
      <Suspense fallback={null}>
        <MusicPlayer />
      </Suspense>

      <ToastContainer toasts={toasts} />

      {/* Context Menu */}
      {contextMenu && (
        <ContextMenu
          x={contextMenu.x}
          y={contextMenu.y}
          onClose={() => setContextMenu(null)}
          onToggleDark={() => { setIsDark(d => !d); addToast(isDark ? 'Light mode' : 'Dark mode', 'info'); }}
          onResetLayout={resetLayout}
          onOpenAll={openAllImportant}
          onShowShortcuts={() => setShowShortcuts(true)}
          onToggleSticky={() => setShowSticky(s => !s)}
          isDark={isDark}
        />
      )}

      {/* Keyboard Shortcuts Overlay */}
      <AnimatePresence>
        {showShortcuts && <ShortcutsOverlay onClose={() => setShowShortcuts(false)} />}
      </AnimatePresence>

      {/* Sticky Note */}
      <AnimatePresence>
        {showSticky && <StickyNoteWidget onClose={() => setShowSticky(false)} />}
      </AnimatePresence>

      {/* Matrix Rain Overlay */}
      {showMatrix && (
        <Suspense fallback={null}>
          <MatrixRain onComplete={() => setShowMatrix(false)} />
        </Suspense>
      )}

      {/* Desktop Dock (hidden on mobile via CSS) */}
      {!isMobile && (
        <Dock
          onToggle={toggleWindow}
          activeWindows={openWindows.map(w => w.id)}
          minimizedWindows={activeWindows.filter(w => w.isMinimized).map(w => w.id)}
          onResetLayout={resetLayout}
          onOpenAll={openAllImportant}
        />
      )}

      {/* Suggestion FAB */}
      <div className={`fixed ${isMobile ? 'bottom-20' : 'bottom-6'} right-6 z-[60] flex flex-col items-end gap-3 group suggestion-fab`}>
        <div className="bg-black text-[#FFD60A] text-[10px] font-black uppercase px-3 py-1.5 rounded-lg border-2 border-black opacity-0 group-hover:opacity-100 transition-opacity translate-x-2 group-hover:translate-x-0">
          Leave a Suggestion
        </div>
        <button
          onClick={() => toggleWindow(WindowType.GUESTBOOK, true)}
          className="w-14 h-14 bg-[#FFD60A] border-[3px] border-black rounded-full flex items-center justify-center shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all active:scale-95 group-hover:animate-wiggle"
          aria-label="Open Feedback Hub"
        >
          <MessageSquare size={24} strokeWidth={2.5} />
        </button>
      </div>

      {/* === MOBILE LAYOUT === */}
      {isMobile ? (
        <div className="pt-16 pb-24 px-4 flex flex-col gap-4 desktop-windows-area">
          {mobileWindowOrder.map(winId => {
            const win = activeWindows.find(w => w.id === winId);
            if (!win || !win.isOpen) return null;
            const config = getWindowConfig(winId);
            return (
              <div key={winId} className="mobile-window-card">
                <Window id={winId} title={config.title} isOpen={true} zIndex={1} onClose={closeWindow} onFocus={() => {}}
                  icon={config.icon} headerColor={`${config.theme.headerColor} ${config.theme.textColor}`}
                  isDark={false} width="w-full" isActive={true} isMobile={true}>
                  {renderWindowContent(winId)}
                </Window>
              </div>
            );
          })}
        </div>
      ) : (
        /* === DESKTOP LAYOUT === */
        <div className="absolute top-14 left-0 right-0 bottom-0 pointer-events-none">
          {activeWindows.map(win => {
            if (!win.isOpen || win.isMinimized) return null;
            const config = getWindowConfig(win.id);
            const isActive = win.zIndex === currentMaxZ;
            return (
              <div key={win.id} className="pointer-events-auto">
                <Window id={win.id} title={config.title} isOpen={win.isOpen} isMinimized={win.isMinimized}
                  isMaximized={win.isMaximized} zIndex={win.zIndex} onClose={closeWindow} onFocus={bringToFront}
                  onMinimize={minimizeWindow} onMaximize={maximizeWindow} onPositionChange={updateWindowPosition}
                  initialPosition={win.position} icon={config.icon}
                  headerColor={`${config.theme.headerColor} ${config.theme.textColor}`}
                  isDark={false} width={config.width} isActive={isActive}>
                  {renderWindowContent(win.id)}
                </Window>
              </div>
            );
          })}
        </div>
      )}

      {/* Mobile Bottom Navigation */}
      {isMobile && (
        <nav className="mobile-bottom-nav" role="navigation" aria-label="Window navigation">
          <div className="flex items-center justify-around px-2 overflow-x-auto gap-1">
            {[
              { id: WindowType.ABOUT, icon: User, label: 'About' },
              { id: WindowType.PROJECTS, icon: Rocket, label: 'Projects' },
              { id: WindowType.EXPERIENCE, icon: Briefcase, label: 'Work' },
              { id: WindowType.SKILLS, icon: Zap, label: 'Skills' },
              { id: WindowType.CONTACT, icon: Send, label: 'Contact' },
              { id: WindowType.TERMINAL, icon: Terminal, label: 'Term' },
            ].map(item => {
              const isActive = activeWindows.some(w => w.id === item.id && w.isOpen);
              return (
                <button key={item.id} onClick={() => toggleWindow(item.id)}
                  className={`flex flex-col items-center gap-1 py-2 px-3 rounded-lg transition-colors min-w-[52px] ${isActive ? 'bg-black text-[#CCFF00]' : 'text-gray-500 hover:text-black'}`}
                  aria-label={`Toggle ${item.label}`}>
                  <item.icon size={18} strokeWidth={2.5} />
                  <span className="text-[9px] font-bold uppercase tracking-wide">{item.label}</span>
                </button>
              );
            })}
          </div>
        </nav>
      )}
    </div>
  );
};

export default Desktop;