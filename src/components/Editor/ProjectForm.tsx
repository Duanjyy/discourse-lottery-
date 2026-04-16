import React from 'react';
import { FolderGit2, Plus } from 'lucide-react';
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

export const ProjectForm: React.FC = () => {
  const { resumeData, updateProject, addProject, removeProject, reorderProject } =
    useResumeStore();
  const { projects } = resumeData;

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (active.id !== over?.id) {
      const oldIndex = projects.findIndex((item) => item.id === active.id);
      const newIndex = projects.findIndex((item) => item.id === over?.id);
      reorderProject(oldIndex, newIndex);
    }
  };

  return (
    <Section title="项目经历" icon={<FolderGit2 size={20} />}>
      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={projects.map((e) => e.id)} strategy={verticalListSortingStrategy}>
          <div className="space-y-4">
            {projects.map((item) => (
              <SortableItem key={item.id} id={item.id} onRemove={removeProject} title={item.name || '新项目经历'}>
                <Input
                  label="项目名称"
                  value={item.name}
                  onChange={(e) => updateProject(item.id, { name: e.target.value })}
                  placeholder="例如：大型SaaS后台管理系统"
                />
                <Input
                  label="担任角色"
                  value={item.role}
                  onChange={(e) => updateProject(item.id, { role: e.target.value })}
                  placeholder="例如：核心开发者"
                />
                <Input
                  label="项目时间"
                  value={item.startDate}
                  onChange={(e) => updateProject(item.id, { startDate: e.target.value })}
                  placeholder="例如：2021.03 - 2022.05"
                />
                <Input
                  label="技术栈"
                  value={item.techStack}
                  onChange={(e) => updateProject(item.id, { techStack: e.target.value })}
                  placeholder="例如：React, TypeScript, Tailwind"
                />
                <div className="col-span-2">
                  <Textarea
                    label="项目描述与职责"
                    value={item.description}
                    onChange={(e) => updateProject(item.id, { description: e.target.value })}
                    placeholder="简要描述项目背景、目标，以及你在项目中负责的核心内容与取得的成果..."
                  />
                </div>
              </SortableItem>
            ))}
          </div>
        </SortableContext>
      </DndContext>
      
      <button
        onClick={addProject}
        className="w-full mt-4 py-2 flex items-center justify-center gap-2 text-blue-600 hover:bg-blue-50 border border-dashed border-blue-200 rounded-md transition-colors"
      >
        <Plus size={16} />
        添加项目经历
      </button>
    </Section>
  );
};
