import React, { useState } from 'react';
import { Calendar, Building2, Briefcase, GraduationCap, ArrowRight, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const ExperienceItem: React.FC<{
  title: string;
  company: string;
  date: string;
  type: 'work' | 'education';
  bullets: string[];
  roleDescription: string;
}> = ({ title, company, date, type, bullets, roleDescription }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="relative pl-10 pb-8 last:pb-0">
      <div className="absolute left-[19px] top-0 bottom-0 w-[3px] bg-black/10"></div>

      <div className={`absolute left-0 top-0 w-10 h-10 rounded-xl border-[3px] border-black flex items-center justify-center z-10 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] ${type === 'work' ? 'bg-[#FCA5A5]' : 'bg-[#FCD34D]'}`}>
        {type === 'work' ? <Briefcase size={18} className="text-black" /> : <GraduationCap size={20} className="text-black" />}
      </div>

      {/* Interactive Card */}
      <div
        onClick={() => setIsExpanded(!isExpanded)}
        className="bg-white border-[3px] border-black rounded-xl overflow-hidden shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] cursor-pointer hover:-translate-y-1 transition-transform ml-4"
      >
        {/* Header */}
        <div className="bg-gray-50 border-b-[3px] border-black p-4 flex flex-col sm:flex-row justify-between items-start gap-3">
          <div>
            <h3 className="font-heading font-black text-xl leading-tight text-black">{title}</h3>
            <div className="flex items-center gap-2 mt-1 font-bold text-sm text-gray-600">
              <Building2 size={14} />
              <span className="uppercase tracking-wide">{company}</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="shrink-0 bg-black text-white px-3 py-1.5 rounded-lg font-bold text-xs uppercase tracking-wide flex items-center gap-2">
              <Calendar size={12} /> {date}
            </div>
            <div className={`transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}>
              <ChevronDown size={20} className="text-black" />
            </div>
          </div>
        </div>

        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden"
            >
              <div className="p-6 border-t border-black/10">
                <p className="font-medium text-sm text-gray-600 mb-4 italic">
                  "{roleDescription}"
                </p>
                <ul className="space-y-3">
                  {bullets.map((point, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm font-bold text-gray-800 leading-relaxed">
                      <ArrowRight size={16} className="mt-1 shrink-0 text-black opacity-30" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Preview */}
        {!isExpanded && (
          <div className="px-4 py-3 text-xs text-gray-400 font-bold uppercase tracking-wider">
            Click to expand details
          </div>
        )}
      </div>
    </div>
  );
};

const Experience: React.FC = () => {
  return (
    <div className="h-full overflow-y-auto custom-scrollbar p-6">
      <div className="max-w-4xl mx-auto py-2">
        <ExperienceItem
          title="Technical Services Intern"
          company="Tata Motors Ltd."
          date="Jun '25 - Aug '25"
          type="work"
          roleDescription="Built automation and intelligence tools that improved sustainability data pipelines and cross-team visibility."
          bullets={[
            "Engineered the NET-O real-time sustainability dashboard, improving energy and emissions monitoring accuracy across departments.",
            "Developed an intelligent R&D file parsing system that automated data extraction and reduced manual processing time by over 40%.",
            "Streamlined sustainability data flows by automating reporting pipelines, eliminating delays and reducing human error.",
            "Collaborated with senior engineers to design anomaly-detection alerts, enabling early identification of operational deviations."
          ]}
        />

        <ExperienceItem
          title="B.Tech Computer Science"
          company="Lovely Professional Univ."
          date="2023 - Present"
          type="education"
          roleDescription="Exploring scalable systems, AI, and everything that makes computers do cool things efficiently."
          bullets={[
            "Focused on Full-Stack Engineering, Data Science, and system-level problem solving.",
            "Led team projects and hackathon squads—occasionally surviving on caffeine and deadlines.",
            "Key Coursework: Distributed Systems, DBMS, Operating Systems, Algorithms, Computer Networks."
          ]}
        />
      </div>
    </div>
  );
};

export default Experience;