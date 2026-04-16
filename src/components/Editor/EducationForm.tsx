import React from 'react';
import { GraduationCap, Plus } from 'lucide-react';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';

import { useResumeStore } from '../../store/useResumeStore';
import { Section } from './components/Section';
import { Input, Textarea } from './components/FormElements';
import { SortableItem } from './components/SortableItem';

export const EducationForm: React.FC = () => {
  const { resumeData, updateEducation, addEducation, removeEducation, reorderEducation } =
    useResumeStore();
  const { education } = resumeData;

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (active.id !== over?.id) {
      const oldIndex = education.findIndex((item) => item.id === active.id);
      const newIndex = education.findIndex((item) => item.id === over?.id);
      reorderEducation(oldIndex, newIndex);
    }
  };

  return (
    <Section title="教育经历" icon={<GraduationCap size={20} />}>
      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={education.map((e) => e.id)} strategy={verticalListSortingStrategy}>
          <div className="space-y-4">
            {education.map((item) => (
              <SortableItem key={item.id} id={item.id} onRemove={removeEducation} title={item.school || '新教育经历'}>
                <Input
                  label="学校名称"
                  value={item.school}
                  onChange={(e) => updateEducation(item.id, { school: e.target.value })}
                  placeholder="例如：北京大学"
                />
                <Input
                  label="学历/学位"
                  value={item.degree}
                  onChange={(e) => updateEducation(item.id, { degree: e.target.value })}
                  placeholder="例如：本科"
                />
                <Input
                  label="专业名称"
                  value={item.major}
                  onChange={(e) => updateEducation(item.id, { major: e.target.value })}
                  placeholder="例如：计算机科学与技术"
                />
                <Input
                  label="就读时间"
                  value={item.startDate}
                  onChange={(e) => updateEducation(item.id, { startDate: e.target.value })}
                  placeholder="例如：2018.09 - 2022.06"
                />
                <div className="col-span-2">
                  <Textarea
                    label="主修课程/经历描述"
                    value={item.description}
                    onChange={(e) => updateEducation(item.id, { description: e.target.value })}
                    placeholder="例如：主修数据结构、计算机网络等课程。在校期间..."
                  />
                </div>
              </SortableItem>
            ))}
          </div>
        </SortableContext>
      </DndContext>
      
      <button
        onClick={addEducation}
        className="w-full mt-4 py-2 flex items-center justify-center gap-2 text-blue-600 hover:bg-blue-50 border border-dashed border-blue-200 rounded-md transition-colors"
      >
        <Plus size={16} />
        添加教育经历
      </button>
    </Section>
  );
};
