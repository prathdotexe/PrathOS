import React, { useState } from 'react';
import { Github, ArrowUpRight, Layers, Trophy, ChevronLeft, ChevronRight, Star, Users, Calendar, Tag } from 'lucide-react';

type ProjectCategory = 'All' | 'AI' | 'Web App' | 'Full Stack' | 'Hackathon';

interface ProjectData {
    id: number;
    title: string;
    role: string;
    problem: string;
    impact: string;
    stack: string[];
    color: string;
    description: string;
    githubUrl?: string;
    demoUrl?: string;
    featured: boolean;
    category: ProjectCategory[];
    teamSize: string;
    date: string;
    whatIDid?: string;
}

const PROJECTS_DATA: ProjectData[] = [
    {
        id: 1,
        title: "PrathOS",
        role: "Solo Developer",
        problem: "Portfolios look the same — needed a way to stand out while showcasing real engineering.",
        impact: "Sub-100ms render times with virtualized windows and GPU-accelerated transitions.",
        stack: ['React 18', 'TypeScript', 'Vite', 'Framer Motion', 'Tailwind'],
        color: "bg-[#FCA5A5]",
        description: "A fully custom OS-style web environment powering this portfolio. Features a multi-window desktop manager with controlled z-indexing, drag-snap, minimize/maximize, and 60fps animations.",
        githubUrl: "https://github.com/prathdotexe/PrathOS",
        demoUrl: "https://prathdotexe.github.io/PrathOS",
        featured: true,
        category: ['Web App', 'Full Stack'],
        teamSize: "Built solo",
        date: "2025",
        whatIDid: "Architected the entire window manager, state system, responsive mobile layout, and all content components from scratch."
    },
    {
        id: 2,
        title: "Sprout",
        role: "AI-Powered Plant Care System",
        problem: "Plant owners struggle to identify species and get structured care guidance.",
        impact: "Accurate plant detection with AI-generated care schedules and persistent garden tracking.",
        stack: ['React (TS)', 'Tailwind', 'Gemini Vision API'],
        color: "bg-[#6EE7B7]",
        description: "An AI-powered plant care assistant that identifies plants from images and generates care instructions. Features a persistent chat assistant and a 'My Garden' module for organizing identified plants.",
        githubUrl: "https://github.com/prathdotexe/SproutApp",
        demoUrl: "https://sprout-amber.vercel.app",
        featured: true,
        category: ['AI', 'Web App'],
        teamSize: "Built solo",
        date: "2024",
        whatIDid: "Built the full-stack app: Gemini Vision integration, chat interface, garden state management, and responsive UI."
    },
    {
        id: 3,
        title: "Astra AI",
        role: "RAG-Powered Scientific Assistant",
        problem: "General LLMs hallucinate on domain-specific science queries — needed fact-grounded responses.",
        impact: "Delivered strictly evidence-backed, hallucination-free space & science answers.",
        stack: ['Python', 'FastAPI', 'VectorDB', 'LangChain'],
        color: "bg-[#FCD34D]",
        description: "A domain-specialized RAG model for aerospace queries. Retrieves verified scientific data, processes embeddings, and produces real-time evidence-backed answers through a custom frontend.",
        githubUrl: "https://github.com/prathdotexe/AstraAI",
        demoUrl: "https://prathdotexe.github.io/AstraAI",
        featured: false,
        category: ['AI', 'Full Stack'],
        teamSize: "Built solo",
        date: "2024",
        whatIDid: "Designed the RAG pipeline, embedding strategy, retrieval logic, and interactive query frontend."
    },
    {
        id: 4,
        title: "Clineta CRM",
        role: "AI-Augmented CRM Platform",
        problem: "Small teams lose track of follow-ups — manual CRM workflows create gaps.",
        impact: "Reduced manual follow-ups with automated AI-driven workflow predictions.",
        stack: ['React', 'Node.js', 'MongoDB', 'Tailwind'],
        color: "bg-[#C4B5FD]",
        description: "A modern CRM with an AI Insight Dashboard that predicts follow-up actions. Includes automated reminders, communication shortcuts, and a mobile-first, animation-rich UI.",
        githubUrl: "https://github.com/prathdotexe/ClinetaCRM",
        demoUrl: "https://prathdotexe.github.io/ClinetaCRM",
        featured: false,
        category: ['Full Stack', 'AI'],
        teamSize: "Team of 3",
        date: "2024",
        whatIDid: "Led frontend architecture, built the AI insights dashboard, and designed the automated reminder system."
    },
    {
        id: 5,
        title: "CodeCollab",
        role: "Real-Time Collaborative IDE",
        problem: "Remote dev teams need live coding collaboration without context-switching tools.",
        impact: "Enabled seamless multi-user code editing with live chat and version tracking.",
        stack: ['Next.js', 'Socket.io', 'Monaco Editor'],
        color: "bg-[#FDBA74]",
        description: "A web-based IDE that allows multiple users to code together in real-time. Features syntax highlighting, live chat, and version control integration.",
        githubUrl: "https://github.com/prathdotexe/CodeCollab",
        demoUrl: "https://prathdotexe.github.io/CodeCollab",
        featured: false,
        category: ['Web App', 'Full Stack'],
        teamSize: "Team of 2",
        date: "2024",
        whatIDid: "Built the real-time sync engine using WebSockets and the Monaco Editor integration."
    }
];

