import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "./store";
import { ListGroupItem, ListGroup } from "react-bootstrap";
export default function ArrayStateVariable() {
  const { todos } = useSelector((state: RootState) => state.todosReducer);

  const [array, setArray] = useState([1, 2, 3, 4, 5]);

  const addElement = () => {
    setArray([...array, Math.floor(Math.random() * 100)]);
  };

  const deleteElement = (index: number) => {
    setArray(array.filter((item, i) => i !== index));
  };

  return (
    <div id="wd-array-state-variables">
      <h2>Array State Variable</h2>
      <button
        onClick={addElement}
        id="wd-add-element-click"
        className="btn btn-success mb-2"
      >
        Add Element
      </button>
      <ul className="list-group w-75">
        {array.map((item, index) => (
          <li
            key={index}
            className="list-group-item d-flex justify-content-between align-items-center"
          >
            <strong>{item}</strong>
            <button
              onClick={() => deleteElement(index)}
              id="wd-delete-click"
              className="btn btn-danger"
            >
              Delete
            </button>
          </li>
        ))}

        <ListGroup>
          {todos.map((todo: any) => (
            <ListGroupItem key={todo.id}>{todo.title}</ListGroupItem>
          ))}
        </ListGroup>
        <hr />
      </ul>
      <hr />
    </div>
  );
}
