import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTodoAsync } from "../redux/todos/todosSlice";
import Loading from "./Loading";
import Error from "./Error";

const Form = () => {
  const [title, setTitle] = useState("");
  const dispatch = useDispatch();
  const isLoading = useSelector((state)=>state.todos.addNewIsTodoLoading)
  const error = useSelector((state) => state.todos.addNewTodoError)

  const handleSubmit = (e) => {
    if(!title)return
    e.preventDefault();

    dispatch(addTodoAsync({ title }));

    setTitle("");
  };

  return (
    <form onSubmit={handleSubmit} style={{display: "flex", alignItems:"center"}}>
      <input
        disabled={isLoading}
        className="new-todo"
        placeholder="What needs to be done?"
        autoFocus
        value={title}
        onChange={({ target }) => setTitle(target.value)}
      />

      {isLoading && 
      <Loading/>
      }
      {error && <Error/>}
    </form>
  );
};

export default Form;
