import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store/store";
import Login from "./components/loginRegister/login";
import Register from "./components/loginRegister/register";

const root = ReactDOM.createRoot(document.getElementById("root"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    // children: [
    //   { path: "/", element: <HomePage /> },
    //   { path: "/album/:slug", element: <SongsList /> },
    // ],
  },
  {
    path: "/login",
    element: <Login />,
    // children: [
    //   { path: "/", element: <HomePage /> },
    //   { path: "/album/:slug", element: <SongsList /> },
    // ],
  },
  {
    path: "/register",
    element: <Register />,
    // children: [
    //   { path: "/", element: <HomePage /> },
    //   { path: "/album/:slug", element: <SongsList /> },
    // ],
  },
]);

root.render(
  <Provider store={store}>
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  </Provider>
);
