import logo from "./logo.svg";
import "./App.css";
import DesktopHeader from "./components/header/desktopHeader";
import { useSelector, useDispatch } from "react-redux";
import { Outlet } from "react-router-dom";
import { useEffect } from "react";

function App() {
  // document.getElementsByTagName("body")[0].setAttribute("class", "dark");
  let theam = useSelector((state) => state.theamReducer.theam);
  useEffect(() => {
    if (theam == "dark") {
      document.getElementsByTagName("body")[0].setAttribute("class", "dark");
    } else {
      document.getElementsByTagName("body")[0].setAttribute("class", "light");
    }
  }, [theam]);

  // document.getElementsByTagName("body")[0].setAttribute("class", "dark");
  return (
    <div class={theam === "dark" ? "dark" : "light"}>
      <DesktopHeader class={theam === "darkNav" ? "dark" : "lightNav"} />
      <Outlet />
    </div>
  );
}

export default App;
