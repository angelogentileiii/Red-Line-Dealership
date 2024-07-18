import React from "react";
import App from "./components/App";
import "./stylesheets/index.css";
import "./stylesheets/inputSlider.css";
import { createRoot } from "react-dom/client";

const container = document.getElementById("root");
const root = createRoot(container);
root.render(<App />);
