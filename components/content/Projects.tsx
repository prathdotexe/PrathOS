import React, { useState } from 'react';
import { Github, ArrowUpRight, Layers, Trophy, ChevronLeft, ChevronRight } from 'lucide-react';

interface ProjectData {
    id: number;
    title: string;
    role: string;
    impact: string;
    stack: string[];
    color: string;
    description: string;
    githubUrl?: string;
    demoUrl?: string;
}

const PROJECTS_DATA: ProjectData[] = [
    // {
    //     id: 1,
    //     title: "PrathOS v1",
    //     role: "Frontend Architect",
    //     impact: "Sub-100ms render times via virtualization.",
    //     stack: ['React 18', 'TypeScript', 'Vite'],
    //     color: "bg-[#FCA5A5]",
    //     description: "A highly optimized desktop environment simulation for the web. Features a custom window manager, controlled z-indexing, and hardware-accelerated animations for a 60fps experience."
    // },
    // {
    //     id: 2,
    //     title: "Workflow AI",
    //     role: "Full Stack Lead",
    //     impact: "Automated 40% of manual data entry tasks.",
    //     stack: ['Next.js', 'Supabase', 'OpenAI API'],
    //     color: "bg-[#6EE7B7]",
    //     description: "An intelligent project management agent that parses natural language to generate Gantt charts and sub-tasks. Utilizes RAG for context-aware suggestions."
    // },
    // {
    //     id: 3,
    //     title: "Crypto Sentinel",
    //     role: "Backend Engineer",
    //     impact: "Latencies reduced to <50ms for live feeds.",
    //     stack: ['GoLang', 'Redis', 'WebSockets'],
    //     color: "bg-[#FCD34D]",
    //     description: "High-frequency arbitrage tracking engine. Processes real-time streams from 5+ exchanges concurrently to identify price discrepancies."
    // },
    // {
    //     id: 4,
    //     title: "Support Gen",
    //     role: "AI Engineer",
    //     impact: "Reduced support ticket volume by 25%.",
    //     stack: ['Python', 'FastAPI', 'VectorDB'],
    //     color: "bg-[#C4B5FD]",
    //     description: "A secure, enterprise-grade chatbot capable of querying internal SQL databases to answer customer support queries without human intervention."
    // },
    // {
    //     id: 5,
    //     title: "DevOps Dashboard",
    //     role: "Full Stack Developer",
    //     impact: "Cut deployment times by 30%.",
    //     stack: ['Vue.js', 'Node.js', 'Docker'],
    //     color: "bg-[#FDBA74]",
    //     description: "A unified dashboard for monitoring CI/CD pipelines, server health, and application logs. Integrates with popular DevOps tools for seamless workflow management."
    // }
    {
        id: 1,
        title: "PrathOS v1",
        role: "Web-Based Operating System Simulation",
        impact: "Sub-100ms render times via virtualization.",
        stack: ['React 18', 'TypeScript', 'Vite'],
        color: "bg-[#FCA5A5]",
        description: "A fully custom OS-style web environment powering my portfolio. Includes a multi-window desktop, a custom window manager, controlled z-indexing, and GPU-accelerated transitions for a smooth, 60fps interactive experience.",
        githubUrl: "https://github.com/prathdotexe/PrathOS"
    },

    {
        id: 2,
        title: "Sprout",
        role: "AI-Powered Plant Identification & Care System",
        impact: "Accurate plant detection with structured care guidance.",
        stack: ['React (TS)', 'Tailwind', 'Gemini Vision API'],
        color: "bg-[#6EE7B7]",
        description: "An AI-powered plant care assistant that identifies plants from images and generates care instructions. Features a persistent chat assistant and a 'My Garden' module for organizing user–identified plants.",
        githubUrl: "https://github.com/prathdotexe/SproutApp",
        demoUrl: "https://sprout.example.com"
    },

    {
        id: 3,
        title: "Astra AI",
        role: "RAG-Powered Scientific Assistant for Space Knowledge",
        impact: "Delivered strictly fact-grounded, hallucination-free responses.",
        stack: ['Python', 'FastAPI', 'VectorDB'],
        color: "bg-[#FCD34D]",
        description: "A domain-specialized RAG model for aerospace queries. Retrieves verified scientific data, processes embeddings, and produces real-time, evidence-backed answers through a custom interactive frontend.",
        githubUrl: "https://github.com/prathdotexe/AstraAI",
        demoUrl: "https://astraai.example.com"
    },

    {
        id: 4,
        title: "Clineta CRM",
        role: "AI-Augmented Customer Relationship Management Platform",
        impact: "Reduced manual follow-ups with automated workflows.",
        stack: ['React', 'Node.js', 'MongoDB', 'Tailwind'],
        color: "bg-[#C4B5FD]",
        description: "A modern CRM with an AI Insight Dashboard that predicts follow-up actions. Includes automated reminders, communication shortcuts, and a mobile-first, animation-rich UI.",
        githubUrl: "https://github.com/prathdotexe/ClinetaCRM",
        demoUrl: "https://clineta.example.com"
    },
    {
        id: 5,
        title: "CodeCollab",
        role: "Real-Time Collaborative Coding Platform",
        impact: "Enabled seamless multi-user code collaboration.",
        stack: ['Next.js', 'Socket.io', 'Monaco Editor'],
        color: "bg-[#FDBA74]",
        description: "A web-based IDE that allows multiple users to code together in real-time. Features syntax highlighting, live chat, and version control integration for an enhanced collaborative experience.",
        githubUrl: "https://github.com/prathdotexe/CodeCollab",
        demoUrl: "https://codecollab.example.com"
    }

];

