"use client";
import { ListGroup, ListGroupItem, Button, FormControl } from "react-bootstrap";
import { useTodoStore } from "./useTodoStore";

export default function ZustandTodoList() {
  const { todos, todo, setTodo, addTodo, deleteTodo, updateTodo } = useTodoStore((state) => state);
  return (
    <div id="wd-zustand-todo-list">
      <h2>Todo List</h2>
      <ListGroup>
        <ListGroupItem>
          <Button className="btn btn-warning me-2"
                  onClick={() => updateTodo(todo)}
                  id="wd-update-todo-click">
            Update
          </Button>
          <Button className="btn btn-success me-2"
                  onClick={() => addTodo(todo)}
                  id="wd-add-todo-click">
            Add
          </Button>
          <FormControl className="mt-2"
            value={todo.title}
            onChange={(e) => setTodo({ ...todo, title: e.target.value })}/>
        </ListGroupItem>
        {todos.map((todo) => (
          <ListGroupItem key={todo.id}
            className="d-flex justify-content-between align-items-center">
            {todo.title}
            <div>
              <Button className="btn btn-primary me-2"
                      onClick={() => setTodo(todo)}
                      id="wd-set-todo-click">
                Edit
              </Button>
              <Button className="btn btn-danger"
                      onClick={() => deleteTodo(todo.id)}
                      id="wd-delete-todo-click">
                Delete
              </Button>
            </div>
          </ListGroupItem>
        ))}
      </ListGroup>
      <hr/>
    </div>
  );
}