import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import reportWebVitals from "./reportWebVitals";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store/store";
import Login from "./components/loginRegister/login";
import Register from "./components/loginRegister/register";
import DesktopFiltes from "./components/filters/desktopFilter";
import Wrapper from "./components/pages/wrapper";
import Player from "./components/pages/playerPage/player";
import { SnackbarProvider } from "notistack";

const root = ReactDOM.createRoot(document.getElementById("root"));
// document.getElementById("root").setAttribute("class", "dark");
// document.getElementsByTagName("body")[0].setAttribute("class", "dark");
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <Wrapper /> },
      { path: "/player/:id", element: <Player /> },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
]);

root.render(
  <Provider store={store}>
    <React.StrictMode>
      <ToastContainer position="top-center" />
      <SnackbarProvider
        maxSnack={1}
        anchorOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        preventDuplicate
      >
        <RouterProvider router={router} />
      </SnackbarProvider>
    </React.StrictMode>
  </Provider>
);