const ProjectCard: React.FC<{ project: ProjectData }> = ({ project }) => (
    <div className="h-full flex flex-col bg-white border-[3px] border-black rounded-xl overflow-hidden shadow-[5px_5px_0px_0px_rgba(0,0,0,1)]">

        {/* Header / Banner */}
        <div className={`shrink-0 h-28 ${project.color} border-b-[3px] border-black p-6 flex items-center justify-between relative overflow-hidden`}>
            <div className="relative z-10">
                <h3 className="font-heading font-black text-3xl leading-none mb-2">{project.title}</h3>
                <span className="font-bold text-xs uppercase tracking-wider bg-black/10 px-2 py-1 rounded border border-black/5 text-black/90">
                    {project.role}
                </span>
            </div>
            <Layers size={80} className="opacity-10 absolute right-4 top-1/2 -translate-y-1/2" />
        </div>

        <div className="flex-1 p-6 flex flex-col overflow-y-auto custom-scrollbar bg-white">

            <p className="font-body text-base leading-relaxed text-gray-800 mb-6">
                {project.description}
            </p>

            <div className="bg-gray-50 border-2 border-black/10 rounded-xl p-4 mb-6 flex gap-4 items-center shrink-0">
                <div className="bg-white p-2 rounded-full border border-black/10 shadow-sm">
                    <Trophy className="text-[#F59E0B]" size={20} />
                </div>
                <div>
                    <span className="font-heading font-bold text-[10px] uppercase text-gray-500 block mb-0.5">Key Impact</span>
                    <span className="font-body text-base font-bold text-black leading-tight block">{project.impact}</span>
                </div>
            </div>

            {/* Tech Stack */}
            <div className="mt-auto">
                <div className="font-heading font-bold text-xs uppercase text-gray-500 mb-3">Tech Stack</div>
                <div className="flex flex-wrap gap-2">
                    {project.stack.map(tag => (
                        <span key={tag} className="text-xs font-bold border border-black px-3 py-1.5 rounded-lg bg-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] uppercase tracking-wide">
                            {tag}
                        </span>
                    ))}
                </div>
            </div>
        </div>

        {/* Actions Footer */}
        <div className="p-4 border-t-[3px] border-black bg-gray-50 shrink-0 grid grid-cols-2 gap-4">
            <button
                onClick={() => {
                    if (project.demoUrl) {
                        window.open(project.demoUrl, '_blank');
                    } else {
                        window.dispatchEvent(new CustomEvent('show-toast', { detail: { message: 'Demo not available', type: 'info' } }));
                    }
                }}
                className={`flex items-center justify-center gap-2 ${project.demoUrl ? 'bg-black text-white' : 'bg-white text-gray-400 cursor-not-allowed'} py-3 rounded-lg font-heading font-bold text-sm uppercase tracking-wide hover:bg-[#6EE7B7] hover:text-black hover:border-black border-2 border-transparent hover:border-black transition-colors shadow-md`}
                aria-disabled={!project.demoUrl}
            >
                View Demo <ArrowUpRight size={18} />
            </button>
            <button
                onClick={() => {
                    if (project.githubUrl) {
                        window.open(project.githubUrl, '_blank');
                    } else {
                        window.dispatchEvent(new CustomEvent('show-toast', { detail: { message: 'Code not available', type: 'info' } }));
                    }
                }}
                className={`flex items-center justify-center gap-2 ${project.githubUrl ? 'bg-white text-black border-2 border-black' : 'bg-white text-gray-400 cursor-not-allowed'} py-3 rounded-lg font-heading font-bold text-sm uppercase tracking-wide hover:bg-gray-100 transition-colors shadow-sm`}
                aria-disabled={!project.githubUrl}
            >
                Code <Github size={18} />
            </button>
        </div>
    </div>
);

const Projects: React.FC = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const nextProject = () => {
        setCurrentIndex((prev) => (prev + 1) % PROJECTS_DATA.length);
    };

    const prevProject = () => {
        setCurrentIndex((prev) => (prev - 1 + PROJECTS_DATA.length) % PROJECTS_DATA.length);
    };

    return (
        <div className="h-full flex flex-col overflow-hidden bg-[#FAFAFA]">
            <div className="flex-1 relative overflow-hidden px-6 pt-6 pb-4">
                <div className="h-full">
                    <ProjectCard project={PROJECTS_DATA[currentIndex]} />
                </div>
            </div>

            <div className="h-16 shrink-0 flex items-center justify-between px-8 border-t-2 border-black/5 bg-white">
                <button
                    onClick={prevProject}
                    className="w-10 h-10 flex items-center justify-center rounded-full bg-white border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-y-0.5 transition-all"
                    aria-label="Previous Project"
                >
                    <ChevronLeft size={20} />
                </button>

                <div className="flex flex-col items-center">
                    <span className="font-heading font-black text-lg">
                        {currentIndex + 1} <span className="text-gray-400 text-sm">/ {PROJECTS_DATA.length}</span>
                    </span>
                </div>

                <button
                    onClick={nextProject}
                    className="w-10 h-10 flex items-center justify-center rounded-full bg-white border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-y-0.5 transition-all"
                    aria-label="Next Project"
                >
                    <ChevronRight size={20} />
                </button>
            </div>
        </div>
    );
};

export default Projects;