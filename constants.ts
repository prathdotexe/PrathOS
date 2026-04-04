import { WindowType, WindowCategory } from './types';

// Window categories: core (professional) vs playground (fun)
export const WINDOW_CATEGORIES: Record<WindowType, WindowCategory> = {
  [WindowType.ABOUT]: 'core',
  [WindowType.PROJECTS]: 'core',
  [WindowType.EXPERIENCE]: 'core',
  [WindowType.SKILLS]: 'core',
  [WindowType.CERTIFICATIONS]: 'core',
  [WindowType.ACHIEVEMENTS]: 'core',
  [WindowType.CONTACT]: 'core',
  [WindowType.TERMINAL]: 'playground',
  [WindowType.MUSIC]: 'playground',
  [WindowType.PAINT]: 'playground',
  [WindowType.GUESTBOOK]: 'playground',
};

// Default positions — used for initial layout and "Reset Layout"
export const DEFAULT_POSITIONS: Record<WindowType, { x: number; y: number }> = {
  [WindowType.ABOUT]: { x: 100, y: 40 },
  [WindowType.PROJECTS]: { x: 140, y: 60 },
  [WindowType.EXPERIENCE]: { x: 180, y: 80 },
  [WindowType.SKILLS]: { x: 220, y: 100 },
  [WindowType.CERTIFICATIONS]: { x: 200, y: 120 },
  [WindowType.ACHIEVEMENTS]: { x: 240, y: 140 },
  [WindowType.CONTACT]: { x: 280, y: 160 },
  [WindowType.TERMINAL]: { x: 350, y: 100 },
  [WindowType.MUSIC]: { x: 100, y: 350 },
  [WindowType.PAINT]: { x: 450, y: 150 },
  [WindowType.GUESTBOOK]: { x: 300, y: 200 },
};

// Calculate responsive positions based on viewport
export const getInitialPositions = (): Record<WindowType, { x: number; y: number }> => {
  const vw = typeof window !== 'undefined' ? window.innerWidth : 1200;
  const vh = typeof window !== 'undefined' ? window.innerHeight : 800;

  if (vw < 768) {
    // Mobile: positions don't matter (stacked layout)
    return DEFAULT_POSITIONS;
  }

  return {
    ...DEFAULT_POSITIONS,
    [WindowType.GUESTBOOK]: { x: Math.max(300, vw - 450), y: Math.max(200, vh - 550) },
  };
};

// Neo-Brutalism Palette
export const COLORS = {
  bg: 'bg-[#F0F0F0]',
  windowBase: 'bg-white dark:bg-zinc-900',
  windowBorder: 'border-black dark:border-white',
  shadow: 'shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] dark:shadow-[5px_5px_0px_0px_rgba(255,255,255,1)]',
  shadowSm: 'shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] dark:shadow-[3px_3px_0px_0px_rgba(255,255,255,1)]',
  textMain: 'text-black dark:text-white',
  textMuted: 'text-gray-600 dark:text-gray-400',
};

// Window themes — slightly desaturated from original for sophistication
export const WINDOW_THEMES: Record<WindowType, { headerColor: string; textColor: string }> = {
  [WindowType.ABOUT]: {
    headerColor: 'bg-[#C4B5FD]',
    textColor: 'text-black',
  },
  [WindowType.PROJECTS]: {
    headerColor: 'bg-[#FCA5A5]',
    textColor: 'text-black',
  },
  [WindowType.EXPERIENCE]: {
    headerColor: 'bg-gray-200',
    textColor: 'text-black',
  },
  [WindowType.CERTIFICATIONS]: {
    headerColor: 'bg-[#6EE7B7]',
    textColor: 'text-black',
  },
  [WindowType.ACHIEVEMENTS]: {
    headerColor: 'bg-[#93C5FD]',
    textColor: 'text-black',
  },
  [WindowType.SKILLS]: {
    headerColor: 'bg-[#FCD34D]',
    textColor: 'text-black',
  },
  [WindowType.CONTACT]: {
    headerColor: 'bg-[#D8B4FE]',
    textColor: 'text-black',
  },
  [WindowType.TERMINAL]: {
    headerColor: 'bg-[#333333]',
    textColor: 'text-white',
  },
  [WindowType.MUSIC]: {
    headerColor: 'bg-[#F2F0E9]',
    textColor: 'text-black',
  },
  [WindowType.PAINT]: {
    headerColor: 'bg-[#FF9F1C]',
    textColor: 'text-black',
  },
  [WindowType.GUESTBOOK]: {
    headerColor: 'bg-[#FFD60A]',
    textColor: 'text-black',
  },
};

// Dock item order (reordered by priority)
export const DOCK_ITEMS_ORDER: { id: WindowType; label: string }[] = [
  // Core
  { id: WindowType.ABOUT, label: 'About Me' },
  { id: WindowType.PROJECTS, label: 'Projects' },
  { id: WindowType.EXPERIENCE, label: 'Experience' },
  { id: WindowType.SKILLS, label: 'Skills' },
  { id: WindowType.CERTIFICATIONS, label: 'Certifications' },
  { id: WindowType.ACHIEVEMENTS, label: 'Achievements' },
  { id: WindowType.CONTACT, label: 'Contact' },
  // Playground
  { id: WindowType.TERMINAL, label: 'Terminal' },
  { id: WindowType.PAINT, label: 'Pixel Studio' },
];

// Important windows for "Open All Important"
export const IMPORTANT_WINDOWS: WindowType[] = [
  WindowType.ABOUT,
  WindowType.PROJECTS,
  WindowType.EXPERIENCE,
  WindowType.CONTACT,
];

// Snap grid size for window positioning
export const SNAP_GRID_SIZE = 20;