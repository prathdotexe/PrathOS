import React, { useState, useRef, useEffect } from 'react';

const Terminal: React.FC = () => {
  const [history, setHistory] = useState<string[]>([
    "Welcome to PrathOS v1.0.0",
    "Type 'help' to explore available commands."
  ]);
  const [input, setInput] = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const QUOTES = [
    ">> “Programs must be written for people to read.” – Harold Abelson",
    ">> “Talk is cheap. Show me the code.” – Linus Torvalds",
    ">> “Simplicity is the soul of efficiency.” – Austin Freeman",
    ">> “First, solve the problem. Then, write the code.” – John Johnson",
    ">> “Experience is the name everyone gives to their mistakes.” – Oscar Wilde",
    ">> “Code is like humor. When you have to explain it, it’s bad.” – Cory House",
    ">> “Fix the cause, not the symptom.” – Steve Maguire",
    ">> “Make it work, make it right, make it fast.” – Kent Beck",
    ">> “Deleted code is debugged code.” – Jeff Sickel",
    ">> “Before software can be reusable it first has to be usable.” – Ralph Johnson"
  ];

  const MOTD = [
    ">> “Code is poetry; write something beautiful today.”",
    ">> “In a world without fences, who needs gates?”",
    ">> “Keep calm and code on.”",
    ">> “Eat, Sleep, Code, Repeat.”",
    ">> “There’s no place like 127.0.0.1”",
    ">> “To err is human; to debug, divine.",
  ];

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const cmd = input.trim().toLowerCase();
    const newHistory = [...history, `guest@prath-os:~$ ${input}`];

    const respond = (lines: string[]) => {
      setHistory([...newHistory, ...lines]);
    };

    switch (cmd) {
      case "help":
        respond([
          "  about       - Developer summary",
          "  education   - Academic info",
          "  quote       - Random dev quote",
          "  neofetch    - PrathOS system info",
          "  motd        - Message of the day",
          "  whoami      - Identify yourself",
          "  clear       - Clear terminal"
        ]);
        break;

      case "about":
        respond([
          ">> Hi, I'm Prathamesh Dhembre, a passionate software developer specializing in full-stack web development and systems programming.",
          ">> I love building efficient, scalable applications and exploring new technologies.",
          ">> Currently pursuing a B.Tech in Computer Science at Lovely Professional University."
        ]);
        break;

      case "education":
        respond([
          ">> B.Tech CSE | Lovely Professional Univ.",
          ">> Focus: AI, Systems Engineering, Distributed Computing"
        ]);
        break;

      case "motd":
        const randomMotdIndex = Math.floor(Math.random() * MOTD.length);
        respond([MOTD[randomMotdIndex]]);
        break;

      case "quote":
        const randomIndex = Math.floor(Math.random() * QUOTES.length);
        respond([QUOTES[randomIndex]]);
        break;

      case "neofetch":
        respond([
          ">> OS: PrathOS v1.0",
          ">> Kernel: React 18",
          ">> CPU: Human Brain (Turbo Mode)",
          ">> GPU: Coffee-Boosted Rendering Engine",
          ">> Memory: 32GB Ideas | 1TB Ambition"
        ]);
        break;

      case "whoami":
        respond([
          ">> You are a curious soul exploring the depths of PrathOS.",
          ">> A seeker of knowledge, a coder of dreams, and a future tech innovator.",
          ">> Remember: with great power comes great responsibility. Use your coding powers wisely!"
        ]);
        break;

      case "clear":
        setHistory([]);
        setInput("");
        return;

      default:
        respond([`Command not found: ${cmd}. Type 'help' for assistance.`]);
    }

    setInput("");
  };

  return (
    <div
      className="h-full bg-[#1e1e1e] text-[#33ff00] font-mono text-sm p-4 overflow-y-auto custom-scrollbar relative flex flex-col"
      onClick={() => inputRef.current?.focus()}
    >
      {/* Scanline effect */}
      <div className="absolute inset-0 pointer-events-none opacity-10"
        style={{
          background:
            'linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.25) 50%),' +
            'linear-gradient(90deg, rgba(255, 0, 0, 0.06),' +
            'rgba(0, 255, 0, 0.02), rgba(0, 0, 255, 0.06))',
          backgroundSize: '100% 2px, 3px 100%'
        }}
      ></div>

      <div className="flex-1 z-10">
        {history.map((line, i) => (
          <div key={i} className="mb-1 leading-relaxed break-words">
            {line.startsWith('guest@')
              ? (
                <span className="text-blue-400 font-bold">
                  {line.split('$')[0]}$
                  <span className="text-[#33ff00] font-normal">
                    {line.split('$')[1]}
                  </span>
                </span>
              )
              : line
            }
          </div>
        ))}

        <form onSubmit={handleCommand} className="flex items-center gap-2 mt-2">
          <span className="text-blue-400 font-bold shrink-0">guest@prath-os:~$</span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 bg-transparent outline-none text-[#33ff00] caret-[#33ff00]"
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
