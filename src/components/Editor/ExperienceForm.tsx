import React from 'react';
import { Briefcase, Plus } from 'lucide-react';
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
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';

import { useResumeStore } from '../../store/useResumeStore';
import { Section } from './components/Section';
import { Input, Textarea } from './components/FormElements';
import { SortableItem } from './components/SortableItem';

export const ExperienceForm: React.FC = () => {
  const { resumeData, updateExperience, addExperience, removeExperience, reorderExperience } =
    useResumeStore();
  const { experience } = resumeData;

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (active.id !== over?.id) {
      const oldIndex = experience.findIndex((item) => item.id === active.id);
      const newIndex = experience.findIndex((item) => item.id === over?.id);
      reorderExperience(oldIndex, newIndex);
    }
  };

  return (
    <Section title="工作/实习经历" icon={<Briefcase size={20} />}>
      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={experience.map((e) => e.id)} strategy={verticalListSortingStrategy}>
          <div className="space-y-4">
            {experience.map((item) => (
              <SortableItem key={item.id} id={item.id} onRemove={removeExperience} title={item.company || '新工作经历'}>
                <Input
                  label="公司名称"
                  value={item.company}
                  onChange={(e) => updateExperience(item.id, { company: e.target.value })}
                  placeholder="例如：腾讯科技"
                />
                <Input
                  label="担任职位"
                  value={item.position}
                  onChange={(e) => updateExperience(item.id, { position: e.target.value })}
                  placeholder="例如：高级前端开发工程师"
                />
                <Input
                  label="工作时间"
                  value={item.startDate}
                  onChange={(e) => updateExperience(item.id, { startDate: e.target.value })}
                  placeholder="例如：2020.07 - 至今"
                />
                <div className="col-span-2">
                  <Textarea
                    label="工作内容与成果"
                    value={item.description}
                    onChange={(e) => updateExperience(item.id, { description: e.target.value })}
                    placeholder="例如：负责核心业务系统的重构，提升渲染性能30%..."
                  />
                </div>
              </SortableItem>
            ))}
          </div>
        </SortableContext>
      </DndContext>
      
      <button
        onClick={addExperience}
        className="w-full mt-4 py-2 flex items-center justify-center gap-2 text-blue-600 hover:bg-blue-50 border border-dashed border-blue-200 rounded-md transition-colors"
      >
        <Plus size={16} />
        添加工作经历
      </button>
    </Section>
  );
};
