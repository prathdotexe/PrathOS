import React from 'react';

export enum WindowType {
  ABOUT = 'ABOUT',
  PROJECTS = 'PROJECTS',
  EXPERIENCE = 'EXPERIENCE',
  CERTIFICATIONS = 'CERTIFICATIONS',
  ACHIEVEMENTS = 'ACHIEVEMENTS',
  SKILLS = 'SKILLS',
  CONTACT = 'CONTACT',
  TERMINAL = 'TERMINAL',
  MUSIC = 'MUSIC',
  PAINT = 'PAINT',
  GUESTBOOK = 'GUESTBOOK'
}

export type WindowCategory = 'core' | 'playground';

export interface WindowState {
  id: WindowType;
  isOpen: boolean;
  isMinimized: boolean;
  isMaximized: boolean;
  zIndex: number;
  position: { x: number; y: number };
  category: WindowCategory;
}

export interface WindowProps {
  id: WindowType;
  title: string;
  isOpen: boolean;
  isMinimized?: boolean;
  isMaximized?: boolean;
  zIndex: number;
  onClose: (id: WindowType) => void;
  onFocus: (id: WindowType) => void;
  onMinimize?: (id: WindowType) => void;
  onMaximize?: (id: WindowType) => void;
  onPositionChange?: (id: WindowType, pos: { x: number; y: number }) => void;
  children: React.ReactNode;
  initialPosition?: { x: number; y: number };
  icon?: React.ElementType;
  headerColor?: string;
  isDark?: boolean;
  width?: string;
  isActive?: boolean;
  isMobile?: boolean;
}