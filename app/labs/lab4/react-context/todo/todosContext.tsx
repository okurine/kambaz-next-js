"use client";
import { createContext, useContext, useState, ReactNode } from "react";

// Define the context state
interface TodoContextState {
  todos: { id: string; title: string }[];
  todo: { id: string; title: string };
  setTodo: (todo: { id: string; title: string }) => void;
  addTodo: (todo: { id: string; title: string }) => void;
  deleteTodo: (id: string) => void;
  updateTodo: (todo: { id: string; title: string }) => void;
}

// Create the context
const TodoContext = createContext<TodoContextState | undefined>(undefined);

// Create the provider component
export const TodoProvider = ({ children }: { children: ReactNode }) => {
  const [todos, setTodos] = useState([
    { id: "1", title: "Learn React" },
    { id: "2", title: "Learn Node" }]);
  const [todo, setTodo] = useState({ id: "-1", title: "Learn Mongo" });

  const addTodo = (todo: { id: string; title: string }) => {
    setTodos([...todos, { ...todo, id: new Date().getTime().toString() }]);
    setTodo({ id: "-1", title: "" });
  };
  const deleteTodo = (id: string) => setTodos(todos.filter((t) => t.id !== id));
  const updateTodo = (todo: { id: string; title: string }) => {
    setTodos(todos.map((t) => (t.id === todo.id ? todo : t)));
    setTodo({ id: "-1", title: "" });
  };

  const value: TodoContextState = {
    todos, todo, setTodo, addTodo, deleteTodo, updateTodo
  };

  return (
    <TodoContext.Provider value={value}>{children}</TodoContext.Provider>
  );
};

// Create a custom hook to use the todo context
export const useTodos = () => {
  const context = useContext(TodoContext);
  return context;
};
