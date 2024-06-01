import logo from "./logo.svg";
import "./App.css";
import DesktopHeader from "./components/header/desktopHeader";
import { Outlet } from "react-router-dom";

function App() {
  return (
    <div>
      <DesktopHeader />
    </div>
  );
}

export default App;
