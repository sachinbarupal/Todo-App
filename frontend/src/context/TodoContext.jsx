import React, {
  createContext,
  useContext,
  useReducer,
  useEffect,
  act,
} from "react";

const TodoContext = createContext();

const initialState = {
  todos: [],
  totalTodos: 0,
  completedTodos: 0,
};

const ADD_TODO = "ADD_TODO";
const DELETE_TODO = "DELETE_TODO";
const TOGGLE_TODO = "TOGGLE_TODO";
const EDIT_TODO = "EDIT_TODO";

const todoReducer = (state, action) => {
  switch (action.type) {
    case ADD_TODO:
      return {
        ...state,
        todos: [action.payload, ...state.todos],
        totalTodos: state.totalTodos + 1,
      };
    case DELETE_TODO:
      return {
        ...state,
        todos: state.todos.filter((todo) => todo.id !== action.payload.id),
        totalTodos: state.totalTodos - 1,
        completedTodos:
          state.completedTodos + (action.payload.completed ? -1 : 0),
      };
    case TOGGLE_TODO: {
      console.log("OLD : ", state.completedTodos);
      console.log(
        "New : ",
        state.completedTodos + (action.payload.completed ? -1 : 1)
      );
      return {
        ...state,
        todos: state.todos.map((todo) =>
          todo.id === action.payload.id
            ? { ...todo, completed: !todo.completed }
            : todo
        ),
        completedTodos:
          state.completedTodos + (action.payload.completed ? -1 : 1),
      };
    }
    case EDIT_TODO:
      return {
        ...state,
        todos: state.todos.map((todo) =>
          todo.id === action.payload.id ? action.payload : todo
        ),
      };
    default:
      return state;
  }
};

export const TodoProvider = ({ children }) => {
  const [state, dispatch] = useReducer(todoReducer, initialState, (initial) => {
    const storedState = localStorage.getItem("todos");
    if (storedState) {
      const parsedState = JSON.parse(storedState);
      return {
        todos: parsedState.todos || [],
        totalTodos: parsedState.totalTodos || 0,
        completedTodos: parsedState.completedTodos || 0,
      };
    }
    return initial;
  });

  useEffect(() => {
    localStorage.setItem(
      "todos",
      JSON.stringify({
        todos: state.todos,
        totalTodos: state.totalTodos,
        completedTodos: state.completedTodos,
      })
    );
  }, [state.todos]);

  const addTodo = (todo) => {
    dispatch({ type: ADD_TODO, payload: todo });
  };

  const deleteTodo = (todo) => {
    dispatch({ type: DELETE_TODO, payload: todo });
  };

  const toggleTodo = (todo) => {
    dispatch({ type: TOGGLE_TODO, payload: todo });
  };

  const editTodo = (todo) => {
    dispatch({ type: EDIT_TODO, payload: todo });
  };

  return (
    <TodoContext.Provider
      value={{ ...state, addTodo, deleteTodo, toggleTodo, editTodo }}
    >
      {children}
    </TodoContext.Provider>
  );
};

export const useTodos = () => useContext(TodoContext);
