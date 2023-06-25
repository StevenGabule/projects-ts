import { DragItem } from '../DragItem';
import { useAppState } from '../state/AppStateContext';
import { useDrag } from 'react-dnd'
import { setDraggedItem } from '../state/actions';
import { useEffect } from 'react';
import { getEmptyImage } from 'react-dnd-html5-backend';

export const useItemDrag = (item: DragItem) => {
	const { dispatch } = useAppState()

	const [, drag, preview] = useDrag({
		// it will be CARD or COLUMN
		type: item.type,

		// • item - returns dragged item object and dispatches the SET_DRAGGED_ITEM action
		item: () => {
			dispatch(setDraggedItem(item))
			return item;
		},
		
		// end - is called when we release the item
		end: () => dispatch(setDraggedItem(null))
	})

	useEffect(() => {
		preview(getEmptyImage(), {captureDraggingState: true})
	}, [preview])

	return { drag }
}