import React from 'react';
import { Moon, Sun, RotateCcw, LayoutGrid, Code, HelpCircle, Keyboard, StickyNote, X } from 'lucide-react';

interface ContextMenuProps {
  x: number;
  y: number;
  onClose: () => void;
  onToggleDark: () => void;
  onResetLayout: () => void;
  onOpenAll: () => void;
  onShowShortcuts: () => void;
  onToggleSticky: () => void;
  isDark: boolean;
}

const ContextMenu: React.FC<ContextMenuProps> = ({
  x, y, onClose, onToggleDark, onResetLayout, onOpenAll, onShowShortcuts, onToggleSticky, isDark,
}) => {
  // Clamp position to viewport
  const menuWidth = 220;
  const menuHeight = 320;
  const adjustedX = Math.min(x, window.innerWidth - menuWidth - 10);
  const adjustedY = Math.min(y, window.innerHeight - menuHeight - 10);

  const items: { icon: React.ElementType; label: string; onClick: () => void; shortcut?: string; divider?: boolean }[] = [
    { icon: LayoutGrid, label: 'Open All Important', onClick: onOpenAll, shortcut: 'Ctrl+Shift+A' },
    { icon: RotateCcw, label: 'Reset Layout', onClick: onResetLayout, shortcut: 'Ctrl+Shift+R' },
    { icon: isDark ? Sun : Moon, label: isDark ? 'Light Mode' : 'Dark Mode', onClick: onToggleDark, shortcut: 'Ctrl+Shift+D', divider: true },
    { icon: StickyNote, label: 'Toggle Sticky Note', onClick: onToggleSticky },
    { icon: Keyboard, label: 'Keyboard Shortcuts', onClick: onShowShortcuts, shortcut: '?' },
    { icon: Code, label: 'View Source', onClick: () => window.open('https://github.com/prathdotexe/PrathOS', '_blank'), divider: true },
  ];

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 z-[199]" onClick={onClose} onContextMenu={(e) => { e.preventDefault(); onClose(); }} />

      {/* Menu */}
      <div
        className="fixed z-[200] w-[220px] bg-white border-[3px] border-black rounded-xl shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] overflow-hidden animate-fade-in font-body"
        style={{ top: adjustedY, left: adjustedX }}
      >
        {/* Header */}
        <div className="px-4 py-2.5 border-b-2 border-black/10 bg-gray-50">
          <span className="font-heading font-black text-[10px] uppercase tracking-widest text-gray-400">PrathOS Menu</span>
        </div>

        {/* Items */}
        <div className="py-1.5">
          {items.map((item, i) => (
            <React.Fragment key={item.label}>
              <button
                onClick={() => { item.onClick(); onClose(); }}
                className="w-full flex items-center justify-between px-4 py-2.5 hover:bg-[#CCFF00] transition-colors group text-left"
              >
                <div className="flex items-center gap-3">
                  <item.icon size={14} className="text-gray-500 group-hover:text-black" />
                  <span className="font-heading font-bold text-xs text-black">{item.label}</span>
                </div>
                {item.shortcut && (
                  <span className="text-[9px] font-mono font-bold text-gray-300 group-hover:text-black/40">{item.shortcut}</span>
                )}
              </button>
              {item.divider && <div className="h-[2px] bg-black/5 mx-3 my-1" />}
            </React.Fragment>
          ))}
        </div>
      </div>
    </>
  );
};

export default ContextMenu;
