import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { URL } from "../../Api_calls/apiEndPoint";
import GetVideoList from "../../Api_calls/getVideoList";

// export const fetchVideoList = createAsyncThunk(
//   "getAllVideoList",
//   async (data, { rejectWithValue }) => {
//     let genres = data.genres.join(",");
//     console.log(data);
//     let contentRating;
//     if (data.contentRating === "Anyone") {
//       contentRating = "Anyone";
//     } else {
//       contentRating = data.contentRating.replace("+", "%2B");
//       console.log(contentRating);
//     }
//     //   let sortBy = data.sortBy === "" ? "" : data.sortBy;

//     try {
//       const response = await axios.get(
//         `${URL}/v1/videos?genres=${genres}&contentRating=${contentRating}&sortBy=${data.sortBy}`
//       );

//       // console.log(response.data.tokens.access.token);

//       console.log(response.data);
//       // dispatch(setVideoList(response.videos));
//       return response.data;
//     } catch (error) {
//       console.log(error);
//       return rejectWithValue(error.response);
//       //console.warn(error);
//     }
//   }
// );

//-------------------------------------------------------------------------
export const fetchVideoList = createAsyncThunk(
  "getAllVideoList",
  async (data) => {
    let res = await GetVideoList(data);
    return res.videos;
  }
);

//-----------------------------------------------------------------------------------

const getAllVideoListSlice = createSlice({
  name: "getVideoLists",
  initialState: {
    list: [],
    loading: true,
    error: null,
  },
  extraReducers: {
    [fetchVideoList.pending]: (state, action) => {
      state.loading = true;
    },
    [fetchVideoList.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.list = payload;
    },
    [fetchVideoList.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },
  },
});

export let getVideoListReducer = getAllVideoListSlice.reducer;
