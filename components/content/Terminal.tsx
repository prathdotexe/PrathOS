import React, { useState, useRef, useEffect } from 'react';
import { WindowType } from '../../types';

const NEOFETCH_OUTPUT = [
  "            ░█████████░            guest@prath-os",
  "         ░███░░░░░░░███░          ─────────────────",
  "       ░██░░░██████░░░██░         OS:      PrathOS v2.0",
  "      ░██░░██░░░░░██░░██░         Host:    prathdotexe.github.io",
  "     ░██░░██  CORE  ██░░██        Kernel:  React 18 + Vite",
  "     ░██░░██░░░░░░░██░░██        Shell:   TypeScript",
  "     ░██░░░████████░░░██░        UI:      Tailwind + Motion",
  "      ░██░░░░░░░░░░░██░         Theme:   Neo-Brutalism",
  "       ░███░░░░░░░███░          CPU:     memoization ⚡",
  "         ░█████████░            GPU:     CSS transforms",
  "                                Memory:  Suspense + Lazy",
  "                                ─────────────────",
  "                                Projects: 5 | Skills: 20+",
  "                                Status:   OPEN",
  "",
  "        prath.exe // frontend systems",
];

const COMMANDS: Record<string, string[]> = {
  help: [
    "┌─────────────────────────────────┐",
    "│     PrathOS Terminal v1.0.0     │",
    "├─────────────────────────────────┤",
    "│  about     → Profile summary   │",
    "│  skills    → Core tech stack   │",
    "│  projects  → Open Projects     │",
    "│  experience→ Open Experience   │",
    "│  contact   → Open Contact      │",
    "│  resume    → Open Resume PDF   │",
    "│  social    → GitHub & LinkedIn │",
    "│  neofetch  → System info       │",
    "│  matrix    → Enter the Matrix  │",
    "│  whoami    → ???               │",
    "│  clear     → Clear terminal    │",
    "│  help      → This menu        │",
    "└─────────────────────────────────┘"
  ],
  about: [
    ">> Prathamesh Dhembre",
    ">> Student · Full-Stack Developer · AI Builder",
    ">> Based in Pune, India",
    ">> Currently studying CS at LPU and building AI-powered apps.",
    "",
    ">> Type 'projects' to see my work, or 'contact' to get in touch."
  ],
  skills: [
    ">> ─── Frontend ───",
    ">>   React/Next.js · TypeScript · Tailwind · Framer Motion",
    ">> ─── Backend ───",
    ">>   Node.js · Python/FastAPI · PostgreSQL · MongoDB",
    ">> ─── AI & LLM ───",
    ">>   Gemini/OpenAI · RAG Pipelines · LangChain · Vector DBs",
    ">> ─── DevOps ───",
    ">>   Docker · GitHub Actions · AWS · Linux",
    "",
    ">> Type 'projects' to see these skills in action."
  ],
  whoami: [
    ">> You are a visitor exploring prath.exe",
    ">> Thanks for stopping by my digital workspace.",
    ">> Feel free to poke around — try 'projects' or 'contact'.",
    ">> Or try 'matrix' for something fun 😈"
  ],
  social: [
    ">> GitHub  → https://github.com/prathdotexe/",
    ">> LinkedIn → https://www.linkedin.com/in/dprathamessh/",
    "",
    ">> Type 'contact' for more ways to reach me."
  ],
  neofetch: NEOFETCH_OUTPUT,
};

const WINDOW_COMMANDS: Record<string, WindowType> = {
  projects: WindowType.PROJECTS,
  experience: WindowType.EXPERIENCE,
  contact: WindowType.CONTACT,
};

const ALL_COMMANDS = ['help', 'about', 'skills', 'projects', 'experience', 'contact', 'resume', 'social', 'whoami', 'neofetch', 'matrix', 'clear'];

