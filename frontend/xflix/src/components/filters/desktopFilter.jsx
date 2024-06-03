import { useState, useEffect } from "react";

import { useSelector, useDispatch } from "react-redux";
import styles from "./filter.module.css";
import {
  setVideoList,
  setFiltersObj,
} from "../../redux/slices/vedioList.slice";
import getVideoList from "../../Api_calls/getVideoList";

export default function DesktopFiltes() {
  let contentRatings = ["Anyone", "7+", "12+", "16+", "18+"];
  let genres = ["All", "Education", "Sports", "Movies", "Comedy", "Lifestyle"];
  let releaseDate = ["viewCount", "releaseDate"];
  let [genre, setGener] = useState(["All"]);
  let [age, setAge] = useState("Anyone");
  let [filter, setFilter] = useState("releaseDate");
  let [VideoList, setVideoList] = useState([]);
  let theam = useSelector((state) => state.theamReducer.theam);
  // let set = new Set();
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
  // console.log("List-> ", list);
  //--------------------------------------------------------------------------------------------------------

  let onClickGenerHandler = (e) => {
    let arr = [...genre];
    if (e.target.value === "All") {
      setGener(["All"]);
      return;
    } else {
      arr = arr.filter((ele) => ele !== "All");
    }
    // console.log("btn click");

    if (arr.includes(e.target.value)) {
      arr = arr.filter((ele) => ele != e.target.value);
    } else {
      arr.push(e.target.value);
    }
    setGener(arr);
  };
  // console.log(genre, age, filter);
  return (
    <div
      className={theam == "dark" ? styles.darkDiv : styles.lightDiv}
      id={styles.DesktopFiltes}
    >
      <h3>
        Filter your content based on Geners, age groups, view count and release
        date.
      </h3>
      <div className={styles.genreDiv}>
        {genres.map((ele, idx) => {
          return (
            <button
              id={genre.includes(ele) ? styles.selected : ele}
              value={ele}
              key={idx}
              className={theam == "dark" ? styles.darkBtn : styles.lightBtn}
              onClick={onClickGenerHandler}
            >
              {ele == "All" ? "All-Geners" : ele}
            </button>
          );
        })}
      </div>
      <div className={styles.ageGroupDiv}>
        {contentRatings.map((ele, idx) => {
          return (
            <button
              key={idx}
              value={ele}
              id={age == ele ? styles.selected : ele}
              className={theam == "dark" ? styles.darkBtn : styles.lightBtn}
              onClick={(e) => {
                setAge(e.target.value);
              }}
            >
              {ele == "Anyone" ? "All Age Group" : ele}
            </button>
          );
        })}

        <select
          name="sortBy"
          id="sortBy"
          className={theam == "dark" ? styles.darkBtn : styles.lightBtn}
          onChange={(e) => {
            setFilter(e.target.value);
          }}
        >
          <option disabled selected>
            Sort-By
          </option>
          <option value="viewCount">View Count</option>
          <option value="releaseDate">Release Date</option>
        </select>
      </div>
    </div>
  );
}
