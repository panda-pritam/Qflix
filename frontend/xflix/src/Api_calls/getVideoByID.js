import { URL } from "./apiEndPoint";
import axios from "axios";

export default async function getVideoByID(id) {
  try {
    id = id.slice(1);
    console.log(id);
    const response = await axios.get(`${URL}/v1/videos/${id}`);

    // console.log(response.data.tokens.access.token);

    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(error);
    return error.response.data;
    //console.warn(error);
  }
}
