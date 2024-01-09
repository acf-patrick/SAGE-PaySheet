import { createBrowserRouter } from "react-router-dom";
import { Login } from "./components/Login";
import Paysheets from "./components/Paysheets";

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
    path: "paysheets",
    element: <Paysheets />,
  },
]);
