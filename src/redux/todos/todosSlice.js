import { createSlice } from "@reduxjs/toolkit";

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
  },
  reducers: {
    addToDo: (state, action) => {
      state.items.push(action.payload);
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
    }
  },
});

export const { addToDo, toggle, destroy } = todosSlice.actions;
export default todosSlice.reducer;
