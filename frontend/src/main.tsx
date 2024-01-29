import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import "./index.css";
import { routes } from "./routes";
import { theme } from "./styles/theme";
import AdminUserProvider from "./contexts/providers/AdminUserProvider";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <AdminUserProvider>
        <RouterProvider router={routes} />
      </AdminUserProvider>
    </ThemeProvider>
  </React.StrictMode>
);
