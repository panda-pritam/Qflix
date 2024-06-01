import { useEffect, useStatecd } from "react";
import axios from "axios";
import Box from "@mui/system/Box";
import { TextField } from "@mui/material";
import Button from "@mui/material/Button";
import styles from "./loginRegister.module.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Register() {
  return (
    <Box className={styles.mainDiv}>
      <ToastContainer />
      <form>
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
        />
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
        />
        <TextField
          required
          autoFocus
          margin="dense"
          id="re_password"
          name="re_password"
          label="Re-Enter your passward"
          type="password"
          fullWidth
          variant="outlined"
        />
        <div className={styles.BtnDiv}>
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
