import { createSlice } from "@reduxjs/toolkit";
// import data from "../data/initialTodos";

const theamSlice = createSlice({
  name: "theamReducer",
  initialState: {
    theam: "dark",
  },
  reducers: {
    setTheam: (state, action) => {
      state.theam = action.payload;
    },
  },
});

// console.log(todoSlice);
// console.log(todoSlice.getInitialState());

// export default todoSlice;
// export const { changeFilterStatus, addTodo, toggleTodo } = todoSlice.actions;
//export default todoSlice.reducer;

export const { setTheam } = theamSlice.actions;
export default theamSlice.reducer;