const ProjectCard: React.FC<{ project: ProjectData; isFeatured?: boolean }> = ({ project, isFeatured }) => (
    <div className={`h-full flex flex-col bg-white border-[3px] border-black rounded-xl overflow-hidden shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] ${isFeatured ? 'ring-2 ring-[#6D28D9]/20' : ''}`}>

        {/* Header / Banner */}
        <div className={`shrink-0 ${isFeatured ? 'h-32' : 'h-28'} ${project.color} border-b-[3px] border-black p-5 flex flex-col justify-between relative overflow-hidden`}>
            <div className="relative z-10 flex items-start justify-between">
                <div>
                    <div className="flex items-center gap-2 mb-1.5">
                        {isFeatured && <Star size={14} fill="currentColor" className="text-black/60" />}
                        <h3 className="font-heading font-black text-2xl sm:text-3xl leading-none">{project.title}</h3>
                    </div>
                    <span className="font-bold text-xs uppercase tracking-wider bg-black/10 px-2 py-1 rounded border border-black/5 text-black/80">
                        {project.role}
                    </span>
                </div>
            </div>
            <div className="relative z-10 flex items-center gap-3 text-[10px] font-bold uppercase tracking-wider text-black/50">
                <span className="flex items-center gap-1"><Calendar size={10} />{project.date}</span>
                <span className="flex items-center gap-1"><Users size={10} />{project.teamSize}</span>
            </div>
            <Layers size={80} className="opacity-10 absolute right-4 top-1/2 -translate-y-1/2" />
        </div>

        <div className="flex-1 p-5 flex flex-col overflow-y-auto custom-scrollbar bg-white">
            {/* Category Tags */}
            <div className="flex flex-wrap gap-1.5 mb-3">
                {project.category.map(cat => (
                    <span key={cat} className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-gray-100 border border-black/5 text-gray-500 flex items-center gap-1">
                        <Tag size={8} />{cat}
                    </span>
                ))}
            </div>

            {/* Problem → Solution */}
            <p className="font-body text-sm leading-relaxed text-gray-600 mb-2">
                <span className="font-bold text-black">Problem:</span> {project.problem}
            </p>
            <p className="font-body text-sm leading-relaxed text-gray-800 mb-4">
                {project.description}
            </p>

            {/* What I Did (for team projects) */}
            {project.whatIDid && project.teamSize !== 'Built solo' && (
                <div className="bg-[#6D28D9]/5 border border-[#6D28D9]/10 rounded-lg p-3 mb-4">
                    <span className="font-heading font-bold text-[10px] uppercase text-[#6D28D9] block mb-1">My Contribution</span>
                    <span className="font-body text-xs font-medium text-gray-700 leading-relaxed">{project.whatIDid}</span>
                </div>
            )}

            {/* Impact */}
            <div className="bg-gray-50 border-2 border-black/10 rounded-lg p-3 mb-4 flex gap-3 items-center shrink-0">
                <div className="bg-white p-1.5 rounded-full border border-black/10 shadow-sm">
                    <Trophy className="text-[#F59E0B]" size={16} />
                </div>
                <div>
                    <span className="font-heading font-bold text-[10px] uppercase text-gray-500 block mb-0.5">Key Impact</span>
                    <span className="font-body text-sm font-bold text-black leading-tight block">{project.impact}</span>
                </div>
            </div>

            {/* Tech Stack */}
            <div className="mt-auto">
                <div className="font-heading font-bold text-[10px] uppercase text-gray-400 mb-2">Tech Stack</div>
                <div className="flex flex-wrap gap-1.5">
                    {project.stack.map(tag => (
                        <span key={tag} className="text-[10px] font-bold border border-black px-2.5 py-1 rounded-lg bg-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] uppercase tracking-wide">
                            {tag}
                        </span>
                    ))}
                </div>
            </div>
        </div>

        {/* Actions Footer */}
        <div className="p-4 border-t-[3px] border-black bg-gray-50 shrink-0 flex gap-3">
            {project.githubUrl && (
                <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-2 bg-white text-black border-2 border-black py-2.5 rounded-lg font-heading font-bold text-xs uppercase tracking-wide hover:bg-gray-100 transition-colors shadow-sm"
                >
                    <Github size={16} /> Code
                </a>
            )}
            {project.demoUrl && (
                <a
                    href={project.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-2 bg-black text-white py-2.5 rounded-lg font-heading font-bold text-xs uppercase tracking-wide hover:bg-[#6EE7B7] hover:text-black border-2 border-transparent hover:border-black transition-colors shadow-md"
                >
                    <ArrowUpRight size={16} /> Live Demo
                </a>
            )}
        </div>
    </div>
);

const Projects: React.FC = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [activeFilter, setActiveFilter] = useState<ProjectCategory>('All');

    const filteredProjects = activeFilter === 'All'
        ? PROJECTS_DATA
        : PROJECTS_DATA.filter(p => p.category.includes(activeFilter));

    const featuredProjects = filteredProjects.filter(p => p.featured);
    const otherProjects = filteredProjects.filter(p => !p.featured);
    const allDisplayed = [...featuredProjects, ...otherProjects];

    const currentProject = allDisplayed[currentIndex] || allDisplayed[0];

    const nextProject = () => {
        setCurrentIndex((prev) => (prev + 1) % allDisplayed.length);
    };

    const prevProject = () => {
        setCurrentIndex((prev) => (prev - 1 + allDisplayed.length) % allDisplayed.length);
    };

    const handleFilterChange = (filter: ProjectCategory) => {
        setActiveFilter(filter);
        setCurrentIndex(0);
    };

    const categories: ProjectCategory[] = ['All', 'AI', 'Web App', 'Full Stack'];

    return (
        <div className="h-full flex flex-col overflow-hidden bg-[#FAFAFA]">
            {/* Filter Bar */}
            <div className="shrink-0 flex items-center gap-2 px-6 pt-4 pb-2 overflow-x-auto">
                {categories.map(cat => (
                    <button
                        key={cat}
                        onClick={() => handleFilterChange(cat)}
                        className={`px-3 py-1.5 rounded-lg font-heading font-bold text-xs uppercase tracking-wider border-2 transition-all whitespace-nowrap ${activeFilter === cat
                                ? 'bg-black text-white border-black'
                                : 'bg-white text-gray-500 border-black/10 hover:border-black/30'
                            }`}
                    >
                        {cat}
                    </button>
                ))}
            </div>

            {/* Project Card */}
            <div className="flex-1 relative overflow-hidden px-6 pt-2 pb-4">
                <div className="h-full">
                    {currentProject && (
                        <ProjectCard
                            project={currentProject}
                            isFeatured={currentProject.featured}
                        />
                    )}
                </div>
            </div>

            {/* Navigation */}
            <div className="h-14 shrink-0 flex items-center justify-between px-8 border-t-2 border-black/5 bg-white">
                <button
                    onClick={prevProject}
                    className="w-9 h-9 flex items-center justify-center rounded-full bg-white border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-y-0.5 transition-all"
                    aria-label="Previous Project"
                >
                    <ChevronLeft size={18} />
                </button>

                <div className="flex flex-col items-center">
                    <span className="font-heading font-black text-base">
                        {currentIndex + 1} <span className="text-gray-400 text-xs">/ {allDisplayed.length}</span>
                    </span>
                    {currentProject?.featured && (
                        <span className="text-[8px] font-bold uppercase tracking-wider text-[#6D28D9]">★ Featured</span>
                    )}
                </div>

                <button
                    onClick={nextProject}
                    className="w-9 h-9 flex items-center justify-center rounded-full bg-white border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-y-0.5 transition-all"
                    aria-label="Next Project"
                >
                    <ChevronRight size={18} />
                </button>
            </div>
        </div>
    );
};

export default Projects;