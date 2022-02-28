import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Loading from "./Loading";
import Error from "./Error";
import {selectFilteredItems, toggleTodoAsync, getTodosAsync, removeTodoAsync} from "../redux/todos/todosSlice";

const ToDoList = () => {
  const dispatch = useDispatch();
  const filtered = useSelector(selectFilteredItems);
  const isLoading = useSelector( (state) => state.todos.isLoading);
  const error = useSelector((state)=>state.todos.error)

  const handleDestroy = async (id) => {
    if (window.confirm("Are you sure ?")) {
      await dispatch(removeTodoAsync(id));
    }
  }

  useEffect(()=>{
    dispatch(getTodosAsync());
  },[dispatch]);

  const handleToggle = async (_id, completed) => {
    await dispatch(toggleTodoAsync({_id, data: {completed}}))
  }

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
                onChange={() => handleToggle(item._id, !item.completed)}
                checked={item.completed}
              />
              <label>{item.title}</label>
              <button
                className="destroy"
                onClick={() => handleDestroy(item._id)}
              ></button>
            </div>
          </li>
        );
      })}
    </ul>
  );
};

export default ToDoList;
