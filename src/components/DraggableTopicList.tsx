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
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  rectSortingStrategy,
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
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <DndContext 
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext 
          items={topics.map(t => t.id)}
          strategy={rectSortingStrategy}
        >
          {topics.map((topic) => (
            <SortableTopicItem key={topic.id} topic={topic} />
          ))}
        </SortableContext>
      </DndContext>
    </div>
  );
};
