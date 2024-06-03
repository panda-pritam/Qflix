import { useEffect, useState } from "react";
import axios from "axios";
import Box from "@mui/system/Box";
import CircularProgress from "@mui/material/CircularProgress";
import { TextField } from "@mui/material";
import Button from "@mui/material/Button";
import styles from "./loginRegister.module.css";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { SnackbarProvider, useSnackbar } from "notistack";
import { useSelector, useDispatch } from "react-redux";
import login from "../../Api_calls/login";
import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft";

export default function Login() {
  const { enqueueSnackbar } = useSnackbar();
  let [loginData, setLoginData] = useState({ email: "", password: "" });
  let [loader, setLoader] = useState(false);
  let theam = useSelector((state) => state.theamReducer.theam);
  const navigate = useNavigate();
  let onSubmitHandler = async (e) => {
    e.preventDefault();
    setLoader(true);
    console.log(loginData);
    let data = await login(loginData);
    console.log(data);
    if (data) {
      enqueueSnackbar("Login successfully", { variant: "success" });
      localStorage.setItem("token", JSON.stringify({ token: data }));
      setLoader(false);

      navigate("/");
    } else {
      enqueueSnackbar("Please Enter correct email or password.", {
        variant: "warning",
      });

      setLoader(false);
    }
  };
  return (
    <Box className={theam === "dark" ? styles.darkDiv : styles.lightDiv}>
      {/* <ToastContainer position="top-center" /> */}
      <form
        onSubmit={onSubmitHandler}
        className={theam == "dark" ? styles.darkForm : styles.LightForm}
      >
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
          <Button
            onClick={(e) => navigate("/register")}
            id={theam == "dark" ? "darkBtn" : "lightBtn"}
          >
            <ArrowCircleLeftIcon /> Register your self
          </Button>
          <Button variant="contained" type="submit" size="large">
            Login
          </Button>
        </div>
        {loader && (
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            {" "}
            <CircularProgress />
          </Box>
        )}
      </form>
    </Box>
  );
}
