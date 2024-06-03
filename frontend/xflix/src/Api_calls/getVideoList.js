import { URL } from "./apiEndPoint";
import axios from "axios";

export default async function GetVideoList(data) {
  // console.log("Data from get all list->", data.genres.join(","));
  let genres = data.genres.join(",");

  let contentRating;
  if (data.contentRating === "Anyone") {
    contentRating = "Anyone";
  } else {
    contentRating = data.contentRating.replace("+", "%2B");
    // console.log(contentRating);
  }
  //   let sortBy = data.sortBy === "" ? "" : data.sortBy;

  try {
    const response = await axios.get(
      `${URL}/v1/videos?genres=${genres}&contentRating=${contentRating}&sortBy=${data.sortBy}`
    );

    // console.log(response.data.tokens.access.token);

    // console.log(response.data);
    // dispatch(setVideoList(response.videos));

    return response.data;
  } catch (error) {
    // console.log(error);
    return [];
    //console.warn(error);
  }
}
