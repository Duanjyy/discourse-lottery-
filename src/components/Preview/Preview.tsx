import React, { forwardRef } from 'react';
import { useResumeStore } from '../../store/useResumeStore';
import { MinimalTemplate } from './templates/MinimalTemplate';
import { BusinessTemplate } from './templates/BusinessTemplate';
import { CampusTemplate } from './templates/CampusTemplate';
import { TechTemplate } from './templates/TechTemplate';

interface PreviewProps {}

export const Preview = forwardRef<HTMLDivElement, PreviewProps>((props, ref) => {
  const { resumeData } = useResumeStore();
  const { settings } = resumeData;

  const renderTemplate = () => {
    switch (settings.template) {
      case 'minimal':
        return <MinimalTemplate data={resumeData} />;
      case 'business':
        return <BusinessTemplate data={resumeData} />;
      case 'campus':
        return <CampusTemplate data={resumeData} />;
      case 'tech':
        return <TechTemplate data={resumeData} />;
      default:
        return <MinimalTemplate data={resumeData} />;
    }
  };

  return (
    <div className="h-full w-full bg-zinc-200 overflow-y-auto p-8 flex justify-center">
      {/* A4 Paper Container */}
      <div
        ref={ref}
        className="bg-white shadow-xl flex-shrink-0"
        style={{
          width: '210mm',
          minHeight: '297mm', // A4 aspect ratio
          padding: '20mm', // standard margin
          boxSizing: 'border-box',
          fontSize: settings.fontSize,
          lineHeight: settings.lineHeight,
        }}
      >
        {renderTemplate()}
      </div>
    </div>
  );
});

Preview.displayName = 'Preview';
