import { URL } from "./apiEndPoint";
import axios from "axios";

export default async function login(data) {
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
    const response = await axios.post(`http://127.0.0.1:8082/v1/login`, data);

    // console.log(response.data.tokens.access.token);

    // console.log(response.data);
    return response.data.tokens.access.token;
  } catch (error) {
    console.log(error);
    return false;
    //console.warn(error);
  }
}
