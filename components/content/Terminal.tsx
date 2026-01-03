import React, { useState, useRef, useEffect } from 'react';

const HELP_TEXT = [
  "Available commands:",
  "  help      - Show this help message",
  "  about     - Display profile summary",
  "  skills    - List core technical skills",
  "  clear     - Clear terminal history",
  "  whoami    - The philosophical question",
  "  logs      - [ADMIN] View feedback instructions"
];

const Terminal: React.FC = () => {
  const [history, setHistory] = useState<string[]>(["Welcome to PrathOS v1.0.0", "Type 'help' to see available commands."]);
  const [input, setInput] = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const cmd = input.trim().toLowerCase();
    const newHistory = [...history, `guest@prath-os:~$ ${input}`];

    switch (cmd) {
      case 'help':
        setHistory([...newHistory, ...HELP_TEXT]);
        break;
      case 'about':
        setHistory([...newHistory, ">> Prathamesh | CS Student | Full Stack Dev", ">> Passionate about building scalable systems and intuitive UIs."]);
        break;
      case 'skills':
        setHistory([...newHistory, ">> Frontend: React, Tailwind, Framer Motion", ">> Backend: Node.js, Python, Go", ">> Tools: Docker, Git, Linux"]);
        break;
      case 'clear':
        setHistory([]);
        setInput("");
        return;
      case 'whoami':
        setHistory([...newHistory, ">> You are the visitor. Welcome to my digital space."]);
        break;
      case 'logs':
        setHistory([
          ...newHistory, 
          ">> [SYSTEM MESSAGE]",
          ">> To view all feedback left by visitors:",
          ">> 1. Log in to your Formspree dashboard at formspree.io",
          ">> 2. Every submission is also CC'd to your verified email.",
          ">> 3. Gemini AI automatically categorizes entries for you."
        ]);
        break;
      default:
        setHistory([...newHistory, `Command not found: ${cmd}. Type 'help' for assistance.`]);
    }
    setInput("");
  };

  return (
    <div 
      className="h-full bg-[#1e1e1e] text-[#33ff00] font-mono text-sm p-4 overflow-y-auto custom-scrollbar relative flex flex-col"
      onClick={() => inputRef.current?.focus()}
    >
      <div className="absolute inset-0 pointer-events-none opacity-10" style={{ background: 'linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.25) 50%), linear-gradient(90deg, rgba(255, 0, 0, 0.06), rgba(0, 255, 0, 0.02), rgba(0, 0, 255, 0.06))', backgroundSize: '100% 2px, 3px 100%' }}></div>
      
      <div className="flex-1 z-10">
        {history.map((line, i) => (
          <div key={i} className="mb-1 leading-relaxed break-words text-shadow-sm">
            {line.startsWith('guest@') ? <span className="text-blue-400 font-bold">{line.split('$')[0]}$ <span className="text-[#33ff00] font-normal">{line.split('$')[1]}</span></span> : line}
          </div>
        ))}
        
        <form onSubmit={handleCommand} className="flex items-center gap-2 mt-2">
          <span className="text-blue-400 font-bold shrink-0">guest@prath-os:~$</span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 bg-transparent border-none outline-none text-[#33ff00] font-mono p-0 focus:ring-0 caret-[#33ff00]"
            autoFocus
            autoComplete="off"
            spellCheck="false"
          />
        </form>
        <div ref={bottomRef} />
      </div>
    </div>
  );
};

export default Terminal;