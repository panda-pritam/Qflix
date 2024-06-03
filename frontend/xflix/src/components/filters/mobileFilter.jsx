import * as React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import PopupState, { bindTrigger, bindMenu } from "material-ui-popup-state";
import ArrowDropDownCircleIcon from "@mui/icons-material/ArrowDropDownCircle";
import { useState, useEffect } from "react";

import { useSelector, useDispatch } from "react-redux";
import styles from "./filter.module.css";
import {
  setVideoList,
  setFiltersObj,
} from "../../redux/slices/vedioList.slice";
import getVideoList from "../../Api_calls/getVideoList";

export default function MobileFilter() {
  let contentRatings = ["Anyone", "7+", "12+", "16+", "18+"];
  let genres = ["All", "Education", "Sports", "Movies", "Comedy", "Lifestyle"];
  let [genre, setGener] = useState(["All"]);
  let [age, setAge] = useState("Anyone");
  let [filter, setFilter] = useState("releaseDate");
  let [VideoList, setVideoList] = useState([]);
  let theam = useSelector((state) => state.theamReducer.theam);
  //-------------------------------------------------------------------------------------------------------
  let dispatch = useDispatch();
  useEffect(() => {
    let newObj = {
      genres: genre,
      contentRating: age,
      sortBy: filter,
      title: "",
    };
    dispatch(setFiltersObj(newObj));
    let res = getVideoList(newObj);
    getVideoList(newObj)
      .then((res) => {
        setVideoList(res.videos);
        // dispatch(setVideoList(res.videos));
        return;
      })
      .catch();
    //console.log(V);
  }, [genre, age, filter]);
  let list = useSelector((state) => state.VideoListReducer.filters);
  //console.log("List-> ", list);
  //--------------------------------------------------------------------------------------------------------

  let onClickGenerHandler = (e) => {
    let arr = [...genre];
    if (e.target.value === "All") {
      setGener(["All"]);
      return;
    } else {
      arr = arr.filter((ele) => ele !== "All");
    }
    console.log("btn click");

    if (arr.includes(e.target.value)) {
      arr = arr.filter((ele) => ele != e.target.value);
    } else {
      arr.push(e.target.value);
    }
    setGener(arr);
  };
  console.log(genre, age, filter);
  return (
    <div
      className={theam == "dark" ? styles.darkMobileDiv : styles.lightMobileDiv}
      id={styles.MobileFilterFiltes}
    >
      <h2 className={theam == "dark" ? styles.darkText : styles.lightText}>
        Filter your data.
      </h2>
      <div
        className={
          theam == "dark" ? styles.darkOptionDiv : styles.lightOptionDiv
        }
      >
        <PopupState
          variant="popover"
          popupId="demo-popup-menu"
          className={styles.options}
        >
          {(popupState) => (
            <React.Fragment>
              <Button
                variant="contained"
                {...bindTrigger(popupState)}
                sx={{ margin: 1 }}
              >
                Select Gener <ArrowDropDownCircleIcon />
              </Button>
              <Menu {...bindMenu(popupState)}>
                {genres.map((ele, idx) => {
                  return (
                    <MenuItem onClick={popupState.close}>
                      <button
                        id={genre.includes(ele) ? styles.selected : ele}
                        value={ele}
                        key={idx}
                        className={
                          theam == "dark" ? styles.darkBtn : styles.lightBtn
                        }
                        onClick={onClickGenerHandler}
                      >
                        {ele == "All" ? "All-Geners" : ele}
                      </button>
                    </MenuItem>
                  );
                })}
              </Menu>
            </React.Fragment>
          )}
        </PopupState>
        <PopupState
          variant="popover"
          popupId="demo-popup-menu"
          className={styles.options}
        >
          {(popupState) => (
            <React.Fragment>
              <Button
                variant="contained"
                {...bindTrigger(popupState)}
                sx={{ margin: 1 }}
              >
                Select Age Group <ArrowDropDownCircleIcon />
              </Button>
              <Menu {...bindMenu(popupState)}>
                {contentRatings.map((ele, idx) => {
                  return (
                    <MenuItem onClick={popupState.close}>
                      <button
                        key={idx}
                        value={ele}
                        id={age == ele ? styles.selected : ele}
                        className={
                          theam == "dark" ? styles.darkBtn : styles.lightBtn
                        }
                        onClick={(e) => {
                          setAge(e.target.value);
                        }}
                      >
                        {ele == "Anyone" ? "All Age Group" : ele}
                      </button>
                    </MenuItem>
                  );
                })}
              </Menu>
            </React.Fragment>
          )}
        </PopupState>
      </div>
    </div>
  );
}
