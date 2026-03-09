import { create } from "zustand";

// Define the todo state
interface TodoState {
  todos: { id: string; title: string }[];
  todo: { id: string; title: string };
  setTodo: (todo: { id: string; title: string }) => void;
  addTodo: (todo: { id: string; title: string }) => void;
  deleteTodo: (id: string) => void;
  updateTodo: (todo: { id: string; title: string }) => void;
}

// Use create function to create a hook giving us access to the state
export const useTodoStore = create<TodoState>((set) => ({
  todos: [
    { id: "1", title: "Learn React" },
    { id: "2", title: "Learn Node" }],
  todo: { id: "-1", title: "Learn Mongo" },
  setTodo: (todo) => set({ todo }),
  addTodo: (todo) => set((state) => ({
    todos: [...state.todos, { ...todo, id: new Date().getTime().toString() }],
    todo: { id: "-1", title: "" }
  })),
  deleteTodo: (id) => set((state) => ({
    todos: state.todos.filter((t) => t.id !== id)
  })),
  updateTodo: (todo) => set((state) => ({
    todos: state.todos.map((t) => (t.id === todo.id ? todo : t)),
    todo: { id: "-1", title: "" }
  })),
}));