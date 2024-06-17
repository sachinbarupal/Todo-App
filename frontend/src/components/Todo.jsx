import {
  Circle,
  DeleteOutline,
  DoneOutlined,
  EditNoteOutlined,
} from "@mui/icons-material";
import { useTodos } from "../context/TodoContext";
import toast from "react-hot-toast";
export function Todo({ todo }) {
  const { deleteTodo, totalTodos, completedTodos, toggleTodo } = useTodos();
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

  const handleDelete = () => {
    deleteTodo(todo);
  };

  return (
    <div className="todo">
      <div onClick={handleComplete} className="todoLeft">
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
            style={{
              textAlign: "start",
              textDecoration: todo.completed ? "line-through" : "none",
              fontSize: "24px",
            }}
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
        <button style={{ cursor: "pointer" }}>
          <EditNoteOutlined fontSize="large" />
        </button>
        <button style={{ cursor: "pointer" }} onClick={handleDelete}>
          <DeleteOutline sx={{ fontSize: "32px" }} />
        </button>
      </div>
    </div>
  );
}
