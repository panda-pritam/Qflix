import { configureStore } from "@reduxjs/toolkit";
// import { reducersMapping } from "./reducers";
import { reducersMapping } from "../slices/index";

// const store = createStore(rootReducer);
const store = configureStore({
  reducer: reducersMapping,
});
console.log(store);

export default store;
