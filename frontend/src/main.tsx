import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { ThemeProvider } from "styled-components";
import { theme } from "./styles/theme";
import { RouterProvider } from "react-router-dom";
import { routes } from "./routes";
import MainProvider from "./providers/MainProvider";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <MainProvider>
      <ThemeProvider theme={theme}>
        <RouterProvider router={routes} />
      </ThemeProvider>
    </MainProvider>
  </React.StrictMode>
);
