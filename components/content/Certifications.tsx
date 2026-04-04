import React from 'react';
import { ExternalLink, ShieldCheck, AlertTriangle } from 'lucide-react';

interface Certificate {
  name: string;
  issuer: string;
  year: string;
  link?: string;
}

// NOTE: Replace with your real certifications. Items with no link will show "Pending" instead of "Verify"
const CERTIFICATES: Certificate[] = [
  { name: "AWS Certified Developer", issuer: "Amazon Web Services", year: "2024", link: undefined },
  { name: "Meta Frontend Specialist", issuer: "Coursera / Meta", year: "2024", link: undefined },
  { name: "Google Cloud Associate", issuer: "Google Cloud", year: "2024", link: undefined },
  { name: "Advanced React Patterns", issuer: "Frontend Masters", year: "2024", link: undefined },
];

const Certifications: React.FC = () => {
  const hasRealLinks = CERTIFICATES.some(c => c.link);

  return (
    <div className="h-full flex flex-col overflow-y-auto custom-scrollbar bg-white p-6">
      <div className="mb-6">
        <h2 className="font-heading font-black text-xs uppercase tracking-[0.2em] text-gray-400 mb-4 flex items-center gap-2">
          <ShieldCheck size={14} className="text-[#6EE7B7]" />
          Professional Credentials
        </h2>

        {!hasRealLinks && (
          <div className="flex items-start gap-2 bg-[#FCD34D]/10 border border-[#FCD34D]/30 rounded-lg p-3 mb-4">
            <AlertTriangle size={14} className="text-[#B45309] shrink-0 mt-0.5" />
            <span className="text-[11px] font-medium text-[#B45309]">
              Verification links pending — check back soon for updated credential URLs.
            </span>
          </div>
        )}

        <div className="grid grid-cols-1 gap-3">
          {CERTIFICATES.map((cert, idx) => (
            <div
              key={idx}
              className="bg-gray-50 border-[3px] border-black rounded-xl p-5 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-0.5 transition-all group flex flex-col sm:flex-row sm:items-center justify-between gap-4"
            >
              <div>
                <h4 className="font-heading font-black text-base text-black mb-1 group-hover:text-[#10B981] transition-colors">{cert.name}</h4>
                <div className="flex items-center gap-3">
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{cert.issuer}</span>
                  <span className="text-[10px] font-bold text-gray-300">•</span>
                  <span className="text-[10px] font-bold text-gray-400">{cert.year}</span>
                </div>
              </div>

              <div className="shrink-0">
                {cert.link ? (
                  <a
                    href={cert.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 bg-black text-white px-4 py-2 rounded-lg font-bold text-xs uppercase tracking-wider hover:bg-[#10B981] transition-colors"
                  >
                    Verify <ExternalLink size={12} />
                  </a>
                ) : (
                  <span className="flex items-center gap-2 bg-gray-200 text-gray-500 px-4 py-2 rounded-lg font-bold text-xs uppercase tracking-wider cursor-not-allowed">
                    Pending
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Certifications;