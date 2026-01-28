import { WindowType } from './types';

// Initial positions
export const INITIAL_POSITIONS = {
  [WindowType.ABOUT]: { x: 100, y: 40 },
  [WindowType.PROJECTS]: { x: 140, y: 80 },
  [WindowType.EXPERIENCE]: { x: 180, y: 120 },
  [WindowType.CERTIFICATIONS]: { x: 200, y: 140 },
  [WindowType.ACHIEVEMENTS]: { x: 220, y: 160 },
  [WindowType.SKILLS]: { x: 240, y: 180 },
  [WindowType.CONTACT]: { x: 280, y: 220 },
  [WindowType.TERMINAL]: { x: 350, y: 100 },
  [WindowType.MUSIC]: { x: 100, y: 350 },
  [WindowType.PAINT]: { x: 450, y: 150 },
  [WindowType.GUESTBOOK]: { x: window.innerWidth - 450, y: window.innerHeight - 550 },
};

// Vibrant "Gen Z" Neo-Brutalism Palette
export const COLORS = {
  bg: 'bg-[#F0F0F0]',
  windowBase: 'bg-white dark:bg-zinc-900',
  windowBorder: 'border-black dark:border-white',
  shadow: 'shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] dark:shadow-[5px_5px_0px_0px_rgba(255,255,255,1)]', 
  shadowSm: 'shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] dark:shadow-[3px_3px_0px_0px_rgba(255,255,255,1)]',
  textMain: 'text-black dark:text-white',
  textMuted: 'text-gray-600 dark:text-gray-400',
};

// Specific themes for each window type
export const WINDOW_THEMES = {
  [WindowType.ABOUT]: {
    headerColor: 'bg-[#C4B5FD]', // Soft Violet
    textColor: 'text-black',
  },
  [WindowType.PROJECTS]: {
    headerColor: 'bg-[#FCA5A5]', // Soft Coral Red
    textColor: 'text-black',
  },
  [WindowType.EXPERIENCE]: {
    headerColor: 'bg-gray-200', 
    textColor: 'text-black',
  },
  [WindowType.CERTIFICATIONS]: {
    headerColor: 'bg-[#6EE7B7]', // Mint Green
    textColor: 'text-black',
  },
  [WindowType.ACHIEVEMENTS]: {
    headerColor: 'bg-[#93C5FD]', // Sky Blue
    textColor: 'text-black',
  },
  [WindowType.SKILLS]: {
    headerColor: 'bg-[#FCD34D]', // Sunshine Yellow
    textColor: 'text-black',
  },
  [WindowType.CONTACT]: {
    headerColor: 'bg-[#D8B4FE]', // Lavender
    textColor: 'text-black',
  },
  [WindowType.TERMINAL]: {
    headerColor: 'bg-[#333333]', // Dark Grey
    textColor: 'text-white',
  },
  [WindowType.MUSIC]: {
    headerColor: 'bg-[#F2F0E9]', // Retro Beige for Widget
    textColor: 'text-black',
  },
  [WindowType.PAINT]: {
    headerColor: 'bg-[#FF9F1C]', // Bright Orange
    textColor: 'text-black',
  },
  [WindowType.GUESTBOOK]: {
    headerColor: 'bg-[#FFD60A]', // Bright Yellow
    textColor: 'text-black',
  },
};