import { useTodos } from "../context/TodoContext";

function CountBox() {
  const { completedTodos, totalTodos } = useTodos();
  return (
    <section className="countBox">
      {totalTodos !== 0 ? (
        <div>
          <p style={{ fontSize: "32px" }}>Doing Good 🔥</p>
          <p style={{ fontSize: "24px" }}>Keep it up !!</p>
        </div>
      ) : (
        <p style={{ fontSize: "32px", padding: "26px" }}>
          Create Some Todos !!
        </p>
      )}
      {totalTodos !== 0 && (
        <div className="progress">
          {completedTodos}/{totalTodos}
        </div>
      )}
    </section>
  );
}
export default CountBox;
