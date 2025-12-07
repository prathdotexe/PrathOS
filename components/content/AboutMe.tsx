import React from 'react';
import { Download, MapPin, Sparkles, ArrowRight, Terminal } from 'lucide-react';

const AboutMe: React.FC = () => {
  return (
    <div className="h-full flex flex-col overflow-y-auto custom-scrollbar bg-white">

      {/* TOP SECTION */}
      <div className="flex flex-col sm:flex-row gap-6 p-6 pb-1 items-center sm:items-start">

        {/* PROFILE CARD */}
        <div className="shrink-0 flex flex-col gap-3 w-full sm:w-[160px]">
          <div className="relative aspect-square w-full rounded-xl overflow-hidden shadow-md bg-gray-100 group">
            <img
              src="pic.jpeg"
              alt="Profile"
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80"></div>

            <div className="absolute bottom-3 left-3 text-white z-10">
              <div className="font-heading font-bold text-lg leading-none">Prathamesh</div>
              <div className="text-[10px] font-medium uppercase tracking-wider opacity-90 mt-1">
                Developer
              </div>
            </div>
          </div>

          <button className="w-full bg-black text-white py-2.5 px-4 rounded-lg flex items-center justify-between transition-transform hover:scale-[1.02] active:scale-95 shadow-md">
            <a
              href="resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between w-full"
            >
              <span className="font-heading font-bold text-xs uppercase tracking-wider">
                Resume
              </span>
              <Download size={16} />
            </a>
          </button>
        </div>

        {/* TEXT SECTION */}
        <div className="flex-1 flex flex-col pt-1 text-center sm:text-left">

          <h1 className="font-heading text-3xl sm:text-4xl font-black mb-3 leading-tight text-black">
            Engineering <br />
            <span className="text-[#6D28D9]">Scalable Systems</span> <br />
            & Interfaces.
          </h1>

          {/* SUPER SHORT VERSION */}
          <div className="space-y-3 font-body text-base text-gray-700 font-medium leading-relaxed">

            <p>
              Hey! I'm{" "}
              <span className="font-bold text-black border-b-2 border-[#FCA5A5]">
                Prathamesh
              </span>
              —a developer who enjoys turning ideas into clean, reliable, and intuitive software.
            </p>

            <p>
              I build systems where{" "}
              <span className="font-bold text-black underline underline-offset-[3px] decoration-[#A78BFA]">
                distributed systems
              </span>{" "}
              meet{" "}
              <span className="font-bold text-black underline underline-offset-[3px] decoration-[#A78BFA]">
                generative AI
              </span>
              , focusing on{" "}
              <span className="font-bold text-black">robust backend architectures</span>{" "}
              and{" "}
              <span className="font-bold text-black border-b-2 border-[#FCA5A5]">
                intuitive user experiences
              </span>
              .
            </p>

          </div>
        </div>
      </div>

      {/* INFO CARDS */}
      <div className="p-6 pt-3 grid grid-cols-1 sm:grid-cols-2 gap-3 w-full mt-auto">

        <div className="p-4 rounded-xl bg-[#F3F4F6] hover:bg-[#E5E7EB] transition-colors">
          <div className="flex items-center gap-2 mb-1">
            <MapPin size={16} className="text-gray-500" />
            <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">
              Location
            </span>
          </div>
          <span className="font-heading font-bold text-base text-black">Pune, India</span>
        </div>

        <div className="p-4 rounded-xl bg-[#F3F4F6] hover:bg-[#E5E7EB] transition-colors">
          <div className="flex items-center gap-2 mb-1">
            <Terminal size={16} className="text-gray-500" />
            <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">
              Education
            </span>
          </div>
          <span className="font-heading font-bold text-base text-black">
            B.Tech Computer Science
          </span>
        </div>

        <div className="col-span-1 sm:col-span-2 p-4 rounded-xl bg-[#F3F4F6] hover:bg-[#E5E7EB] transition-colors flex items-center justify-between group cursor-pointer">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Sparkles size={16} className="text-gray-500" />
              <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">
                Focus
              </span>
            </div>
            <span className="font-heading font-bold text-base text-black">
              System Design & AI Engineering
            </span>
          </div>

          <ArrowRight
            className="text-black opacity-0 group-hover:opacity-100 transition-all transform -translate-x-2 group-hover:translate-x-0"
            size={20}
          />
        </div>

      </div>

    </div>
  );
};

export default AboutMe;