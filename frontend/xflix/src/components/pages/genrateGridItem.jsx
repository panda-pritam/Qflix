import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import styles from "./grid.module.css";
import { useNavigate, useSearchParams } from "react-router-dom";
let DateParser = (date) => {
  let newDate = new Date(date);
  let str = `${newDate.getDate()}-${newDate.getMonth()}-${newDate.getFullYear()}`;
  return str;
};

export default function GenerateGridItem({ list }) {
  let theam = useSelector((state) => state.theamReducer.theam);
  let isSearching = useSelector((state) => state.isSearching.isSearch);
  let searchVideoList = useSelector((state) => state.isSearching.list);
  console.log(isSearching, searchVideoList);
  let navigate = useNavigate();
  let loading = useSelector((state) => state.getVideoListReducer.loading);
  console.log("Generate grid-> ", list);
  return list.map((ele) => {
    return (
      <Grid item xs={1} sm={4} md={3} key={ele._id}>
        <Box
          className={
            theam == "dark" ? styles.darkGridItem : styles.lightGridItem
          }
        >
          <Link
            to={`/player/:${ele._id}`}
            className={theam == "dark" ? styles.Darklinks : styles.Lightlinks}
          >
            <Box
              className={
                theam == "dark" ? styles.darkImgBox : styles.lightImgBox
              }
            >
              <img
                src={ele.previewImage}
                alt="Video Thumnail image"
                className={styles.image}
              />
            </Box>
            <Box
              className={
                theam == "dark" ? styles.darkInfoBox : styles.lightInfoBox
              }
            >
              <p className={styles.titleText}>Title:- {ele.title}</p>
              <Box
                className={
                  theam == "dark" ? styles.darkDateBox : styles.lightDateBox
                }
              >
                <p>Views:- {ele.viewCount}</p>
                <p>Released Date:- {DateParser(ele.releaseDate)}</p>
              </Box>
            </Box>
          </Link>
        </Box>
      </Grid>
    );
  });
}
