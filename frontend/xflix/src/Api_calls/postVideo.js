import { URL } from "./apiEndPoint";
import axios from "axios";

export default async function postVideo(data) {
  try {
    console.log("Data-> ", data);
    const response = await axios.post(`${URL}/v1/videos`, data);

    // console.log(response.data.tokens.access.token);

    // console.log(response.data);
    return { code: 201, data: response.data };
  } catch (error) {
    console.log(error);
    return error.response.data;
    //console.warn(error);
  }
}
