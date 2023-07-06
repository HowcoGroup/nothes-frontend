import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

type SortableItemProps = {
   id: string;
   children: React.ReactNode;
};

export const SortableItem = ({ id, children }: SortableItemProps) => {
   const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: id });
   const style = { transform: CSS.Transform.toString(transform), transition };
   return (
      <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
         {children}
      </div>
   );
};
