import { useSelector, useDispatch } from "react-redux";
import { toggle, destroy } from "../redux/todos/todosSlice";

const ToDoList = () => {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.todos.items);

  const handleDestroy = (id) => {
    if(window.confirm("Are you sure ?")){
      dispatch(destroy(id));
    }
    
  }

  return (
    <ul className="todo-list">
      {items.map((item, index) => {
        return (
          <li className={item.completed ? "completed" : ""} key={index}>
            <div className="view">
              <input
                className="toggle"
                type="checkbox"
                onChange={() => dispatch(toggle({ id: item.id }))}
                checked={item.completed}
              />
              <label>{item.title}</label>
              <button
                className="destroy"
                onClick={() => handleDestroy(item.id)}
              ></button>
            </div>
          </li>
        );
      })}
    </ul>
  );
};

export default ToDoList;
