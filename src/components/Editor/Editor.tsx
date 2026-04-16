import React from 'react';
import { BasicsForm } from './BasicsForm';
import { EducationForm } from './EducationForm';
import { ExperienceForm } from './ExperienceForm';
import { ProjectForm } from './ProjectForm';
import { SkillForm } from './SkillForm';
import { SummaryForm } from './SummaryForm';
import { SettingsPanel } from './SettingsPanel';

export const Editor: React.FC = () => {
  return (
    <div className="h-full w-full bg-zinc-50 overflow-y-auto p-6 space-y-6">
      <SettingsPanel />
      <BasicsForm />
      <EducationForm />
      <ExperienceForm />
      <ProjectForm />
      <SkillForm />
      <SummaryForm />
    </div>
  );
};
