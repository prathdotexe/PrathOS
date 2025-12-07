import React from 'react';
import { Layout, Server, Brain, Terminal, Code2, Globe, Cpu, GitBranch } from 'lucide-react';

const SkillItem: React.FC<{ name: string; level: number; color: string }> = ({ name, level, color }) => (
  <div className="mb-3 last:mb-0 group">
    <div className="flex justify-between items-end mb-1">
      <span className="font-heading font-bold text-xs uppercase tracking-wide text-black group-hover:text-gray-700 transition-colors">{name}</span>
      <span className="font-mono text-[10px] font-bold text-gray-500">{level}%</span>
    </div>
    <div className="h-2.5 w-full bg-gray-100 rounded-full border border-black overflow-hidden relative shadow-[1px_1px_0px_0px_rgba(0,0,0,0.1)]">
      <div
        className={`h-full absolute top-0 left-0 ${color} border-r border-black transition-all duration-1000 ease-out group-hover:brightness-110`}
        style={{ width: `${level}%` }}
      />
      {/* Striped Pattern Overlay */}
      <div
        className="absolute inset-0 opacity-10"
        style={{ backgroundImage: 'linear-gradient(45deg, #000 25%, transparent 25%, transparent 50%, #000 50%, #000 75%, transparent 75%, transparent)', backgroundSize: '8px 8px' }}
      ></div>
    </div>
  </div>
);

const SkillCategory: React.FC<{
  title: string;
  icon: React.ElementType;
  skills: { name: string, level: number }[];
  color: string;
  headerColor: string;
}> = ({ title, icon: Icon, skills, color, headerColor }) => (
  <div className="bg-white border-[3px] border-black rounded-xl overflow-hidden shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex flex-col h-full hover:-translate-y-1 transition-transform duration-300">
    {/* Header */}
    <div className={`${headerColor} border-b-[3px] border-black p-3 flex items-center gap-3 relative overflow-hidden shrink-0`}>
      {/* Background decorative icon */}
      <Icon size={60} className="absolute -right-2 -top-2 opacity-10 text-black rotate-12" />

      <div className="bg-white border-2 border-black p-1.5 rounded-lg shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] relative z-10">
        <Icon size={16} className="text-black" />
      </div>
      <h3 className="font-heading font-black text-base uppercase tracking-wider text-black relative z-10">{title}</h3>
    </div>

    {/* Body */}
    <div className="p-4 bg-white flex-1">
      {skills.map(s => (
        <SkillItem key={s.name} name={s.name} level={s.level} color={color} />
      ))}
    </div>
  </div>
);

const Skills: React.FC = () => {
  return (
    <div className="h-full overflow-y-auto custom-scrollbar p-4 bg-[#FAFAFA]">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pb-2">
        <SkillCategory
          title="Frontend Engineering"
          icon={Layout}
          headerColor="bg-[#C4B5FD]"
          color="bg-[#8B5CF6]"
          skills={[
            { name: 'React / Next.js', level: 95 },
            { name: 'TypeScript', level: 92 },
            { name: 'Tailwind CSS', level: 98 },
            { name: 'Framer Motion', level: 85 }
          ]}
        />

        <SkillCategory
          title="Backend & System Design"
          icon={Server}
          headerColor="bg-[#FCA5A5]"
          color="bg-[#EF4444]"
          skills={[
            { name: 'Node.js / Express', level: 88 },
            { name: 'Python (FastAPI)', level: 87 },
            { name: 'PostgreSQL / SQL', level: 82 },
            { name: 'GoLang', level: 72 }
          ]}
        />

        <SkillCategory
          title="AI Engineering"
          icon={Brain}
          headerColor="bg-[#FCD34D]"
          color="bg-[#F59E0B]"
          skills={[
            { name: 'LLM Integration (OpenAI / Gemini)', level: 92 },
            { name: 'RAG Pipelines & Vector DBs', level: 88 },
            { name: 'LangChain / Flowise', level: 82 },
            { name: 'Prompt Engineering', level: 95 }
          ]}
        />

        <SkillCategory
          title="DevOps, Tooling & Infra"
          icon={Terminal}
          headerColor="bg-[#6EE7B7]"
          color="bg-[#10B981]"
          skills={[
            { name: 'Docker & Containerization', level: 82 },
            { name: 'Git / GitHub Actions', level: 90 },
            { name: 'AWS (EC2, S3, IAM Basics)', level: 70 },
            { name: 'Linux Systems & Shell', level: 78 }
          ]}
        />
      </div>
    </div>
  );
};

export default Skills;