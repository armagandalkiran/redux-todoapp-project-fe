import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


export const getTodosAsync = createAsyncThunk("todos/getTodos/Async", async () => {
  const res = await axios(`https://vast-dusk-47383.herokuapp.com/todos`);
  return res.data;
});

export const addTodoAsync = createAsyncThunk("todos/addTodoAsync", async (data) => {
  const res = await axios.post(`https://vast-dusk-47383.herokuapp.com/todos`, data);
  return res.data;
});

export const toggleTodoAsync = createAsyncThunk("todos/toggleTodoAsync",async ({_id,data})=>{
  const res = await axios.patch(`https://vast-dusk-47383.herokuapp.com/todos/${_id}`, data);
  return res.data;
});

export const removeTodoAsync = createAsyncThunk("todos/removeTodoAsync", async (_id)=>{
  const res = await axios.delete(`https://vast-dusk-47383.herokuapp.com/todos/${_id}`);
  return res.data;
});

export const removeAllTodoAsync = createAsyncThunk("todos/removeAllTodoAsync", async ()=>{
  const res = await axios.delete(`https://vast-dusk-47383.herokuapp.com/todos`);
  return res.data;
})

export const todosSlice = createSlice({
  name: "todos",
  initialState: {
    items: [],
    activeFilter: localStorage.getItem("activeFilter") ? localStorage.getItem("activeFilter") : "all",
    isLoading: false,
    error: null,
    addNewIsTodoLoading: false,
    addNewTodoError: null
  },
  reducers: {
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
    [addTodoAsync.pending]: (state, action) => {
      state.addNewIsTodoLoading = true;
    },
    [addTodoAsync.fulfilled]: (state, action) => {
      state.items.push(action.payload);
      state.addNewIsTodoLoading = false;
    },
    [addTodoAsync.rejected]: (state, action) => {
      state.addNewIsTodoLoading = false;
      state.addNewTodoError = action.error.message;
    },
    //TOGGLE TODO
    [toggleTodoAsync.fulfilled]: (state, action) => {
      const {_id, completed} = action.payload;
      const index = state.items.findIndex(item => item._id === _id);
      state.items[index].completed = completed;
    },
    //REMOVE TODO
    [removeTodoAsync.fulfilled]: (state, action) => {
      state.items = action.payload;
    },
    [removeAllTodoAsync.fulfilled]: (state, action) => {
      state.items = action.payload;
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

export const {editActiveFilter} = todosSlice.actions;
export default todosSlice.reducer;
