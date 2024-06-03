// import preferencesReducer from "./preferencesSlice";
// import todoReducer from "./todoSlice";

import VideoListReducer from "./vedioList.slice";
import tokenReducer from "./token";
import theamReducer from "./theam";
import isSearchReducer from "./isSearching";
import { getVideoListReducer } from "./getAllVideosList";
import isSearching from "./isSearching";
// import { getSearchVideoListReducer } from "./getListBasedOnTitle";

export const reducersMapping = {
  VideoListReducer: VideoListReducer,
  tokenReducer: tokenReducer,
  theamReducer: theamReducer,
  getVideoListReducer: getVideoListReducer,
  isSearching: isSearchReducer,
  // getSearchVideoListReducer: getSearchVideoListReducer,
};
