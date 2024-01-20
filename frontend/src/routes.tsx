import { createBrowserRouter } from "react-router-dom";
import AllUser from "./components/AllUser";
import { Login } from "./components/Login";
import ModifyUser from "./components/ModifyUser";
import Paysheets from "./components/Paysheets";
import { Signup } from "./components/Signup";

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
  },
  {
    path: "user/:id",
    element: <ModifyUser />,
  },
  {
    path: "update",
    element: <ModifyUser />,
  },
]);
