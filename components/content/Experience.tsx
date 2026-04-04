import React, { useState } from 'react';
import { Calendar, Building2, Briefcase, GraduationCap, ArrowRight, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

type ExperienceType = 'internship' | 'education' | 'hackathon';

const TYPE_CONFIG: Record<ExperienceType, { label: string; color: string; icon: React.ElementType }> = {
  internship: { label: 'INTERNSHIP', color: 'bg-[#FCA5A5]', icon: Briefcase },
  education: { label: 'EDUCATION', color: 'bg-[#FCD34D]', icon: GraduationCap },
  hackathon: { label: 'HACKATHON', color: 'bg-[#93C5FD]', icon: Briefcase },
};

const ExperienceItem: React.FC<{
  title: string;
  company: string;
  date: string;
  type: ExperienceType;
  bullets: string[];
  roleDescription: string;
}> = ({ title, company, date, type, bullets, roleDescription }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const config = TYPE_CONFIG[type];

  return (
    <div className="relative pl-10 pb-8 last:pb-0">
      <div className="absolute left-[19px] top-0 bottom-0 w-[3px] bg-black/10" />

      <div className={`absolute left-0 top-0 w-10 h-10 rounded-xl border-[3px] border-black flex items-center justify-center z-10 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] ${config.color}`}>
        <config.icon size={18} className="text-black" />
      </div>

      {/* Interactive Card */}
      <div
        onClick={() => setIsExpanded(!isExpanded)}
        className="bg-white border-[3px] border-black rounded-xl overflow-hidden shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] cursor-pointer hover:-translate-y-0.5 transition-transform ml-4"
        role="button"
        aria-expanded={isExpanded}
      >
        {/* Header */}
        <div className="bg-gray-50 border-b-[3px] border-black p-4 flex flex-col sm:flex-row justify-between items-start gap-3">
          <div>
            <h3 className="font-heading font-black text-lg leading-tight text-black mb-1">{title}</h3>
            <div className="flex items-center gap-2 font-bold text-sm text-gray-600">
              <Building2 size={14} />
              <span className="uppercase tracking-wide">{company}</span>
            </div>
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            <span className={`text-[9px] font-black uppercase tracking-widest px-2 py-1 rounded ${config.color} border border-black/10`}>
              {config.label}
            </span>
            <div className="shrink-0 bg-black text-white px-3 py-1.5 rounded-lg font-bold text-xs uppercase tracking-wide flex items-center gap-2">
              <Calendar size={11} /> {date}
            </div>
            <div className={`transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}>
              <ChevronDown size={18} className="text-black" />
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
              <div className="p-5 border-t border-black/10">
                <p className="font-medium text-sm text-gray-500 mb-4 italic leading-relaxed max-w-prose">
                  "{roleDescription}"
                </p>
                <ul className="space-y-3">
                  {bullets.map((point, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm font-semibold text-gray-800 leading-relaxed">
                      <ArrowRight size={14} className="mt-1 shrink-0 text-black opacity-30" />
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
          <div className="px-4 py-2.5 text-[10px] text-gray-400 font-bold uppercase tracking-wider">
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
          date="Jun '25 – Aug '25"
          type="internship"
          roleDescription="Built automation and intelligence tools that improved sustainability data pipelines and cross-team visibility."
          bullets={[
            "Engineered the NET-O real-time sustainability dashboard, improving energy and emissions monitoring accuracy across departments.",
            "Developed an intelligent R&D file parsing system that automated data extraction, reducing manual processing time by 40%.",
            "Streamlined sustainability reporting pipelines, eliminating delays and reducing human error in monthly reports.",
            "Collaborated with senior engineers to design anomaly-detection alerts for early identification of operational deviations."
          ]}
        />

        <ExperienceItem
          title="Hackathon Finalist"
          company="IIT Delhi & IIT Ropar"
          date="2023 – 2024"
          type="hackathon"
          roleDescription="Competed in national-level hackathons, building functional prototypes under 24-48 hour deadlines."
          bullets={[
            "Secured finalist positions at multiple IIT-hosted hackathons with AI and full-stack solutions.",
            "Built rapid prototypes solving real-world problems in healthcare, sustainability, and education domains.",
            "Led cross-functional teams of 3–4, handling architecture decisions and demo delivery."
          ]}
        />

        <ExperienceItem
          title="B.Tech Computer Science"
          company="Lovely Professional Univ."
          date="2023 – Present"
          type="education"
          roleDescription="Exploring scalable systems, AI, and everything that makes computers do cool things efficiently."
          bullets={[
            "Focused on Full-Stack Engineering, Data Science, and system-level problem solving.",
            "Led team projects and hackathon squads — shipped 5+ production-grade applications.",
            "Key Coursework: Distributed Systems, DBMS, Operating Systems, Algorithms, Computer Networks."
          ]}
        />
      </div>
    </div>
  );
};

export default Experience;