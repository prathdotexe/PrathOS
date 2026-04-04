import React from 'react';
import { Download, MapPin, Sparkles, GraduationCap, Rocket, Trophy, Briefcase, ArrowRight } from 'lucide-react';

const AboutMe: React.FC = () => {
  return (
    <div className="h-full flex flex-col overflow-y-auto custom-scrollbar bg-white">

      {/* TOP SECTION */}
      <div className="flex flex-col sm:flex-row gap-6 p-6 pb-2 items-center sm:items-start">

        {/* PROFILE CARD */}
        <div className="shrink-0 flex flex-col gap-3 w-full sm:w-[160px]">
          <div className="relative aspect-square w-full rounded-xl overflow-hidden shadow-md bg-gray-100 group">
            <img
              src="/Subject.png"
              alt="Prathamesh Dhembre"
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80" />
            <div className="absolute bottom-3 left-3 text-white z-10">
              <div className="font-heading font-bold text-lg leading-none">Prathamesh</div>
              <div className="text-[10px] font-medium uppercase tracking-wider opacity-90 mt-1">
                Developer & Builder
              </div>
            </div>
          </div>

          <a
            href="/Resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full bg-black text-white py-2.5 px-4 rounded-lg flex items-center justify-between transition-transform hover:scale-[1.02] active:scale-95 shadow-md no-underline"
          >
            <span className="font-heading font-bold text-xs uppercase tracking-wider">Resume</span>
            <Download size={16} />
          </a>
        </div>

        {/* TEXT SECTION */}
        <div className="flex-1 flex flex-col pt-1 text-center sm:text-left">

          <h1 className="font-heading text-3xl sm:text-4xl font-black mb-3 leading-tight text-black">
            Engineering <br />
            <span className="text-[#6D28D9]">Scalable Systems</span> <br />
            & Interfaces.
          </h1>

          {/* Who I Am */}
          <div className="space-y-3 font-body text-base text-gray-700 font-medium leading-relaxed max-w-lg">
            <p>
              I'm{" "}
              <span className="font-bold text-black border-b-2 border-[#FCA5A5]">Prathamesh</span>,
              a CS student and full-stack developer specializing in{" "}
              <span className="font-bold text-black underline underline-offset-[3px] decoration-[#A78BFA]">
                data science
              </span>{" "}
              and{" "}
              <span className="font-bold text-black underline underline-offset-[3px] decoration-[#A78BFA]">
                generative AI
              </span>.
            </p>

            <p className="text-sm text-gray-600">
              I build robust backend pipelines, intuitive user interfaces, and practical AI tools that solve real problems.
            </p>
          </div>

          {/* Highlight Badges */}
          <div className="flex flex-wrap gap-2 mt-4 justify-center sm:justify-start">
            {[
              { icon: Rocket, label: '5+ Projects' },
              { icon: Briefcase, label: 'Tata Motors Intern' },
              { icon: Trophy, label: 'Hackathon Finalist' },
            ].map(badge => (
              <div key={badge.label} className="flex items-center gap-1.5 bg-gray-100 border border-black/10 px-3 py-1.5 rounded-lg">
                <badge.icon size={12} className="text-gray-500" />
                <span className="font-heading font-bold text-[10px] uppercase tracking-wider text-gray-600">{badge.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* INFO CARDS */}
      <div className="p-6 pt-3 grid grid-cols-1 sm:grid-cols-2 gap-3 w-full mt-auto">

        <div className="p-4 rounded-xl bg-[#F3F4F6] hover:bg-[#E5E7EB] transition-colors">
          <div className="flex items-center gap-2 mb-1">
            <MapPin size={14} className="text-gray-500" />
            <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">Location</span>
          </div>
          <span className="font-heading font-bold text-sm text-black">Pune, India</span>
        </div>

        <div className="p-4 rounded-xl bg-[#F3F4F6] hover:bg-[#E5E7EB] transition-colors">
          <div className="flex items-center gap-2 mb-1">
            <GraduationCap size={14} className="text-gray-500" />
            <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">Education</span>
          </div>
          <span className="font-heading font-bold text-sm text-black">B.Tech CS @ LPU</span>
        </div>

        <div className="p-4 rounded-xl bg-[#F3F4F6] hover:bg-[#E5E7EB] transition-colors">
          <div className="flex items-center gap-2 mb-1">
            <Sparkles size={14} className="text-gray-500" />
            <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">Currently</span>
          </div>
          <span className="font-heading font-bold text-sm text-black">Building AI-powered web apps</span>
        </div>

        <div className="col-span-1 sm:col-span-1 p-4 rounded-xl bg-[#6D28D9]/5 border border-[#6D28D9]/10 hover:bg-[#6D28D9]/10 transition-colors flex items-center justify-between group cursor-pointer">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <ArrowRight size={14} className="text-[#6D28D9]" />
              <span className="text-[10px] font-bold text-[#6D28D9] uppercase tracking-wider">Looking For</span>
            </div>
            <span className="font-heading font-bold text-sm text-black">
              Full-time & internship roles
            </span>
          </div>
        </div>

      </div>

    </div>
  );
};

export default AboutMe;