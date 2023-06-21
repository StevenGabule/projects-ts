import { createContext, Dispatch, ReactNode, useContext } from "react";
import { appStateReducer, AppState, List, Task } from "./appStateReducer";
import { Action } from "./actions";
import { useImmerReducer } from 'use-immer';
import { DragItem } from '../DragItem';

type AppStateContextProps = {
	draggedItem: DragItem | null;
  lists: List[];
  getTasksByListId(id: string): Task[];
  dispatch: Dispatch<Action>;
};	

const AppStateContext = createContext<AppStateContextProps>({} as AppStateContextProps);

const appData: AppState = {
  lists: [
    {
      id: "0",
      text: "Todo 0",
      tasks: [
        { id: "c0", text: "Start being awesome again!" },
        { id: "c1", text: "Learn PHP And NodeJS" },
      ],
    },
    {
      id: "1",
      text: "Todo 1",
      tasks: [{ id: "c1", text: "Start being awesome again!" }],
    },
    {
      id: "2",
      text: "Todo 2",
      tasks: [{ id: "c2", text: "Start being awesome again!" }],
    },
    {
      id: "3",
      text: "Todo 4",
      tasks: [{ id: "c4", text: "Start being awesome again!" }],
    },
  ],
	draggedItem: null
};

export const AppStateProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useImmerReducer(appStateReducer, appData);
  const { lists, draggedItem } = state;

  const getTasksByListId = (id: string) => {
    return lists.find((list) => list.id === id)?.tasks || [];
  };

  return <AppStateContext.Provider value={{ draggedItem, lists, getTasksByListId, dispatch }}>{children}</AppStateContext.Provider>;
};

export const useAppState = () => {
  return useContext(AppStateContext);
};
