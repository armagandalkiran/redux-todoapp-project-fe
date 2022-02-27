import { useState } from "react";
import { useDispatch } from "react-redux";
import { addToDo } from "../redux/todos/todosSlice";
import { nanoid } from "@reduxjs/toolkit";

const Form = () => {
  const [title, setTitle] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(addToDo({ id: nanoid(), title: title, completed: false }));

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
