import { createBrowserRouter } from "react-router-dom";
import { Login } from "./components/Login";
import Paysheets from "./components/Paysheets";
import { Signup } from "./components/Signup";
import User from "./components/AllUser";
import AllUser from "./components/AllUser";

export const routes = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "login",
    element: <Login />,
  },
  {
    path: "signup",
    element: <Signup />,
  },
  {
    path: "paysheets",
    element: <Paysheets />,
  },
  {
    path: "alluser",
    element: <AllUser />,
    children: [
      {
        path: "user",
        element: <User />,
      },
    ],
  },
]);
