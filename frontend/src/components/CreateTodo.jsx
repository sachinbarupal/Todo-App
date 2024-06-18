import { useTodos } from "../context/TodoContext";
import toast from "react-hot-toast";
import { useRef } from "react";

export function CreateTodo() {
  const title = useRef();
  const description = useRef();
  const { addTodo } = useTodos();
  const createTodo = async () => {
    if (title.current.value.trim().length === 0) {
      return toast.error("Add Title Atleast !!", {
        duration: 1000,
        position: "bottom-center",
      });
    }

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
      <input ref={title} type="text" placeholder="Title" />
      <input ref={description} type="text" placeholder="Description" />

      <button className="pointer" onClick={createTodo}>
        Add a Todo
      </button>
    </div>
  );
}
