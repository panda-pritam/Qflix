import { createSlice } from "@reduxjs/toolkit";
// import data from "../data/initialTodos";

const isSearchSlice = createSlice({
  name: "isSearchReducer",
  initialState: {
    list: [],
    isSearch: false,
    loading: false,
  },
  reducers: {
    setList: (state, action) => {
      state.list = action.payload;
    },
    setIsSearching: (state, action) => {
      state.isSearch = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
});

export const { setIsSearching, setList, setLoading } = isSearchSlice.actions;
export default isSearchSlice.reducer;
