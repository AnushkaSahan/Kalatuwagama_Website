import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import App from "./App";
import { ThemeProvider } from "./context/ThemeContext";
import "./i18n";
import "./index.css";

// Apply saved theme before mount to avoid a flash of the wrong theme
(() => {
  const saved = localStorage.getItem("kalatuwagama_site_theme");
  const isDark =
    saved === "dark" ||
    (saved !== "light" && window.matchMedia?.("(prefers-color-scheme: dark)").matches);
  if (isDark) document.documentElement.classList.add("dark");
})();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider>
        <App />
        <Toaster position="top-right" toastOptions={{ duration: 4000 }} />
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>,
);
