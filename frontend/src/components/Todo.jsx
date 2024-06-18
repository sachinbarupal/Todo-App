import {
  Circle,
  DeleteOutline,
  DoneOutlined,
  EditNoteOutlined,
} from "@mui/icons-material";
import { useTodos } from "../context/TodoContext";
import toast from "react-hot-toast";
import { useEffect, useRef, useState } from "react";
export function Todo({ todo }) {
  const { deleteTodo, totalTodos, editTodo, completedTodos, toggleTodo } =
    useTodos();
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(todo.title);
  const titleRef = useRef(null);
  const [description, setDescription] = useState(todo.description);
  const wrapperRef = useRef(null);
  const handleClickOutside = (event) => {
    if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
      setIsEditing(false);
      editTodo({ ...todo, title, description });
    }
  };

  const handleComplete = () => {
    if (!todo.completed && completedTodos + 1 === totalTodos) {
      toast.success(
        <span>
          You Completed All The Tasks 🔥👏
          <br />
          <p style={{ textAlign: "center" }}>⭐ Well Done !! ⭐</p>
        </span>
      );
    } else if (!todo.completed) {
      toast("Great Going !!", {
        duration: 1000,
        icon: "🎖️",
        style: {
          borderRadius: "10px",
          color: "black",
        },
      });
    }

    toggleTodo(todo);
  };

  useEffect(() => {
    if (isEditing && titleRef.current) {
      titleRef.current.focus();
    }
  }, [isEditing]);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  });

  if (isEditing)
    return (
      <div className="editTodo" ref={wrapperRef}>
        <input
          ref={titleRef}
          type="text"
          className="editTodoInput"
          style={{ fontSize: "24px" }}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="text"
          className="editTodoInput"
          style={{ fontSize: "18px" }}
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
    );

  return (
    <div className="todo">
      <div onClick={handleComplete} className="todoLeft pointer">
        <div style={{ position: "relative" }}>
          <Circle
            fontSize="large"
            sx={{ color: todo.completed ? "limegreen" : "lightgray" }}
          />
          {todo.completed && (
            <DoneOutlined
              sx={{
                fontSize: "34px",
                position: "absolute",
                top: "0",
                left: "0",
              }}
            />
          )}
        </div>
        <div className="todoInfo">
          <p
            className="todoTitle"
            style={{ textDecoration: todo.completed ? "line-through" : "none" }}
          >
            {todo.title}
          </p>
          {todo.description && (
            <p
              style={{
                textDecoration: todo.completed ? "line-through" : "none",
                fontSize: "18px",
              }}
            >
              {todo.description}
            </p>
          )}
        </div>
      </div>

      <div className="todoRight">
        <button className="pointer" onClick={() => setIsEditing(true)}>
          <EditNoteOutlined fontSize="large" />
        </button>
        <button className="pointer" onClick={() => deleteTodo(todo)}>
          <DeleteOutline sx={{ fontSize: "32px" }} />
        </button>
      </div>
    </div>
  );
}
