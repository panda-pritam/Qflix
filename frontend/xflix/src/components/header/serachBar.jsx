import styles from "./desktop.module.css";
import searchIcon from "./search-icon.svg";
import Box from "@mui/system/Box";
import { URL } from "../../Api_calls/apiEndPoint";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { fetchVideoList } from "../../redux/slices/getAllVideosList";
import {
  setIsSearching,
  setList,
  setLoading,
} from "../../redux/slices/isSearching";
import { ToastContainer, toast } from "react-toastify";
import { SnackbarProvider, useSnackbar } from "notistack";
import axios from "axios";
export default function SerachBar() {
  const { enqueueSnackbar } = useSnackbar();
  let dispatch = useDispatch();
  //getSearchVideoListReducer
  //fetchSearchVideoList
  let filterObj = useSelector((state) => state.VideoListReducer.filters);
  console.log("filter Object-> ", filterObj);
  //   let loading = useSelector((state) => {
  //     console.log("List from store-> ", state.getVideoListReducer.list);
  //     console.log("Error from  store-> ", state.getVideoListReducer.error);
  //     console.log("Loading from Store-> ", state.getVideoListReducer.loading);
  //   });

  let [titleText, setTitleText] = useState("");
  let [timer, setTimer] = useState("");
  let onChangeHandler = (e) => {
    setTitleText((prev) => e.target.value);
  };
  let deafultList = useSelector((state) => state.getVideoListReducer.list);
  useEffect(() => {
    dispatch(fetchVideoList(filterObj));
  }, []);
  useEffect(() => {
    // console.log("New Object with added title-> ", newObj);
    dispatch(setIsSearching(true));
    dispatch(setLoading(true));
    if (timer) {
      clearTimeout(timer);
    }
    let timerId = setTimeout(() => {
      search(titleText);
    }, 500);
    setTimer(timerId);
    if (titleText.length === 0) {
      dispatch(setIsSearching(false));
    }
  }, [titleText]);

  let search = async (title) => {
    try {
      if (title.length) {
        let res = await axios.get(`${URL}/v1/videos?title=${title}`);

        console.log("API res->", res.data);
        dispatch(setList(res.data.videos));
      } else {
      }
    } catch (error) {
      //   toast.error(
      //
      //   );
      // alert(`No videos Found with this title is data base "${titleText}"`);
      enqueueSnackbar(
        `No videos Found with this title is data base "${titleText}"`,
        { variant: "error" }
      );
      dispatch(setList([]));
      console.log(error);
    } finally {
      //   setIsSearching(false);
      //   dispatch(setIsSearching(false));
      dispatch(setLoading(false));
    }
  };

  return (
    <Box className={styles.search_bar}>
      <ToastContainer position="top-center" />
      <input
        className={styles.search_input}
        placeholder="Search Vedio title"
        value={titleText}
        onChange={onChangeHandler}
      />
      <button className={styles.search_button}>
        <img src={searchIcon} className={styles.logo_img}></img>
      </button>
    </Box>
  );
}

/*

      let newObj = {
    ...filterObj,
  };
  //   console.log("New Object with added title-> ", newObj);

   let newObj = {
      ...filterObj,
      title: titleText,
    };

    dispatch(fetchVideoList(newObj));
*/
