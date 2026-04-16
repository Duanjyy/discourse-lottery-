import React from 'react';
import { Wrench, Plus } from 'lucide-react';
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

export const SkillForm: React.FC = () => {
  const { resumeData, updateSkill, addSkill, removeSkill, reorderSkill } =
    useResumeStore();
  const { skills } = resumeData;

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (active.id !== over?.id) {
      const oldIndex = skills.findIndex((item) => item.id === active.id);
      const newIndex = skills.findIndex((item) => item.id === over?.id);
      reorderSkill(oldIndex, newIndex);
    }
  };

  return (
    <Section title="技能特长" icon={<Wrench size={20} />}>
      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={skills.map((e) => e.id)} strategy={verticalListSortingStrategy}>
          <div className="space-y-4">
            {skills.map((item) => (
              <SortableItem key={item.id} id={item.id} onRemove={removeSkill} title={item.category || '新技能大类'}>
                <div className="col-span-2">
                  <Input
                    label="技能大类（选填）"
                    value={item.category}
                    onChange={(e) => updateSkill(item.id, { category: e.target.value })}
                    placeholder="例如：前端开发 / 语言能力"
                  />
                </div>
                <div className="col-span-2">
                  <Textarea
                    label="技能描述"
                    value={item.description}
                    onChange={(e) => updateSkill(item.id, { description: e.target.value })}
                    placeholder="例如：熟练掌握 HTML/CSS/JS，熟悉 React 及其生态..."
                  />
                </div>
              </SortableItem>
            ))}
          </div>
        </SortableContext>
      </DndContext>
      
      <button
        onClick={addSkill}
        className="w-full mt-4 py-2 flex items-center justify-center gap-2 text-blue-600 hover:bg-blue-50 border border-dashed border-blue-200 rounded-md transition-colors"
      >
        <Plus size={16} />
        添加技能
      </button>
    </Section>
  );
};
