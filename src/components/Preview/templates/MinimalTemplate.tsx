import React from 'react';
import { ResumeData } from '../../../types/resume';
import { formatText } from '../../../utils/formatText';

interface TemplateProps {
  data: ResumeData;
}

export const MinimalTemplate: React.FC<TemplateProps> = ({ data }) => {
  const { basics, education, experience, projects, skills, summary, settings } = data;
  const { themeColor } = settings;

  const SectionTitle = ({ title }: { title: string }) => (
    <div className="mb-3 mt-6 border-b-2" style={{ borderColor: themeColor }}>
      <h2 className="text-lg font-bold pb-1" style={{ color: themeColor }}>
        {title}
      </h2>
    </div>
  );

  return (
    <div className="font-sans text-zinc-800">
      {/* Header */}
      <div className="flex justify-between items-start mb-6">
        <div>
          <h1 className="text-3xl font-bold mb-2" style={{ color: themeColor }}>
            {basics.name}
          </h1>
          <div className="text-sm text-zinc-600 flex flex-wrap gap-x-4 gap-y-1">
            {basics.intention && <span>求职意向：{basics.intention}</span>}
            {basics.phone && <span>{basics.phone}</span>}
            {basics.email && <span>{basics.email}</span>}
            {basics.location && <span>{basics.location}</span>}
            {basics.birthDate && <span>{basics.birthDate}</span>}
          </div>
        </div>
        {basics.showAvatar && basics.avatar && (
          <img
            src={basics.avatar}
            alt="Avatar"
            className="w-24 h-32 object-cover border border-zinc-200"
          />
        )}
      </div>

      {/* Summary */}
      {summary && (
        <div className="mb-4">
          <SectionTitle title="自我评价" />
          <div className="text-sm text-zinc-700 leading-relaxed whitespace-pre-wrap">
            {formatText(summary)}
          </div>
        </div>
      )}

      {/* Education */}
      {education.length > 0 && (
        <div className="mb-4">
          <SectionTitle title="教育经历" />
          <div className="space-y-3">
            {education.map((item) => (
              <div key={item.id}>
                <div className="flex justify-between items-center mb-1 font-semibold">
                  <span className="text-zinc-800">{item.school}</span>
                  <span className="text-sm text-zinc-600">
                    {item.startDate} {item.startDate && item.endDate && '-'} {item.endDate}
                  </span>
                </div>
                <div className="flex justify-between text-sm text-zinc-700 mb-1">
                  <span>
                    {item.major} {item.major && item.degree && '|'} {item.degree}
                  </span>
                </div>
                {(item.description || item.honors) && (
                  <div className="text-sm text-zinc-600 mt-1">
                    {item.honors && <p>荣誉奖项：{item.honors}</p>}
                    {item.description && <p>{formatText(item.description)}</p>}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Experience */}
      {experience.length > 0 && (
        <div className="mb-4">
          <SectionTitle title="工作经历" />
          <div className="space-y-4">
            {experience.map((item) => (
              <div key={item.id}>
                <div className="flex justify-between items-center mb-1 font-semibold">
                  <span className="text-zinc-800">{item.company}</span>
                  <span className="text-sm text-zinc-600">
                    {item.startDate} {item.startDate && item.endDate && '-'} {item.endDate}
                  </span>
                </div>
                <div className="text-sm font-medium text-zinc-700 mb-1">
                  {item.position}
                </div>
                {item.description && (
                  <div className="text-sm text-zinc-600 mt-1 whitespace-pre-wrap">
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
        <div className="mb-4">
          <SectionTitle title="项目经历" />
          <div className="space-y-4">
            {projects.map((item) => (
              <div key={item.id}>
                <div className="flex justify-between items-center mb-1 font-semibold">
                  <span className="text-zinc-800">{item.name}</span>
                  <span className="text-sm text-zinc-600">
                    {item.startDate} {item.startDate && item.endDate && '-'} {item.endDate}
                  </span>
                </div>
                <div className="text-sm font-medium text-zinc-700 mb-1">
                  角色：{item.role} {item.techStack && `| 技术栈：${item.techStack}`}
                </div>
                {item.description && (
                  <div className="text-sm text-zinc-600 mt-1 whitespace-pre-wrap">
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
        <div className="mb-4">
          <SectionTitle title="技能特长" />
          <div className="space-y-2">
            {skills.map((item) => (
              <div key={item.id} className="flex text-sm">
                {item.category && (
                  <span className="font-semibold text-zinc-800 w-24 shrink-0">
                    {item.category}：
                  </span>
                )}
                <span className="text-zinc-700 flex-1 whitespace-pre-wrap">
                  {formatText(item.description)}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
