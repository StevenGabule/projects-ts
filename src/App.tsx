import "./App.css";
import { AppContainer } from "./styles";
import { AddNewItem } from "./AddNewItem";
import { useAppState } from "./state/AppStateContext";
import { Column } from "./Column";
import { addList } from "./state/actions";
import { CustomDragLayer } from "./CustomDragLayer";

function App() {
  const { lists, dispatch } = useAppState();
  return (
    <AppContainer>
      <CustomDragLayer />
      {lists.map((list) => (<Column text={list.text} key={list.id} id={list.id} />))}
      <AddNewItem toggleButtonText="+ Add Another List" onAdd={(text) => dispatch(addList(text))} />
    </AppContainer>
  );
}

export default App;
