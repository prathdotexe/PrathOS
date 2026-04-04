import React from 'react';
import { Layout, Server, Brain, Terminal, Lightbulb } from 'lucide-react';

interface SkillEntry {
  name: string;
  usedIn?: string;
}

const SkillCategory: React.FC<{
  title: string;
  icon: React.ElementType;
  skills: SkillEntry[];
  headerColor: string;
}> = ({ title, icon: Icon, skills, headerColor }) => (
  <div className="bg-white border-[3px] border-black rounded-xl overflow-hidden shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex flex-col h-full hover:-translate-y-0.5 transition-transform duration-300">
    {/* Header */}
    <div className={`${headerColor} border-b-[3px] border-black p-3 flex items-center gap-3 relative overflow-hidden shrink-0`}>
      <Icon size={50} className="absolute -right-1 -top-1 opacity-10 text-black rotate-12" />
      <div className="bg-white border-2 border-black p-1.5 rounded-lg shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] relative z-10">
        <Icon size={14} className="text-black" />
      </div>
      <h3 className="font-heading font-black text-sm uppercase tracking-wider text-black relative z-10">{title}</h3>
    </div>

    {/* Body */}
    <div className="p-4 bg-white flex-1 flex flex-wrap gap-2 content-start">
      {skills.map(s => (
        <div key={s.name} className="group relative">
          <span className="inline-block px-3 py-1.5 bg-gray-50 border border-black/10 rounded-lg font-heading font-bold text-xs uppercase tracking-wide text-black hover:bg-black hover:text-white transition-colors cursor-default">
            {s.name}
          </span>
          {s.usedIn && (
            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50">
              <span className="bg-black text-[#CCFF00] text-[9px] font-bold px-2 py-1 rounded whitespace-nowrap">
                Used in {s.usedIn}
              </span>
            </div>
          )}
        </div>
      ))}
    </div>
  </div>
);

const Skills: React.FC = () => {
  return (
    <div className="h-full overflow-y-auto custom-scrollbar p-4 bg-[#FAFAFA]">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pb-2">
        <SkillCategory
          title="Frontend"
          icon={Layout}
          headerColor="bg-[#C4B5FD]"
          skills={[
            { name: 'React / Next.js', usedIn: 'PrathOS, Clineta' },
            { name: 'TypeScript', usedIn: 'PrathOS, Sprout' },
            { name: 'Tailwind CSS', usedIn: 'All projects' },
            { name: 'Framer Motion', usedIn: 'PrathOS' },
            { name: 'HTML / CSS' },
          ]}
        />

        <SkillCategory
          title="Backend & Systems"
          icon={Server}
          headerColor="bg-[#FCA5A5]"
          skills={[
            { name: 'Node.js / Express', usedIn: 'CodeCollab, Clineta' },
            { name: 'Python / FastAPI', usedIn: 'Astra AI' },
            { name: 'PostgreSQL / SQL' },
            { name: 'MongoDB', usedIn: 'Clineta CRM' },
            { name: 'Socket.io', usedIn: 'CodeCollab' },
          ]}
        />

        <SkillCategory
          title="AI & LLM"
          icon={Brain}
          headerColor="bg-[#FCD34D]"
          skills={[
            { name: 'LLM Integration (Gemini / OpenAI)', usedIn: 'Sprout, Astra AI' },
            { name: 'RAG Pipelines & Vector DBs', usedIn: 'Astra AI' },
            { name: 'LangChain / Flowise' },
            { name: 'Prompt Engineering' },
          ]}
        />

        <SkillCategory
          title="DevOps & Tools"
          icon={Terminal}
          headerColor="bg-[#6EE7B7]"
          skills={[
            { name: 'Docker & Containers' },
            { name: 'Git / GitHub Actions' },
            { name: 'AWS (EC2, S3 basics)' },
            { name: 'Linux / Shell' },
            { name: 'Vite / Webpack', usedIn: 'PrathOS' },
          ]}
        />
      </div>

      {/* Currently Exploring */}
      <div className="mt-4 bg-white border-[3px] border-black rounded-xl p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
        <div className="flex items-center gap-2 mb-3">
          <div className="bg-[#FFD60A] border-2 border-black p-1.5 rounded-lg shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
            <Lightbulb size={14} className="text-black" />
          </div>
          <h3 className="font-heading font-black text-sm uppercase tracking-wider text-black">Currently Exploring</h3>
        </div>
        <div className="flex flex-wrap gap-2">
          {['Go (Golang)', 'Advanced Cloud (AWS/GCP)', 'Retrieval-Augmented Systems', 'System Design Patterns'].map(item => (
            <span key={item} className="px-3 py-1.5 bg-[#FFD60A]/10 border border-[#FFD60A]/30 rounded-lg font-heading font-bold text-xs uppercase tracking-wide text-gray-700">
              {item}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Skills;