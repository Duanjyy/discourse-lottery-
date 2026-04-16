import React from 'react';
import { ResumeData } from '../../../types/resume';
import { formatText } from '../../../utils/formatText';
import { Code2, Terminal, MonitorSmartphone, Database } from 'lucide-react';

interface TemplateProps {
  data: ResumeData;
}

export const TechTemplate: React.FC<TemplateProps> = ({ data }) => {
  const { basics, education, experience, projects, skills, summary, settings } = data;
  const { themeColor } = settings;

  const SectionTitle = ({ title }: { title: string }) => (
    <div className="flex items-center gap-3 mb-5 mt-8">
      <div 
        className="text-white px-3 py-1 text-sm font-mono tracking-widest uppercase rounded shadow-sm flex items-center gap-2"
        style={{ backgroundColor: themeColor }}
      >
        <Terminal size={14} />
        {title}
      </div>
      <div className="flex-1 border-b-2 border-dashed" style={{ borderColor: `${themeColor}40` }} />
    </div>
  );

  return (
    <div className="font-sans text-zinc-800 bg-white">
      {/* Header */}
      <div className="border-l-4 pl-6 mb-8 py-2" style={{ borderColor: themeColor }}>
        <div className="flex justify-between items-end mb-4">
          <div>
            <h1 className="text-5xl font-black mb-2 tracking-tighter" style={{ color: themeColor }}>
              {basics.name}
            </h1>
            <h2 className="text-xl font-bold text-zinc-700 flex items-center gap-2">
              <Code2 size={20} />
              {basics.intention}
            </h2>
          </div>
          {basics.showAvatar && basics.avatar && (
            <img
              src={basics.avatar}
              alt="Avatar"
              className="w-24 h-24 object-cover rounded-xl shadow-lg rotate-3 hover:rotate-0 transition-transform duration-300"
              style={{ border: `2px solid ${themeColor}` }}
            />
          )}
        </div>
        
        <div className="flex flex-wrap gap-4 text-sm font-mono text-zinc-600 bg-zinc-50 p-3 rounded-md border border-zinc-100">
          {basics.phone && <span className="flex items-center gap-1.5"><MonitorSmartphone size={14}/> {basics.phone}</span>}
          {basics.email && <span className="flex items-center gap-1.5"><Database size={14}/> {basics.email}</span>}
          {basics.location && <span>📍 {basics.location}</span>}
        </div>
      </div>

      <div className="space-y-2">
        {/* Skills - Put skills first for tech resume */}
        {skills.length > 0 && (
          <div>
            <SectionTitle title="TECH_STACK" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {skills.map((item) => (
                <div key={item.id} className="border border-zinc-200 rounded p-3 bg-zinc-50/50 hover:border-zinc-300 transition-colors">
                  {item.category && (
                    <div className="font-bold text-sm text-zinc-800 mb-1" style={{ color: themeColor }}>
                      &gt; {item.category}
                    </div>
                  )}
                  <div className="text-sm text-zinc-600 whitespace-pre-wrap leading-relaxed">
                    {formatText(item.description)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Experience */}
        {experience.length > 0 && (
          <div>
            <SectionTitle title="WORK_EXPERIENCE" />
            <div className="space-y-6">
              {experience.map((item) => (
                <div key={item.id}>
                  <div className="flex justify-between items-baseline mb-2">
                    <h3 className="text-lg font-bold text-zinc-800">{item.company}</h3>
                    <span className="font-mono text-sm px-2 py-1 bg-zinc-100 rounded text-zinc-600">
                      {item.startDate} - {item.endDate}
                    </span>
                  </div>
                  <div className="font-medium text-md mb-2" style={{ color: themeColor }}>
                    {item.position}
                  </div>
                  <div className="text-sm text-zinc-600 whitespace-pre-wrap leading-relaxed border-l-2 border-zinc-200 pl-4 py-1">
                    {formatText(item.description)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Projects */}
        {projects.length > 0 && (
          <div>
            <SectionTitle title="PROJECTS" />
            <div className="space-y-6">
              {projects.map((item) => (
                <div key={item.id} className="bg-zinc-50 rounded-lg p-5 border border-zinc-100">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-bold text-zinc-800">{item.name}</h3>
                    <span className="font-mono text-sm text-zinc-500">
                      {item.startDate} - {item.endDate}
                    </span>
                  </div>
                  <div className="flex flex-wrap items-center gap-3 mb-3">
                    <span className="font-medium text-sm text-zinc-700 bg-white px-2 py-1 border border-zinc-200 rounded shadow-sm">
                      👨‍💻 {item.role}
                    </span>
                    {item.techStack && (
                      <span className="font-medium text-sm text-zinc-600 bg-white px-2 py-1 border border-zinc-200 rounded shadow-sm">
                        🛠️ {item.techStack}
                      </span>
                    )}
                  </div>
                  <div className="text-sm text-zinc-600 whitespace-pre-wrap leading-relaxed">
                    {formatText(item.description)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Education */}
        {education.length > 0 && (
          <div>
            <SectionTitle title="EDUCATION" />
            <div className="grid grid-cols-1 gap-4">
              {education.map((item) => (
                <div key={item.id} className="flex justify-between items-center bg-zinc-50 p-4 rounded border border-zinc-100">
                  <div>
                    <div className="font-bold text-zinc-800 text-lg mb-1">{item.school}</div>
                    <div className="text-sm text-zinc-600 font-medium">
                      {item.major} | {item.degree}
                    </div>
                  </div>
                  <div className="font-mono text-sm bg-white px-3 py-1.5 border border-zinc-200 rounded shadow-sm text-zinc-600">
                    {item.startDate} - {item.endDate}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
