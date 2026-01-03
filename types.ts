import React from 'react';

export enum WindowType {
  ABOUT = 'ABOUT',
  PROJECTS = 'PROJECTS',
  EXPERIENCE = 'EXPERIENCE',
  SKILLS = 'SKILLS',
  CONTACT = 'CONTACT',
  TERMINAL = 'TERMINAL',
  MUSIC = 'MUSIC',
  PAINT = 'PAINT',
  GUESTBOOK = 'GUESTBOOK'
}

export interface WindowState {
  id: WindowType;
  isOpen: boolean;
  zIndex: number;
  position: { x: number; y: number };
}

export interface WindowProps {
  id: WindowType;
  title: string;
  isOpen: boolean;
  zIndex: number;
  onClose: (id: WindowType) => void;
  onFocus: (id: WindowType) => void;
  onPositionChange?: (id: WindowType, pos: { x: number; y: number }) => void;
  children: React.ReactNode;
  initialPosition?: { x: number; y: number };
  icon?: React.ElementType;
  headerColor?: string;
  isDark?: boolean;
  width?: string;
  isActive?: boolean;
}