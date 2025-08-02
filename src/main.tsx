import { StrictMode } from "react";
// import { createRoot } from 'react-dom/client'
import "./index.css";
import App from "./App.tsx";
import "katex/dist/katex.min.css";
// import React from 'react';
import ReactDOM from "react-dom/client";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
