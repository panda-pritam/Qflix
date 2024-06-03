import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import getVideoByID from "../../../Api_calls/getVideoByID";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import { ToastContainer, toast } from "react-toastify";
import { SnackbarProvider, useSnackbar } from "notistack";
import VideosGrid from "../videoGridPage";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft";
import axios from "axios";
import { URL } from "../../../Api_calls/apiEndPoint";

import styles from "./player.module.css";
let DateParser = (date) => {
  let newDate = new Date(date);
  let str = `${newDate.getDate()}-${newDate.getMonth()}-${newDate.getFullYear()}`;
  return str;
};

export default function VideoPlayer() {
  let theam = useSelector((state) => state.theamReducer.theam);
  let token = useSelector((state) => state.tokenReducer.token);
  let dispatch = useDispatch();
  let navigate = useNavigate();
  let { id } = useParams();
  let [data, setData] = useState("");
  let [loader, setLoader] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  let upVote = async (id) => {
    console.log(id);
    let res = await axios.patch(`${URL}/v1/videos/${id}/votes`, {
      vote: "upVote",
      change: "increase",
    });
    console.log(res);
  };
  let downVote = async (id) => {
    let res = await axios.patch(`${URL}/v1/videos/${id}/votes`, {
      vote: "upVote",
      change: "decrease",
    });
  };
  let updateView = async (id) => {
    let res = await axios.patch(`${URL}/v1/videos/${id}/views`);
  };
  let getUrl = () => {
    let url = "";
    if (data) {
      url = data.videoLink.startsWith("https://")
        ? data.videoLink
        : `https://${data.videoLink}`;
    }
    return url;
  };
  useEffect(() => {
    setLoader(true);
    getVideoByID(id)
      .then((res) => {
        setData(res);
        setLoader(false);
      })
      .catch(() => {
        enqueueSnackbar("So Sorry something went worng.", { variant: "error" });

        setLoader(false);
      })
      .finally(() => {
        setLoader(false);
      });
  }, [id]);

  useEffect(() => {
    if (data) {
      updateView(data.id);
    }
  }, [data]);

  console.log(id);
  console.log(data);
  console.log(data.videoLink);
  return (
    <div>
      <button
        className={styles.backToHome}
        onClick={(e) => {
          navigate("/");
          window.location.reload();
        }}
      >
        <ArrowCircleLeftIcon /> Go back to home
      </button>
      <div>
        {loader ? (
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
        ) : (
          <Box
            className={
              theam == "dark" ? styles.mainDarkDiv : styles.mainLightDiv
            }
          >
            <Box
              className={
                theam == "dark" ? styles.darkVideoDiv : styles.lightVideoDiv
              }
            >
              <iframe width="100%" height="100%" src={getUrl()}></iframe>
            </Box>
            <Box className={theam == "dark" ? styles.infoDiv : styles.infoDiv}>
              <Box
                className={theam == "dark" ? styles.titleDiv : styles.titleDiv}
              >
                <p className={styles.titleTxt}>{data.title}</p>
                <Box>
                  <button
                    className={styles.btn}
                    onClick={(e) => {
                      if (token) {
                        upVote(data.id);
                      } else {
                        enqueueSnackbar("Please login your self to like.", {
                          variant: "warning",
                        });
                      }
                    }}
                  >
                    {" "}
                    <ThumbUpAltIcon />
                  </button>
                  <button
                    className={styles.btn}
                    onClick={(e) => {
                      if (token) {
                        downVote(data.id);
                      } else {
                        enqueueSnackbar("Please login your self to like.", {
                          variant: "warning",
                        });
                      }
                    }}
                  >
                    {" "}
                    <ThumbDownIcon />
                  </button>
                </Box>
              </Box>
              <Box
                className={theam == "dark" ? styles.titleDiv : styles.titleDiv}
              >
                <p>Views:- {data.viewCount}</p>
                <p>Released Date:- {DateParser(data.releaseDate)}</p>
                <p>Genre:- {data.genre}</p>
              </Box>
            </Box>
          </Box>
        )}
      </div>
      <div>
        <VideosGrid />
      </div>
    </div>
  );
}
