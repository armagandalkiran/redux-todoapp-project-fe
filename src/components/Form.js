import { useState } from "react";
import { useDispatch } from "react-redux";
import { addToDo } from "../redux/todos/todosSlice";

const Form = () => {
  const [title, setTitle] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    if(!title)return
    e.preventDefault();

    dispatch(addToDo({ title }));

    setTitle("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        className="new-todo"
        placeholder="What needs to be done?"
        autoFocus
        value={title}
        onChange={({ target }) => setTitle(target.value)}
      />
    </form>
  );
};

export default Form;
