import { Todo } from "./Todo";
import { CreateTodo } from "./CreateTodo";
import { useTodos } from "../context/TodoContext";
export default function Todos() {
  const { todos } = useTodos();
  return (
    <div>
      <CreateTodo />
      {todos && todos.length > 0 ? (
        <div className="todos">
          {todos?.map((todo) => (
            <Todo key={todo?.id} todo={todo} />
          ))}
        </div>
      ) : (
        <p style={{ fontSize: "5rem", textAlign: "center", marginTop: "50px" }}>
          Set Some Goals and Work on them !! 💪
        </p>
      )}
    </div>
  );
}
