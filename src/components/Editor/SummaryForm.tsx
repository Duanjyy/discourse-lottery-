import React from 'react';
import { FileText } from 'lucide-react';
import { useResumeStore } from '../../store/useResumeStore';
import { Section } from './components/Section';
import { Textarea } from './components/FormElements';

export const SummaryForm: React.FC = () => {
  const { resumeData, updateSummary } = useResumeStore();

  return (
    <Section title="自我评价" icon={<FileText size={20} />}>
      <div className="flex flex-col gap-2">
        <Textarea
          label="详细评价"
          value={resumeData.summary}
          onChange={(e) => updateSummary(e.target.value)}
          placeholder="请输入你的自我评价..."
          className="min-h-[150px]"
        />
        <div className="text-right text-xs text-zinc-500">
          已输入 {resumeData.summary.length} 字
        </div>
      </div>
    </Section>
  );
};
