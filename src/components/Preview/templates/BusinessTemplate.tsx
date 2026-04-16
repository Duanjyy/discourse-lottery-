import React from 'react';
import { ResumeData } from '../../../types/resume';
import { formatText } from '../../../utils/formatText';
import { Mail, Phone, MapPin, Calendar, Briefcase } from 'lucide-react';

interface TemplateProps {
  data: ResumeData;
}

export const BusinessTemplate: React.FC<TemplateProps> = ({ data }) => {
  const { basics, education, experience, projects, skills, summary, settings } = data;
  const { themeColor } = settings;

  const SectionTitle = ({ title }: { title: string }) => (
    <div className="flex items-center gap-2 mb-4 mt-6">
      <div className="w-1 h-5 rounded-full" style={{ backgroundColor: themeColor }} />
      <h2 className="text-lg font-bold uppercase tracking-widest text-zinc-800">
        {title}
      </h2>
      <div className="flex-1 border-b border-zinc-200 ml-2" />
    </div>
  );

  return (
    <div className="font-sans text-zinc-800">
      {/* Header */}
      <div className="flex bg-zinc-50 p-6 rounded-lg mb-6 border border-zinc-100">
        {basics.showAvatar && basics.avatar && (
          <div className="mr-6 shrink-0">
            <img
              src={basics.avatar}
              alt="Avatar"
              className="w-28 h-36 object-cover rounded shadow-sm border border-zinc-200"
            />
          </div>
        )}
        <div className="flex-1 flex flex-col justify-center">
          <h1 className="text-4xl font-black tracking-tight mb-2 text-zinc-900">
            {basics.name}
          </h1>
          <div className="text-lg font-medium mb-4" style={{ color: themeColor }}>
            {basics.intention}
          </div>
          
          <div className="grid grid-cols-2 gap-y-2 text-sm text-zinc-600">
            {basics.phone && (
              <div className="flex items-center gap-2">
                <Phone size={14} style={{ color: themeColor }} /> {basics.phone}
              </div>
            )}
            {basics.email && (
              <div className="flex items-center gap-2">
                <Mail size={14} style={{ color: themeColor }} /> {basics.email}
              </div>
            )}
            {basics.location && (
              <div className="flex items-center gap-2">
                <MapPin size={14} style={{ color: themeColor }} /> {basics.location}
              </div>
            )}
            {basics.birthDate && (
              <div className="flex items-center gap-2">
                <Calendar size={14} style={{ color: themeColor }} /> {basics.birthDate}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-[1fr_2fr] gap-8">
        {/* Left Column */}
        <div>
          {/* Summary */}
          {summary && (
            <div>
              <SectionTitle title="个人评价" />
              <div className="text-sm text-zinc-600 leading-relaxed whitespace-pre-wrap">
                {formatText(summary)}
              </div>
            </div>
          )}

          {/* Education */}
          {education.length > 0 && (
            <div>
              <SectionTitle title="教育经历" />
              <div className="space-y-4">
                {education.map((item) => (
                  <div key={item.id} className="text-sm">
                    <div className="font-bold text-zinc-800">{item.school}</div>
                    <div className="text-zinc-500 my-1">
                      {item.startDate} - {item.endDate}
                    </div>
                    <div className="font-medium text-zinc-700">{item.major}</div>
                    <div className="text-zinc-600">{item.degree}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Skills */}
          {skills.length > 0 && (
            <div>
              <SectionTitle title="专业技能" />
              <div className="space-y-3">
                {skills.map((item) => (
                  <div key={item.id} className="text-sm">
                    {item.category && (
                      <div className="font-bold text-zinc-800 mb-1">{item.category}</div>
                    )}
                    <div className="text-zinc-600 whitespace-pre-wrap">
                      {formatText(item.description)}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Column */}
        <div>
          {/* Experience */}
          {experience.length > 0 && (
            <div>
              <SectionTitle title="工作经历" />
              <div className="space-y-6">
                {experience.map((item) => (
                  <div key={item.id} className="relative pl-4 border-l-2" style={{ borderColor: `${themeColor}40` }}>
                    <div 
                      className="absolute w-2 h-2 rounded-full -left-[5px] top-1.5" 
                      style={{ backgroundColor: themeColor }} 
                    />
                    <div className="flex justify-between items-start mb-1">
                      <div className="font-bold text-zinc-800 text-base">{item.position}</div>
                      <div className="text-sm font-medium text-zinc-500 bg-zinc-100 px-2 py-0.5 rounded">
                        {item.startDate} - {item.endDate}
                      </div>
                    </div>
                    <div className="font-medium text-zinc-600 mb-2 flex items-center gap-1.5 text-sm">
                      <Briefcase size={14} /> {item.company}
                    </div>
                    <div className="text-sm text-zinc-600 whitespace-pre-wrap leading-relaxed">
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
              <SectionTitle title="项目经验" />
              <div className="space-y-6">
                {projects.map((item) => (
                  <div key={item.id} className="bg-zinc-50 p-4 rounded border border-zinc-100">
                    <div className="flex justify-between items-start mb-2">
                      <div className="font-bold text-zinc-800 text-base">{item.name}</div>
                      <div className="text-sm font-medium text-zinc-500">
                        {item.startDate} - {item.endDate}
                      </div>
                    </div>
                    <div className="text-sm font-medium text-zinc-700 mb-2">
                      角色：{item.role}
                    </div>
                    {item.techStack && (
                      <div className="text-xs font-medium px-2 py-1 bg-white border border-zinc-200 rounded inline-block mb-3 text-zinc-600">
                        技术栈：{item.techStack}
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
        </div>
      </div>
    </div>
  );
};
