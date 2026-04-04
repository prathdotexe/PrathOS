import React, { useRef, useState, useEffect } from 'react';
import Draggable, { DraggableData, DraggableEvent } from 'react-draggable';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Minus, Maximize2 } from 'lucide-react';
import { WindowProps } from '../types';
import { COLORS } from '../constants';

const Window: React.FC<WindowProps> = ({
  id,
  title,
  isOpen,
  isMinimized = false,
  isMaximized = false,
  zIndex,
  onClose,
  onFocus,
  onMinimize,
  onMaximize,
  onPositionChange,
  children,
  initialPosition = { x: 0, y: 0 },
  icon: Icon,
  headerColor = 'bg-[#FDF0D5]',
  isDark = false,
  width,
  isActive = true,
  isMobile = false,
}) => {
  const nodeRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleStart = () => {
    onFocus(id);
    setIsDragging(true);
  };

  const handleDrag = (e: DraggableEvent, data: DraggableData) => {
    if (onPositionChange) {
      const constrainedY = Math.max(0, data.y);
      onPositionChange(id, { x: data.x, y: constrainedY });
    }
  };

  const handleStop = () => {
    setIsDragging(false);
  };

  // Keyboard support
  useEffect(() => {
    if (!isOpen || !isActive) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose(id);
      }
    };
    // Only add if this is the topmost window (handled by Desktop)
    return () => {};
  }, [isOpen, isActive, id, onClose]);

  const windowWidthClass = width || 'w-[90vw] max-w-[600px]';

  // Mobile: render as a static card, no dragging
  if (isMobile) {
    return (
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className={`flex flex-col w-full ${COLORS.windowBase} border-[3px] ${COLORS.windowBorder} rounded-2xl overflow-hidden`}
            style={{ boxShadow: '5px 5px 0px 0px rgba(0,0,0,1)' }}
            role="region"
            aria-label={title}
          >
            {/* Window Header */}
            <div className={`h-12 border-b-[3px] ${COLORS.windowBorder} flex items-center px-4 select-none relative ${headerColor}`}>
              <div
                className="absolute inset-0 opacity-10 pointer-events-none"
                style={{
                  backgroundImage: `repeating-linear-gradient(-45deg, transparent, transparent 4px, ${isDark ? '#FFF' : '#000'} 4px, ${isDark ? '#FFF' : '#000'} 6px)`
                }}
              />
              <div className="flex items-center gap-3 z-10 w-full">
                <div className="flex space-x-2 shrink-0">
                  <button
                    onClick={(e) => { e.stopPropagation(); onClose(id); }}
                    className={`group/btn relative flex justify-center items-center w-4 h-4 rounded-full bg-[#FF5F56] border-2 ${COLORS.windowBorder} shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] hover:scale-110 transition-transform active:translate-y-[1px] active:shadow-none`}
                    aria-label={`Close ${title}`}
                  >
                    <X className="w-2.5 h-2.5 text-black opacity-0 group-hover/btn:opacity-100 transition-opacity" strokeWidth={4} />
                  </button>
                  <div className={`w-4 h-4 rounded-full bg-[#FFBD2E] border-2 ${COLORS.windowBorder} shadow-[1px_1px_0px_0px_rgba(0,0,0,1)]`} />
                  <div className={`w-4 h-4 rounded-full bg-[#27C93F] border-2 ${COLORS.windowBorder} shadow-[1px_1px_0px_0px_rgba(0,0,0,1)]`} />
                </div>
                <div className="w-[2px] h-5 bg-black/20 rounded-full" />
                <div className="flex items-center gap-2 overflow-hidden bg-white/40 px-3 py-1 rounded-full border border-black/10">
                  {Icon && <Icon className={`w-4 h-4 ${isDark ? 'text-white' : 'text-black'}`} strokeWidth={2.5} />}
                  <span className={`font-heading font-bold text-xs tracking-wide uppercase truncate ${isDark ? 'text-white' : 'text-black'}`}>
                    {title}
                  </span>
                </div>
              </div>
            </div>

            {/* Window Content */}
            <div className="relative bg-white dark:bg-zinc-900 min-h-[300px] max-h-[70vh] overflow-hidden">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    );
  }

  // Desktop: draggable window
  return (
    <AnimatePresence>
      {isOpen && !isMinimized && (
        <Draggable
          nodeRef={nodeRef}
          handle=".window-header"
          position={isMaximized ? { x: 80, y: 0 } : initialPosition}
          onStart={handleStart}
          onDrag={handleDrag}
          onStop={handleStop}
          onMouseDown={() => onFocus(id)}
          disabled={isMaximized}
        >
          <div
            ref={nodeRef}
            className={`absolute flex flex-col ${isMaximized ? 'w-[calc(100vw-100px)] max-w-none' : windowWidthClass} ${isMaximized ? 'max-h-[calc(100vh-60px)]' : 'max-h-[85vh]'} ${isDragging ? 'transition-none' : 'transition-all duration-200'} will-change-transform`}
            style={{ zIndex, opacity: isActive ? 1 : 0.88 }}
            role="dialog"
            aria-label={title}
            aria-modal="false"
          >
            <motion.div
              initial={{ scale: 0.92, opacity: 0, y: 15 }}
              animate={{
                scale: isActive ? 1 : 0.985,
                opacity: 1,
                y: 0,
              }}
              exit={{ scale: 0.92, opacity: 0, y: 15 }}
              transition={{ type: "spring", stiffness: 400, damping: 28 }}
              className={`flex flex-col h-full ${COLORS.windowBase} border-[3px] ${COLORS.windowBorder} rounded-2xl overflow-hidden ${isDragging ? 'select-none' : ''}`}
              style={{
                boxShadow: isActive
                  ? (isDark ? '8px 8px 0px 0px rgba(255,255,255,1)' : '8px 8px 0px 0px rgba(0,0,0,1)')
                  : (isDark ? '4px 4px 0px 0px rgba(255,255,255,0.5)' : '4px 4px 0px 0px rgba(0,0,0,0.4)'),
                transition: 'box-shadow 0.3s ease',
              }}
            >
              {/* Window Header */}
              <div className={`window-header group h-12 border-b-[3px] ${COLORS.windowBorder} flex items-center px-4 select-none relative transition-colors cursor-grab active:cursor-grabbing ${headerColor}`}>

                <div
                  className="absolute inset-0 opacity-10 group-hover:opacity-20 transition-opacity pointer-events-none"
                  style={{
                    backgroundImage: `repeating-linear-gradient(-45deg, transparent, transparent 4px, ${isDark ? '#FFF' : '#000'} 4px, ${isDark ? '#FFF' : '#000'} 6px)`
                  }}
                />

                <div className="flex items-center gap-3 z-10 w-full">
                  <div className="flex space-x-2 shrink-0">
                    <button
                      onClick={(e) => { e.stopPropagation(); onClose(id); }}
                      className={`group/btn relative flex justify-center items-center w-4 h-4 rounded-full bg-[#FF5F56] border-2 ${COLORS.windowBorder} shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] hover:scale-110 transition-transform active:translate-y-[1px] active:shadow-none`}
                      aria-label={`Close ${title}`}
                    >
                      <X className="w-2.5 h-2.5 text-black opacity-0 group-hover/btn:opacity-100 transition-opacity" strokeWidth={4} />
                    </button>
                    <button
                      onClick={(e) => { e.stopPropagation(); onMinimize?.(id); }}
                      className={`group/btn relative flex justify-center items-center w-4 h-4 rounded-full bg-[#FFBD2E] border-2 ${COLORS.windowBorder} shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] hover:scale-110 transition-transform active:translate-y-[1px] active:shadow-none`}
                      aria-label={`Minimize ${title}`}
                    >
                      <Minus className="w-2.5 h-2.5 text-black opacity-0 group-hover/btn:opacity-100 transition-opacity" strokeWidth={4} />
                    </button>
                    <button
                      onClick={(e) => { e.stopPropagation(); onMaximize?.(id); }}
                      className={`group/btn relative flex justify-center items-center w-4 h-4 rounded-full bg-[#27C93F] border-2 ${COLORS.windowBorder} shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] hover:scale-110 transition-transform active:translate-y-[1px] active:shadow-none`}
                      aria-label={`Maximize ${title}`}
                    >
                      <Maximize2 className="w-2 h-2 text-black opacity-0 group-hover/btn:opacity-100 transition-opacity" strokeWidth={3} />
                    </button>
                  </div>

                  <div className="w-[2px] h-5 bg-black/20 dark:bg-white/20 rounded-full" />

                  <div className="flex items-center gap-2 overflow-hidden bg-white/40 dark:bg-black/40 px-3 py-1 rounded-full border border-black/10 dark:border-white/10">
                    {Icon && (
                      <Icon className={`w-4 h-4 ${isDark ? 'text-white' : 'text-black'}`} strokeWidth={2.5} />
                    )}
                    <span className={`font-heading font-bold text-xs tracking-wide uppercase truncate ${isDark ? 'text-white' : 'text-black'}`}>
                      {title}
                    </span>
                  </div>
                </div>
              </div>

              {/* Window Content */}
              <div className={`flex-1 overflow-hidden relative bg-white dark:bg-zinc-900 ${isDragging ? 'pointer-events-none' : ''}`}>
                {children}
              </div>
            </motion.div>
          </div>
        </Draggable>
      )}
    </AnimatePresence>
  );
};

export default React.memo(Window);