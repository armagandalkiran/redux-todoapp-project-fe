import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Loading from "./Loading";
import Error from "./Error";
import { toggle, destroy, selectFilteredItems, getTodosAsync} from "../redux/todos/todosSlice";

const ToDoList = () => {
  const dispatch = useDispatch();
  const filtered = useSelector(selectFilteredItems);
  const isLoading = useSelector( (state) => state.todos.isLoading);
  const error = useSelector((state)=>state.todos.error)

  const handleDestroy = (id) => {
    if (window.confirm("Are you sure ?")) {
      dispatch(destroy(id));
    }
  }

  useEffect(()=>{
    dispatch(getTodosAsync());
  },[dispatch]);

  if(isLoading){
    return <Loading/>
  }

  if(error){
    return <Error/>
  }

  return (
    <ul className="todo-list">
      {filtered?.map((item, index) => {
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
