import { useState, useEffect } from "react";

import { useSelector, useDispatch } from "react-redux";

import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import GenerateGridItem from "./genrateGridItem";
import { fetchVideoList } from "../../redux/slices/getAllVideosList";
import styles from "./page.module.css";

export default function VideosGrid() {
  let theam = useSelector((state) => state.theamReducer.theam);
  // let set = new Set();
  //-------------------------------------------------------------------------------------------------------
  let dispatch = useDispatch();

  let filterObj = useSelector((state) => state.VideoListReducer.filters);
  let list = useSelector((state) => {
    return state.getVideoListReducer.list;
  });
  console.log("List at grid", list);
  //getVideoListReducer
  //fetchVideoList
  let loading = useSelector((state) => state.getVideoListReducer.loading);
  console.log(loading);
  let error = useSelector((state) => state.getVideoListReducer.error);
  console.log(error);

  // if (!error) {
  //   alert("No data found.");
  //   // Window.location.reload();
  // }

  useEffect(() => {
    dispatch(fetchVideoList(filterObj));
  }, []);
  useEffect(() => {
    dispatch(fetchVideoList(filterObj));
  }, [filterObj]);
  //--------------------------------------------------------------------------------------------------------
  let isSearching = useSelector((state) => state.isSearching.isSearch);
  let searchVideoList = useSelector((state) => state.isSearching.list);
  let SearchLoading = useSelector((state) => state.isSearching.loading);
  console.log("is Sch-> ", isSearching, "SRH List->", searchVideoList);
  if (isSearching) {
    loading = SearchLoading;
  }
  console.log(SearchLoading);
  //--------------------------------------------------------------------------------------------------------
  return (
    <div>
      {isSearching ? (
        loading ? (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <h1>Data is loading....</h1>
            <CircularProgress />
          </Box>
        ) : searchVideoList.length > 0 ? (
          <Grid
            container
            spacing={{ xs: 1, md: 1 }}
            // gap={{ xs: 1, md: 1 }}
            columns={{ xs: 1, sm: 8, md: 12 }}
          >
            <GenerateGridItem list={searchVideoList} />
          </Grid>
        ) : (
          <h1>Data not Found.</h1>
        )
      ) : loading ? (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <h1>Data is loading....</h1>
          <CircularProgress />
        </Box>
      ) : list.length > 0 ? (
        <Grid
          container
          spacing={{ xs: 1, md: 1 }}
          // gap={{ xs: 1, md: 1 }}
          columns={{ xs: 1, sm: 8, md: 12 }}
        >
          <GenerateGridItem list={list} />
        </Grid>
      ) : (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <h1>Data is loading....</h1>
          <CircularProgress />
        </Box>
      )}
    </div>
  );
}

/*
  {list.length == 0 ? (
          
        ) : (
          
        )}
*/
