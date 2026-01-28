import React from 'react';
import { ExternalLink, ShieldCheck } from 'lucide-react';

interface Certificate {
  name: string;
  issuer: string;
  id: string;
  link: string;
}

const CERTIFICATES: Certificate[] = [
  { name: "AWS Certified Developer", issuer: "Amazon Web Services", id: "AWS-DEV-9902", link: "#" },
  { name: "Meta Frontend Specialist", issuer: "Coursera / Meta", id: "META-FE-441", link: "#" },
  { name: "Google Cloud Associate", issuer: "Google Cloud", id: "GCP-AS-112", link: "#" },
  { name: "Advanced React Patterns", issuer: "Frontend Masters", id: "FM-REACT-88", link: "#" },
];

const Certifications: React.FC = () => {
  return (
    <div className="h-full flex flex-col overflow-y-auto custom-scrollbar bg-white p-6">
      <div className="mb-6">
        <h2 className="font-heading font-black text-xs uppercase tracking-[0.2em] text-gray-400 mb-6 flex items-center gap-2">
            <ShieldCheck size={14} className="text-[#6EE7B7]" />
            Professional Credentials
        </h2>
        
        <div className="grid grid-cols-1 gap-3">
          {CERTIFICATES.map((cert, idx) => (
            <div 
              key={idx}
              className="bg-gray-50 border-[3px] border-black rounded-xl p-5 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 transition-all group flex flex-col sm:flex-row sm:items-center justify-between gap-4"
            >
              <div>
                <h4 className="font-heading font-black text-lg text-black mb-1 group-hover:text-[#10B981] transition-colors">{cert.name}</h4>
                <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{cert.issuer}</div>
              </div>
              
              <div className="flex items-center justify-between sm:justify-end gap-6 shrink-0">
                <span className="font-mono text-[10px] text-gray-400 font-bold bg-white border border-black/10 px-2 py-1 rounded">{cert.id}</span>
                <button className="flex items-center gap-2 bg-black text-white px-4 py-2 rounded-lg font-bold text-xs uppercase tracking-wider hover:bg-[#10B981] hover:text-white transition-colors">
                  Verify <ExternalLink size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Certifications;