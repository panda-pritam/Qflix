import { createSlice } from "@reduxjs/toolkit";
// import data from "../data/initialTodos";

const videoListSlice = createSlice({
  name: "VideoListReducer",
  initialState: {
    videoList: [],
  },
  reducers: {
    setVideoList: (state, action) => {
      state.videoList = action.payload;
    },
  },
});

// console.log(todoSlice);
// console.log(todoSlice.getInitialState());

// export default todoSlice;
// export const { changeFilterStatus, addTodo, toggleTodo } = todoSlice.actions;
//export default todoSlice.reducer;

export const { setVideoList } = videoListSlice.actions;
export default videoListSlice.reducers;
