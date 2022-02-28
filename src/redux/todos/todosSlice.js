import { createSlice, nanoid } from "@reduxjs/toolkit";

export const todosSlice = createSlice({
  name: "todos",
  initialState: {
    items: [
      {
        id: 1,
        title: "Merhaba, todo",
        completed: true,
      },
      {
        id: 2,
        title: "Eklemeye basla !",
        completed: false,
      },
    ],
    activeFilter: "all"
  },
  reducers: {
    addToDo: {   
      reducer:(state, action) => {
        state.items.push(action.payload);
      },
      prepare:({title})=>{
        return {
          payload:{
          id: nanoid(),
          title: title,
          completed: false
          }
        }
      }
    },
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
});

export const selectTodo = ((state) => state.todos.items);
export const selectFilteredItems = (state) => {

  if(state.todos.activeFilter === "all"){
    return state.todos.items;
  }

  return state.todos.items.filter((item)=> state.todos.activeFilter === "active" ? item.completed === false : item.completed === true);
  
}

export const { addToDo, toggle, destroy, editActiveFilter, clearCompleted} = todosSlice.actions;
export default todosSlice.reducer;
