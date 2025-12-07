import React from 'react';
import { Mail, Github, Linkedin, Calendar, Download, ExternalLink, MessageCircle, Send, Copy } from 'lucide-react';

const QuickAction: React.FC<{ icon: React.ElementType; label: string; sub: string; color: string; onClick?: () => void }> = ({ icon: Icon, label, sub, color, onClick }) => (
  <button
    onClick={onClick}
    className="flex-1 min-w-[140px] bg-white border-[3px] border-black rounded-xl p-5 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 transition-transform text-left"
  >
    <div className={`w-10 h-10 ${color} border-2 border-black rounded-lg flex items-center justify-center mb-3`}>
      <Icon size={20} className="text-black" />
    </div>
    <div className="font-heading font-black text-lg leading-none mb-1">{label}</div>
    <div className="font-body text-xs font-bold text-gray-500 uppercase tracking-wide">{sub}</div>
  </button>
);

const SocialLink: React.FC<{ icon: React.ElementType; label: string; href: string; color: string; isAction?: boolean; onClick?: () => void }> = ({ icon: Icon, label, href, color, isAction, onClick }) => (
  <a
    href={isAction ? undefined : href}
    onClick={onClick}
    target={isAction ? undefined : "_blank"}
    rel={isAction ? undefined : "noopener noreferrer"}
    className="flex items-center justify-between p-5 bg-white border-[3px] border-black rounded-xl shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 transition-transform group cursor-pointer"
  >
    <div className="flex items-center gap-4">
      <div className={`w-9 h-9 ${color} border-2 border-black rounded-lg flex items-center justify-center`}>
        <Icon size={18} className="text-black" />
      </div>
      <span className="font-heading font-bold text-base">{label}</span>
    </div>
    {isAction ? (
      <Copy size={18} className="text-gray-400 group-hover:text-black transition-colors" />
    ) : (
      <ExternalLink size={18} className="text-gray-400 group-hover:text-black transition-colors" />
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
      <div className="text-center mb-8 mt-2">
        <h2 className="font-heading font-black text-4xl mb-3">Let's Work Together</h2>
        <p className="font-body text-base font-medium text-gray-600 max-w-lg mx-auto leading-relaxed">
          I'm currently looking for full-time opportunities. Whether you have a question or just want to say hi, I'll try my best to get back to you!
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <QuickAction
          icon={Download}
          label="Resume"
          sub="Download PDF"
          color="bg-[#C4B5FD]"
          //onClick={() => {
          //window.dispatchEvent(new CustomEvent('show-toast', { detail: { message: 'Downloading Resume...', type: 'info' } }));
          //}}
          onClick={() => window.open('resume.pdf', '_blank')}
        />
        <QuickAction
          icon={Calendar}
          label="Meeting"
          sub="Schedule Call"
          color="bg-[#6EE7B7]"
          onClick={() => window.open('https://calendly.com', '_blank')}
        />
        <QuickAction
          icon={Send}
          label="Message"
          sub="Send Email"
          color="bg-[#FCA5A5]"
          onClick={() => window.location.href = 'mailto:dhembreprathamesh10@gmail.com'}
        />
      </div>

      <div className="space-y-3 mb-4">
        <SocialLink
          icon={Linkedin}
          label="LinkedIn Profile"
          href="https://www.linkedin.com/in/dprathamessh/"
          color="bg-[#0077B5]"
        />
        <SocialLink
          icon={Github}
          label="GitHub Profile"
          href="https://github.com/prathdotexe/"
          color="bg-[#333]"
        />
        <SocialLink
          icon={Mail}
          label="Copy Email Address"
          href="#"
          color="bg-white"
          isAction
          onClick={handleCopyEmail}
        />
      </div>
    </div>
  );
};

export default Contact;