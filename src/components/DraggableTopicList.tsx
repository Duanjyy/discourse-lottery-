import { useAppStore } from '../store';
import { 
  DndContext, 
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent
} from '@dnd-kit/core';
import { 
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { SortableTopicItem } from './SortableTopicItem';

export const DraggableTopicList = () => {
  const store = useAppStore();
  const topics = store.topics;

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      store.reorderTopics(active.id as string, over.id as string);
    }
  };

  return (
    <div className="space-y-2">
      <DndContext 
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext 
          items={topics.map(t => t.id)}
          strategy={verticalListSortingStrategy}
        >
          {topics.map((topic) => (
            <SortableTopicItem key={topic.id} topic={topic} />
          ))}
        </SortableContext>
      </DndContext>
    </div>
  );
};
