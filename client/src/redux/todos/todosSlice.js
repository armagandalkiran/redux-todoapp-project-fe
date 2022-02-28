import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


export const getTodosAsync = createAsyncThunk("todos/getTodos/Async", async () => {
  const res = await axios("http://localhost:7000/todos");
  return res.data;
});

export const addTodoAsync = createAsyncThunk("todos/addTodoAsync", async (data) => {
  const res = await axios.post("http://localhost:7000/todos", data);
  return res.data;
});

export const todosSlice = createSlice({
  name: "todos",
  initialState: {
    items: [],
    activeFilter: "all",
    isLoading: false,

  },
  reducers: {
    toggle: (state, action) => {
      const { id } = action.payload;

      const item = state.items.find((item) => item.id === id);
      item.completed = !item.completed;
    },
    destroy: (state, action) => {
      const id = action.payload;
      const filtered = state.items.filter((item) => { return  item.id !== id })
      state.items = filtered;
    },
    editActiveFilter: (state,action) =>{
      state.activeFilter = action.payload;
    },
    clearCompleted: (state) => {
      const filter = state.items.filter((item) => item.completed === false);
      state.items = filter;
    }
  },
  extraReducers: {
    //GET TODO
    [getTodosAsync.pending]: (state, action) => {
      state.isLoading = true;
    },
    [getTodosAsync.fulfilled]: (state, action) => {
      state.items = action.payload;
      state.isLoading = false;
    },
    [getTodosAsync.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    },
    //ADD TODO
    [addTodoAsync.fulfilled]: (state, action) => {
      state.items.push(action.payload);
    }

  },
});

export const selectTodo = ((state) => state.todos.items);
export const selectFilteredItems = (state) => {

  if(state.todos.activeFilter === "all"){
    return state.todos.items;
  }

  return state.todos.items.filter((item)=> state.todos.activeFilter === "active" ? item.completed === false : item.completed === true);
  
}

export const {toggle, destroy, editActiveFilter, clearCompleted} = todosSlice.actions;
export default todosSlice.reducer;
