import { useEffect, useState } from "react";
import axios from "axios";
import Box from "@mui/system/Box";
import { useSelector, useDispatch } from "react-redux";
import CircularProgress from "@mui/material/CircularProgress";
import { TextField } from "@mui/material";
import Button from "@mui/material/Button";
import styles from "./loginRegister.module.css";
import { ToastContainer, toast } from "react-toastify";
import register from "../../Api_calls/register";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft";

export default function Register() {
  const navigate = useNavigate();
  let [loader, setLoader] = useState(false);
  let theam = useSelector((state) => state.theamReducer.theam);
  let [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    re_password: "",
  });
  let onChangeHandler = (e) => {
    let obj_key = e.target.name;
    let val = e.target.value;
    data[e.target.name] = e.target.value;
    setData({ ...data });
  };
  let onSubmitHandler = async (e) => {
    e.preventDefault();
    setLoader(true);
    if (data.re_password !== data.password) {
      toast.warn("Both passwards are not matching", {
        theme: "colored",
      });

      return;
    }
    let apiObj = {
      name: data.name,
      email: data.email,
      password: data.password,
    };
    let res = await register(apiObj);
    console.log(res);
    if (res.code === 200) {
      toast.error(`${res.message}`, {
        theme: "colored",
      });
    } else {
      toast.success("Registrations complete Thank you.", {
        theme: "colored",
      });
      navigate("/login");
    }
    setLoader(false);
  };
  return (
    <Box className={theam === "dark" ? styles.darkDiv : styles.lightDiv}>
      <ToastContainer position="top-center" />
      <form
        onSubmit={onSubmitHandler}
        className={theam == "dark" ? styles.darkForm : styles.LightForm}
      >
        <h1>Register your self to explore more fetures.</h1>
        <p>Please Enter your Details.</p>
        <TextField
          required
          autoFocus
          margin="dense"
          id="name"
          name="name"
          label="Enter your Name"
          type="text"
          fullWidth
          variant="outlined"
          onChange={onChangeHandler}
        />
        <TextField
          required
          margin="dense"
          id="email"
          name="email"
          label="Enter your Email id"
          type="email"
          fullWidth
          variant="outlined"
          onChange={onChangeHandler}
        />
        <TextField
          required
          margin="dense"
          id="password"
          name="password"
          label="Enter your passward"
          type="password"
          fullWidth
          variant="outlined"
          onChange={onChangeHandler}
        />
        <TextField
          required
          margin="dense"
          id="re_password"
          name="re_password"
          label="Re-Enter your passward"
          type="password"
          fullWidth
          variant="outlined"
          onChange={(e) => {
            onChangeHandler(e);
          }}
        />
        {loader && (
          <Box sx={{ display: "flex", justifyContent: "center", m: "2" }}>
            {" "}
            <CircularProgress />
          </Box>
        )}
        <div className={styles.BtnDiv}>
          <Button onClick={(e) => navigate("/")}>Back to Home Page</Button>
          <Button variant="contained" type="submit" size="large">
            Register
          </Button>
          <Button type="reset" variant="outlined" margin="dense" size="large">
            Reset
          </Button>
        </div>
      </form>
    </Box>
  );
}
