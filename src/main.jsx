import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import App from "./App";
import { ThemeProvider, useTheme } from "./context/ThemeContext";
import "./i18n";
import "./index.css";

// Apply saved theme before mount to avoid a flash of the wrong theme
(() => {
  const saved = localStorage.getItem("kalatuwagama_site_theme");
  const isDark =
    saved === "dark" ||
    (saved !== "light" &&
      window.matchMedia?.("(prefers-color-scheme: dark)").matches);
  if (isDark) document.documentElement.classList.add("dark");
})();

function ThemedToaster() {
  const { isDark } = useTheme();
  return (
    <Toaster
      position="top-right"
      toastOptions={{
        duration: 4000,
        style: {
          background: isDark ? "#231916" : "#ffffff",
          color: isDark ? "#fdf8ec" : "#231916",
          border: `1px solid ${isDark ? "rgba(255,255,255,0.1)" : "rgba(35,25,22,0.08)"}`,
          boxShadow: "0 10px 40px -12px rgba(35, 25, 22, 0.25)",
        },
        success: { iconTheme: { primary: "#3f6b46", secondary: "#fff" } },
        error: { iconTheme: { primary: "#b83535", secondary: "#fff" } },
      }}
    />
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider>
        <App />
        <ThemedToaster />
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>,
);
