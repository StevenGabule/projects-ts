import { useState, KeyboardEvent } from "react";
import { useFocus } from "./utils/useFocus";
import { NewItemButton, NewItemFormContainer, NewItemInput } from "./styles";

type NewItemFormProps = {
  onAdd(text: string): void;
};

export const NewItemForm = (props: NewItemFormProps) => {
  const [text, setText] = useState("");
  const inputRef = useFocus();

  const handleAddText = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      props.onAdd(text);
    }
  };

  return (
    <NewItemFormContainer>
      <NewItemInput value={text} onChange={(e) => setText(e.target.value)} ref={inputRef} onKeyPress={handleAddText} />
      <NewItemButton onClick={() => props.onAdd(text)}>Create</NewItemButton>
    </NewItemFormContainer>
  );
};
