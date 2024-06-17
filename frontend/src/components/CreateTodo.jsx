import { useTodos } from "../context/TodoContext";

import "../index.css";
import { useRef } from "react";

export function CreateTodo() {
  const title = useRef();
  const description = useRef();
  const { addTodo } = useTodos();
  const createTodo = async () => {
    if (title.current.value.trim().length === 0)
      return alert("Add Title Atleast !!");

    addTodo({
      id: Date.now(),
      title: title.current.value.trim(),
      description: description.current.value.trim(),
      completed: false,
    });

    title.current.value = "";
    description.current.value = "";
  };

  return (
    <div className="form">
      <input
        ref={title}
        style={{ padding: "10px", margin: "10px" }}
        type="text"
        placeholder="Title"
      />
      <input
        ref={description}
        style={{ padding: "10px", margin: "10px" }}
        type="text"
        placeholder="Description"
      />

      <button onClick={createTodo}>Add a Todo</button>
    </div>
  );
}
