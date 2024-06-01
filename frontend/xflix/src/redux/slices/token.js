import { createSlice } from "@reduxjs/toolkit";
// import data from "../data/initialTodos";

const tokenSlice = createSlice({
  name: "tokenReducer",
  initialState: {
    token: "",
    isLogin: false,
  },
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
    },
    setLogin: (state, action) => {
      state.isLogin = action.payload;
    },
  },
});

// console.log(todoSlice);
// console.log(todoSlice.getInitialState());

// export default todoSlice;
// export const { changeFilterStatus, addTodo, toggleTodo } = todoSlice.actions;
//export default todoSlice.reducer;

export const { setToken, setLogin } = tokenSlice.actions;
export default tokenSlice.reducer;
