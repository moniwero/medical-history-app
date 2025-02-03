import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles/global/reset.scss";
import "./styles/global/App.scss";
import AppRouter from "./router";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AppRouter />
  </StrictMode>
);
