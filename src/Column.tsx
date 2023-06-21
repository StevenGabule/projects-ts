import { useAppState} from './state/AppStateContext';
import { ColumnContainer, ColumnTitle } from "./styles";
import { AddNewItem } from './AddNewItem';
import { Card } from './Card';
import { addTask, moveList } from './state/actions';
import {useItemDrag} from './utils/useItemDrag'
import { useRef } from 'react';
import { useDrop } from 'react-dnd';
import { isHidden } from './utils/isHidden';

type ColumnProps = {
  text: string;
  id: string;
  isPreview?: boolean
};

export const Column = ({ text, id, isPreview }: ColumnProps) => {
  const {getTasksByListId, dispatch, draggedItem} = useAppState()
  const tasks = getTasksByListId(id)
  const ref = useRef<HTMLDivElement>(null);

  const [,drop] = useDrop({
    accept: "COLUMN",
    hover() {
      if (!draggedItem) {
        return;
      }

      if(draggedItem.type === "COLUMN") {
        if(draggedItem.id === id) {
          return;
        }

        dispatch(moveList(draggedItem.id, id))
      }
    }
  })
  
  const {drag} = useItemDrag({type: "COLUMN", id, text})

  drag(drop(ref))

  return (
    <ColumnContainer ref={ref} isHidden={isHidden(draggedItem, "COLUMN", id, isPreview)}>
      <ColumnTitle>{text}</ColumnTitle>
      {tasks.map((task) => (
        <Card text={task.text} key={task.id} id={task.id} />
      ))}
      <AddNewItem toggleButtonText="+ add another task" onAdd={(text) => dispatch(addTask(text, id))} dark />
    </ColumnContainer>
  );
};
