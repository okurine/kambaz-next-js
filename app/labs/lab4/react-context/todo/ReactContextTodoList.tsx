"use client";
import { ListGroup, ListGroupItem, Button, FormControl } from "react-bootstrap";
import { useTodos, TodoProvider } from "./todosContext";

function TodoForm() {
  const { todo, setTodo, addTodo, updateTodo } = useTodos()!;
  return (
    <ListGroupItem>
      <Button
        className="btn btn-warning me-2"
        onClick={() => updateTodo(todo)}
        id="wd-update-todo-click"
      >
        Update
      </Button>
            <Button
        className="btn btn-success me-2"
        onClick={() => addTodo(todo)}
        id="wd-add-todo-click"
      >
        Add
      </Button>
      <FormControl
        className="mt-2"
        value={todo.title}
        onChange={(e) => setTodo({ ...todo, title: e.target.value })}
      />
    </ListGroupItem>
  );
}

function TodoItem({ todo }: { todo: { id: string; title: string } }) {
  const { deleteTodo, setTodo } = useTodos()!;
  return (
    <ListGroupItem
      className="d-flex justify-content-between align-items-center">
      {todo.title}
      <div>
        <Button
          className="btn btn-primary me-2"
          onClick={() => setTodo(todo)}
          id="wd-set-todo-click"
        >
          Edit
        </Button>
        <Button
          className="btn btn-danger"
          onClick={() => deleteTodo(todo.id)}
          id="wd-delete-todo-click"
        >
          Delete
        </Button>
      </div>
    </ListGroupItem>
  );
}

function TodoListInner() {
  const { todos } = useTodos()!;
  return (
    <div id="wd-react-context-todo-list">
      <h2>Todo List</h2>
      <ListGroup>
        <TodoForm />
        {todos.map((todo) => (
          <TodoItem key={todo.id} todo={todo} />
        ))}
      </ListGroup>
      <hr />
    </div>
  );
}

export default function ReactContextTodoList() {
  return (
    <TodoProvider>
      <TodoListInner />
    </TodoProvider>
  );
}
