import React from 'react';
import { ResumeData } from '../../../types/resume';
import { formatText } from '../../../utils/formatText';

interface TemplateProps {
  data: ResumeData;
}

export const CampusTemplate: React.FC<TemplateProps> = ({ data }) => {
  const { basics, education, experience, projects, skills, summary, settings } = data;
  const { themeColor } = settings;

  const SectionTitle = ({ title }: { title: string }) => (
    <div className="flex items-center gap-4 mb-4 mt-6">
      <div className="flex-1 h-px bg-zinc-200" />
      <h2 
        className="text-lg font-bold px-4 py-1 rounded-full text-white tracking-widest uppercase"
        style={{ backgroundColor: themeColor }}
      >
        {title}
      </h2>
      <div className="flex-1 h-px bg-zinc-200" />
    </div>
  );

  return (
    <div className="font-sans text-zinc-800 text-center">
      {/* Header */}
      <div className="mb-8">
        {basics.showAvatar && basics.avatar && (
          <img
            src={basics.avatar}
            alt="Avatar"
            className="w-24 h-24 object-cover rounded-full mx-auto mb-4 border-4 shadow-md"
            style={{ borderColor: themeColor }}
          />
        )}
        <h1 className="text-4xl font-black mb-2 text-zinc-900 tracking-tight">
          {basics.name}
        </h1>
        <p className="text-lg font-medium mb-4 text-zinc-600">
          意向岗位：<span style={{ color: themeColor }}>{basics.intention}</span>
        </p>
        <div className="flex justify-center flex-wrap gap-x-4 gap-y-2 text-sm text-zinc-500 max-w-2xl mx-auto">
          {basics.phone && <span>📞 {basics.phone}</span>}
          {basics.email && <span>✉️ {basics.email}</span>}
          {basics.location && <span>📍 {basics.location}</span>}
          {basics.birthDate && <span>🎂 {basics.birthDate}</span>}
        </div>
      </div>

      <div className="text-left max-w-4xl mx-auto">
        {/* Education (Priority for campus) */}
        {education.length > 0 && (
          <div>
            <SectionTitle title="教育背景" />
            <div className="space-y-4">
              {education.map((item) => (
                <div key={item.id} className="relative pl-6 border-l-2" style={{ borderColor: themeColor }}>
                  <div className="absolute w-3 h-3 rounded-full -left-[7px] top-1.5 border-2 bg-white" style={{ borderColor: themeColor }} />
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-bold text-lg text-zinc-800">{item.school}</span>
                    <span className="text-sm font-medium bg-zinc-100 px-2 py-1 rounded-md text-zinc-600">
                      {item.startDate} - {item.endDate}
                    </span>
                  </div>
                  <div className="font-medium text-zinc-700 mb-2">
                    {item.major} | {item.degree}
                  </div>
                  {item.honors && (
                    <div className="text-sm font-medium text-amber-600 mb-1">
                      🏆 荣誉：{item.honors}
                    </div>
                  )}
                  {item.description && (
                    <div className="text-sm text-zinc-600 whitespace-pre-wrap mt-2 bg-zinc-50 p-3 rounded">
                      {formatText(item.description)}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Experience / Internship */}
        {experience.length > 0 && (
          <div>
            <SectionTitle title="实习经历" />
            <div className="space-y-6">
              {experience.map((item) => (
                <div key={item.id} className="relative pl-6 border-l-2" style={{ borderColor: themeColor }}>
                  <div className="absolute w-3 h-3 rounded-full -left-[7px] top-1.5 border-2 bg-white" style={{ borderColor: themeColor }} />
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-bold text-lg text-zinc-800">{item.company}</span>
                    <span className="text-sm font-medium bg-zinc-100 px-2 py-1 rounded-md text-zinc-600">
                      {item.startDate} - {item.endDate}
                    </span>
                  </div>
                  <div className="font-medium text-zinc-700 mb-2">{item.position}</div>
                  {item.description && (
                    <div className="text-sm text-zinc-600 whitespace-pre-wrap leading-relaxed">
                      {formatText(item.description)}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Projects */}
        {projects.length > 0 && (
          <div>
            <SectionTitle title="校园项目" />
            <div className="space-y-6">
              {projects.map((item) => (
                <div key={item.id} className="relative pl-6 border-l-2" style={{ borderColor: themeColor }}>
                  <div className="absolute w-3 h-3 rounded-full -left-[7px] top-1.5 border-2 bg-white" style={{ borderColor: themeColor }} />
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-bold text-lg text-zinc-800">{item.name}</span>
                    <span className="text-sm font-medium bg-zinc-100 px-2 py-1 rounded-md text-zinc-600">
                      {item.startDate} - {item.endDate}
                    </span>
                  </div>
                  <div className="font-medium text-zinc-700 mb-2">
                    角色：{item.role}
                  </div>
                  {item.description && (
                    <div className="text-sm text-zinc-600 whitespace-pre-wrap leading-relaxed bg-zinc-50 p-3 rounded">
                      {formatText(item.description)}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Skills */}
        {skills.length > 0 && (
          <div>
            <SectionTitle title="技能证书" />
            <div className="grid grid-cols-2 gap-4">
              {skills.map((item) => (
                <div key={item.id} className="bg-zinc-50 p-4 rounded-lg border border-zinc-100">
                  {item.category && (
                    <div className="font-bold text-zinc-800 mb-2 flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: themeColor }} />
                      {item.category}
                    </div>
                  )}
                  <div className="text-sm text-zinc-600 whitespace-pre-wrap">
                    {formatText(item.description)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Summary */}
        {summary && (
          <div>
            <SectionTitle title="自我评价" />
            <div className="text-sm text-zinc-600 leading-relaxed whitespace-pre-wrap bg-zinc-50 p-4 rounded-lg text-center italic">
              "{formatText(summary)}"
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
