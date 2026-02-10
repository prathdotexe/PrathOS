import React from 'react';
import { Trophy, Medal, Star } from 'lucide-react';

interface Achievement {
  title: string;
  org: string;
  date: string;
  description: string;
  icon: React.ElementType;
  color: string;
}

const ACHIEVEMENTS: Achievement[] = [
  {
    title: "AI Application Developer",
    org: "Independent / Academic Projects",
    date: "2024",
    description: "Developed multiple AI-powered, production-ready applications addressing real-world problem statements.",
    icon: Trophy,
    color: "bg-[#86EFAC]"
  },
  {
    title: "Industrial Automation Developer",
    org: "Tata Motors Chennai Plant",
    date: "2024",
    description: "Designed and implemented automation dashboards and applications deployed in the Tata Motors Chennai plant environment.",
    icon: Medal,
    color: "bg-[#7DD3FC]"
  },
  {
    title: "Hackathon Finalist & Competitor",
    org: "IIT Delhi & IIT Ropar",
    date: "2023–2024",
    description: "Participated and secured ranks in multiple hackathons conducted by IIT Delhi and IIT Ropar.",
    icon: Trophy,
    color: "bg-[#FCA5A5]"
  },
  {
    title: "Published Research Author",
    org: "IOSR Journals",
    date: "2023",
    description: "Research paper accepted titled “Operating Systems: CPU Scheduling.”",
    icon: Medal,
    color: "bg-[#FDBA74]"
  }
];

const Achievements: React.FC = () => {
  return (
    <div className="h-full flex flex-col overflow-y-auto custom-scrollbar bg-white p-6">
      <div className="mb-8">
        <h2 className="font-heading font-black text-xs uppercase tracking-[0.2em] text-gray-400 mb-6 flex items-center gap-2">
          <Star size={14} className="text-[#FFD60A]" fill="currentColor" />
          Hall of Fame
        </h2>

        <div className="grid grid-cols-1 gap-4">
          {ACHIEVEMENTS.map((ach, idx) => (
            <div
              key={idx}
              className="group relative bg-white border-[3px] border-black rounded-xl p-5 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 transition-transform"
            >
              <div className="flex gap-4 items-start relative z-10">
                <div className={`shrink-0 w-12 h-12 ${ach.color} border-2 border-black rounded-lg flex items-center justify-center shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] group-hover:rotate-12 transition-transform`}>
                  <ach.icon size={24} className="text-black" />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start mb-1">
                    <h3 className="font-heading font-black text-lg leading-tight">{ach.title}</h3>
                    <span className="text-[10px] font-bold bg-black text-white px-2 py-1 rounded">{ach.date}</span>
                  </div>
                  <div className="font-heading font-bold text-xs text-gray-500 uppercase tracking-wide mb-2">@{ach.org}</div>
                  <p className="font-body text-sm text-gray-700 leading-relaxed font-medium">{ach.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Achievements;