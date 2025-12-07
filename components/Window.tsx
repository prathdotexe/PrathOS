import React, { useRef, useState } from 'react';
import Draggable, { DraggableData, DraggableEvent } from 'react-draggable';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Minus, Square } from 'lucide-react';
import { WindowProps } from '../types';
import { COLORS } from '../constants';

const Window: React.FC<WindowProps> = ({
  id,
  title,
  isOpen,
  zIndex,
  onClose,
  onFocus,
  onPositionChange,
  children,
  initialPosition = { x: 0, y: 0 },
  icon: Icon,
  headerColor = 'bg-[#FDF0D5]',
  isDark = false,
  width,
  isActive = true
}) => {
  const nodeRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleStart = () => {
    onFocus(id);
    setIsDragging(true);
  };

  const handleDrag = (e: DraggableEvent, data: DraggableData) => {
    if (onPositionChange) {
      // Manually clamp Y to 0 (cannot go above menu bar)
      // But allow X to be anything, enabling partial off-screen dragging
      const constrainedY = Math.max(0, data.y);
      onPositionChange(id, { x: data.x, y: constrainedY });
    }
  };

  const handleStop = () => {
    setIsDragging(false);
  };

  const windowWidthClass = width || 'w-[90vw] max-w-[600px]';

  return (
    <AnimatePresence>
      {isOpen && (
        <Draggable
          nodeRef={nodeRef}
          handle=".window-header"
          position={initialPosition}
          onStart={handleStart}
          onDrag={handleDrag}
          onStop={handleStop}
          onMouseDown={() => onFocus(id)}
        >
          <div
            ref={nodeRef}
            className={`absolute flex flex-col ${windowWidthClass} max-h-[85vh] ${isDragging ? 'transition-none' : 'transition-opacity duration-300'} ${isActive ? 'opacity-100 z-50' : 'opacity-85 z-0'} will-change-transform`}
            style={{ zIndex }}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ 
                scale: isActive ? 1 : 0.98, 
                opacity: 1, 
                y: 0,
                filter: isActive ? 'none' : 'grayscale(0.3) blur(0.5px)'
              }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: "spring", stiffness: 350, damping: 25 }}
              className={`flex flex-col h-full ${COLORS.windowBase} border-[3px] ${COLORS.windowBorder} rounded-3xl overflow-hidden transition-shadow duration-300 ${isDragging ? 'select-none shadow-none' : ''}`}
              // Dynamic shadow based on zIndex for "Parallax/Depth" effect
              style={{
                  boxShadow: isDark 
                    ? `${Math.min(zIndex, 20)}px ${Math.min(zIndex, 20)}px 0px 0px rgba(255,255,255,1)`
                    : `${Math.min(zIndex, 20)}px ${Math.min(zIndex, 20)}px 0px 0px rgba(0,0,0,1)`
              }}
            >
              {/* Window Header */}
              <div className={`window-header group h-14 border-b-[3px] ${COLORS.windowBorder} flex items-center px-4 select-none relative transition-colors cursor-grab active:cursor-grabbing ${headerColor}`}>
                
                <div 
                  className="absolute inset-0 opacity-10 group-hover:opacity-20 transition-opacity pointer-events-none" 
                  style={{ 
                      backgroundImage: `repeating-linear-gradient(-45deg, transparent, transparent 4px, ${isDark ? '#FFF' : '#000'} 4px, ${isDark ? '#FFF' : '#000'} 6px)` 
                  }} 
                />
                
                <div className="flex items-center gap-4 z-10 w-full">
                  <div className="flex space-x-2 shrink-0">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onClose(id);
                      }}
                      className={`group/btn relative flex justify-center items-center w-4 h-4 rounded-full bg-[#FF5F56] border-2 ${COLORS.windowBorder} shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] dark:shadow-[1px_1px_0px_0px_rgba(255,255,255,1)] hover:scale-110 transition-transform active:translate-y-[1px] active:shadow-none`}
                    >
                      <X className="w-2.5 h-2.5 text-black opacity-0 group-hover/btn:opacity-100 transition-opacity" strokeWidth={4} />
                    </button>
                    <div className={`group/btn relative flex justify-center items-center w-4 h-4 rounded-full bg-[#FFBD2E] border-2 ${COLORS.windowBorder} shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] dark:shadow-[1px_1px_0px_0px_rgba(255,255,255,1)] hover:scale-110 transition-transform`}>
                       <Minus className="w-2.5 h-2.5 text-black opacity-0 group-hover/btn:opacity-100 transition-opacity" strokeWidth={4} />
                    </div>
                    <div className={`group/btn relative flex justify-center items-center w-4 h-4 rounded-full bg-[#27C93F] border-2 ${COLORS.windowBorder} shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] dark:shadow-[1px_1px_0px_0px_rgba(255,255,255,1)] hover:scale-110 transition-transform`}>
                       <Square className="w-2 h-2 text-black opacity-0 group-hover/btn:opacity-100 transition-opacity" fill="currentColor" strokeWidth={0} />
                    </div>
                  </div>

                  <div className="w-[2px] h-6 bg-black/20 dark:bg-white/20 rounded-full"></div>

                  <div className="flex items-center gap-2 overflow-hidden bg-white/40 dark:bg-black/40 px-3 py-1 rounded-full border border-black/10 dark:border-white/10">
                      {Icon && (
                          <Icon className={`w-4 h-4 ${isDark ? 'text-white' : 'text-black'}`} strokeWidth={2.5} />
                      )}
                      <span className={`font-heading font-bold text-sm tracking-wide uppercase truncate ${isDark ? 'text-white' : 'text-black'}`}>
                         {title}
                      </span>
                  </div>
                </div>
              </div>

              {/* Window Content - Pointer events disabled ONLY here during drag to prevent iframe/content stealing */}
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