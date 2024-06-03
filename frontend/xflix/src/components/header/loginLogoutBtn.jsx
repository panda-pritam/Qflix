import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setToken, setLogin } from "../../redux/slices/token";
import { Button } from "@mui/material";
import { useEffect, useState } from "react";

import Box from "@mui/system/Box";

export default function LoginLogoutBtn() {
  const navigate = useNavigate();
  let [isLogin, setLogined] = useState(false);
  let dispactch = useDispatch();
  useEffect(() => {
    let tokenObj = JSON.parse(localStorage.getItem("token"));
    //console.log(token);
    let token = "";
    if (tokenObj) {
      if (tokenObj.token) {
        token = tokenObj.token;
        setLogined(true);
        dispactch(setLogin(true));
        dispactch(setToken(token));
      }
    }
  }, []);
  let logoutHandler = (e) => {
    localStorage.setItem("token", JSON.stringify({ token: null }));
    setLogin(false);

    window.location.reload();
  };

  let btn = isLogin ? (
    <Button
      variant="contained"
      type="submit"
      size="large"
      onClick={logoutHandler}
    >
      Logout
    </Button>
  ) : (
    <Button
      variant="contained"
      type="submit"
      size="large"
      onClick={() => navigate("/login")}
    >
      Login
    </Button>
  );
  return btn;
}
