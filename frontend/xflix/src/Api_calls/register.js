import { URL } from "./apiEndPoint";
import axios from "axios";

export default async function register(data) {
  //   try {
  //     const response = await axios.get(`${URL}/v1/login`, {
  //       method: "GET",
  //       body: JSON.stringify(data),
  //     });

  //     console.log(response);
  //   } catch (error) {
  //     console.warn(error);
  //   }

  try {
    console.log("Data-> ", data);
    const response = await axios.post(`${URL}/v1/user`, data);

    // console.log(response.data.tokens.access.token);

    // console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(error);
    return false;
    //console.warn(error);
  }
}
