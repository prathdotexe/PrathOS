import React from 'react';
import { Mail, Github, Linkedin, Download, ExternalLink, Send, Copy, Briefcase } from 'lucide-react';

const SocialLink: React.FC<{ icon: React.ElementType; label: string; href: string; color: string; isAction?: boolean; onClick?: () => void }> = ({ icon: Icon, label, href, color, isAction, onClick }) => (
  <a
    href={isAction ? undefined : href}
    onClick={onClick}
    target={isAction ? undefined : "_blank"}
    rel={isAction ? undefined : "noopener noreferrer"}
    className="flex items-center justify-between p-4 bg-white border-[3px] border-black rounded-xl shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-0.5 transition-transform group cursor-pointer"
  >
    <div className="flex items-center gap-3">
      <div className={`w-9 h-9 ${color} border-2 border-black rounded-lg flex items-center justify-center`}>
        <Icon size={16} className="text-black" />
      </div>
      <span className="font-heading font-bold text-sm">{label}</span>
    </div>
    {isAction ? (
      <Copy size={16} className="text-gray-400 group-hover:text-black transition-colors" />
    ) : (
      <ExternalLink size={16} className="text-gray-400 group-hover:text-black transition-colors" />
    )}
  </a>
);

const Contact: React.FC = () => {
  const handleCopyEmail = () => {
    navigator.clipboard.writeText('dhembreprathamesh10@gmail.com');
    window.dispatchEvent(new CustomEvent('show-toast', { detail: { message: 'Email copied to clipboard!', type: 'success' } }));
  };

  return (
    <div className="h-full flex flex-col overflow-y-auto custom-scrollbar p-6">
      {/* Header */}
      <div className="text-center mb-6 mt-1">
        <h2 className="font-heading font-black text-3xl mb-2">Let's Work Together</h2>
        <p className="font-body text-sm font-medium text-gray-500 max-w-sm mx-auto leading-relaxed">
          Best for internships, freelance projects, and technical collaboration.
        </p>
      </div>

      {/* Availability Badge */}
      <div className="flex items-center justify-center gap-2 bg-[#F0FFF4] border border-[#6EE7B7] px-4 py-2.5 rounded-lg mb-6 mx-auto">
        <div className="w-2 h-2 bg-[#27C93F] rounded-full animate-pulse" />
        <span className="font-heading font-bold text-xs uppercase tracking-wider text-[#065F46]">
          Available for Summer 2026 opportunities
        </span>
      </div>

      {/* Quick Actions Row */}
      <div className="grid grid-cols-2 gap-3 mb-6">
        <a
          href="/Resume.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 bg-black text-white py-3 rounded-xl font-heading font-bold text-xs uppercase tracking-wider border-[3px] border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-0.5 hover:shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] transition-all"
        >
          <Download size={16} /> Resume
        </a>
        <a
          href="mailto:dhembreprathamesh10@gmail.com"
          className="flex items-center justify-center gap-2 bg-[#FCA5A5] text-black py-3 rounded-xl font-heading font-bold text-xs uppercase tracking-wider border-[3px] border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-0.5 hover:shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] transition-all"
        >
          <Send size={16} /> Email Me
        </a>
      </div>

      {/* Social Links */}
      <div className="space-y-3 mb-4">
        <SocialLink
          icon={Linkedin}
          label="LinkedIn Profile"
          href="https://www.linkedin.com/in/dprathamessh/"
          color="bg-[#0077B5]/20"
        />
        <SocialLink
          icon={Github}
          label="GitHub Profile"
          href="https://github.com/prathdotexe/"
          color="bg-gray-200"
        />
        <SocialLink
          icon={Mail}
          label="Copy Email Address"
          href="#"
          color="bg-[#C4B5FD]"
          isAction
          onClick={handleCopyEmail}
        />
      </div>
    </div>
  );
};

export default Contact;