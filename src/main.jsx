import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles/reset.scss";
import "./styles/App.scss";
import AppRouter from "./router";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AppRouter />
  </StrictMode>
);