const Terminal: React.FC = () => {
  const [history, setHistory] = useState<string[]>([
    "Welcome to PrathOS v1.0.0",
    "Type 'help' to see available commands.",
    ""
  ]);
  const [input, setInput] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [cmdHistory, setCmdHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  useEffect(() => {
    if (input.trim().length > 0) {
      const matches = ALL_COMMANDS.filter(c => c.startsWith(input.trim().toLowerCase()) && c !== input.trim().toLowerCase());
      setSuggestions(matches.slice(0, 3));
    } else {
      setSuggestions([]);
    }
  }, [input]);

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const cmd = input.trim().toLowerCase();
    const newHistory = [...history, `guest@prath-os:~$ ${input}`];
    setCmdHistory(prev => [...prev, cmd]);
    setHistoryIndex(-1);

    if (cmd === 'clear') {
      setHistory([]);
      setInput("");
      setSuggestions([]);
      return;
    }

    if (cmd === 'resume') {
      setHistory([...newHistory, ">> Opening resume...", ""]);
      window.open('/Resume.pdf', '_blank');
      setInput("");
      setSuggestions([]);
      return;
    }

    // Matrix command
    if (cmd === 'matrix') {
      setHistory([...newHistory, ">> Entering the Matrix...", ">> Follow the white rabbit 🐇", ""]);
      window.dispatchEvent(new CustomEvent('trigger-matrix'));
      setInput("");
      setSuggestions([]);
      return;
    }

    if (WINDOW_COMMANDS[cmd]) {
      setHistory([...newHistory, `>> Opening ${cmd}...`, ""]);
      window.dispatchEvent(new CustomEvent('open-window', { detail: { window: WINDOW_COMMANDS[cmd] } }));
      setInput("");
      setSuggestions([]);
      return;
    }

    if (COMMANDS[cmd]) {
      setHistory([...newHistory, ...COMMANDS[cmd], ""]);
    } else {
      const closest = ALL_COMMANDS.find(c => c.startsWith(cmd.slice(0, 2)));
      setHistory([
        ...newHistory,
        `>> Command not found: '${cmd}'`,
        closest ? `>> Did you mean '${closest}'? Type 'help' for all commands.` : ">> Type 'help' to see available commands.",
        ""
      ]);
    }

    setInput("");
    setSuggestions([]);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Tab') {
      e.preventDefault();
      if (suggestions.length > 0) {
        setInput(suggestions[0]);
        setSuggestions([]);
      }
    }
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (cmdHistory.length > 0) {
        const newIndex = historyIndex < cmdHistory.length - 1 ? historyIndex + 1 : historyIndex;
        setHistoryIndex(newIndex);
        setInput(cmdHistory[cmdHistory.length - 1 - newIndex] || '');
      }
    }
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1;
        setHistoryIndex(newIndex);
        setInput(cmdHistory[cmdHistory.length - 1 - newIndex] || '');
      } else {
        setHistoryIndex(-1);
        setInput('');
      }
    }
  };

  return (
    <div
      className="h-full bg-[#1e1e1e] text-[#33ff00] font-mono text-sm p-4 overflow-y-auto custom-scrollbar relative flex flex-col"
      onClick={() => inputRef.current?.focus()}
      role="application"
      aria-label="Terminal emulator"
    >
      {/* CRT scanline effect */}
      <div className="absolute inset-0 pointer-events-none opacity-10" style={{ background: 'linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.25) 50%), linear-gradient(90deg, rgba(255, 0, 0, 0.06), rgba(0, 255, 0, 0.02), rgba(0, 0, 255, 0.06))', backgroundSize: '100% 2px, 3px 100%' }} />

      <div className="flex-1 z-10">
        {history.map((line, i) => (
          <div key={i} className="mb-0.5 leading-relaxed break-words whitespace-pre-wrap">
            {line.startsWith('guest@') ? (
              <span className="text-blue-400 font-bold">
                {line.split('$')[0]}$ <span className="text-[#33ff00] font-normal">{line.split('$')[1]}</span>
              </span>
            ) : (
              <span className={line.startsWith('>>') ? 'text-[#33ff00]' : 'text-gray-400'}>{line}</span>
            )}
          </div>
        ))}

        <div className="relative">
          <form onSubmit={handleCommand} className="flex items-center gap-2 mt-1">
            <span className="text-blue-400 font-bold shrink-0">guest@prath-os:~$</span>
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              className="flex-1 bg-transparent border-none outline-none text-[#33ff00] font-mono p-0 focus:ring-0 caret-[#33ff00]"
              autoFocus
              autoComplete="off"
              spellCheck="false"
              aria-label="Terminal input"
            />
          </form>

          {suggestions.length > 0 && (
            <div className="absolute left-[175px] bottom-full mb-1 flex gap-2">
              {suggestions.map(s => (
                <button
                  key={s}
                  onClick={() => { setInput(s); setSuggestions([]); inputRef.current?.focus(); }}
                  className="text-[10px] font-bold bg-gray-800 text-[#CCFF00] px-2 py-0.5 rounded border border-gray-600 hover:bg-gray-700 transition-colors"
                >
                  {s} <span className="text-gray-500 text-[8px]">TAB</span>
                </button>
              ))}
            </div>
          )}
        </div>
        <div ref={bottomRef} />
      </div>
    </div>
  );
};

export default Terminal;