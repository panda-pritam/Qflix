import { useEffect, useState, useStatecd } from "react";
import axios from "axios";
import Box from "@mui/system/Box";
import { TextField } from "@mui/material";
import Button from "@mui/material/Button";
import styles from "./loginRegister.module.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import login from "../../Api_calls/login";
export default function Login() {
  let [loginData, setLoginData] = useState({ email: "", password: "" });
  let onSubmitHandler = async (e) => {
    e.preventDefault();
    console.log(loginData);
    let data = await login(loginData);
    console.log(data);
    if (data) {
      toast.success("Login successfully", {
        theme: "colored",
      });
    } else {
      toast.error("Please Enter correct email or password.", {
        theme: "colored",
      });
    }
  };
  return (
    <Box className={styles.mainDiv}>
      <ToastContainer position="top-center" />
      <form onSubmit={onSubmitHandler}>
        <h1>Login Form</h1>

        <TextField
          required
          autoFocus
          margin="dense"
          id="email"
          name="email"
          label="Enter your Email id"
          type="email"
          fullWidth
          variant="outlined"
          value={loginData.email}
          onChange={(e) => {
            let newOBj = {
              ...loginData,
              email: e.target.value,
            };
            setLoginData(newOBj);
          }}
        />
        <TextField
          required
          autoFocus
          margin="dense"
          id="password"
          name="password"
          label="Enter your passward"
          type="password"
          fullWidth
          variant="outlined"
          onChange={(e) => {
            let newOBj = {
              ...loginData,
              password: e.target.value,
            };
            setLoginData(newOBj);
          }}
        />

        <div className={styles.BtnDiv}>
          <Button href="#text-buttons">Register your self</Button>
          <Button variant="contained" type="submit" size="large">
            Login
          </Button>
        </div>
      </form>
    </Box>
  );
}
