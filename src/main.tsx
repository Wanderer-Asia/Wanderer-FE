import React from "react";
import ReactDOM from "react-dom/client";
import "@/style/index.css";
import { RouterProvider } from "react-router-dom";
import { router } from "./routes/router.tsx";
import { ThemeProvider } from "./utils/context/theme-provider.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProvider defaultTheme="system" storageKey="wanderer-theme">
      <RouterProvider router={router} />
    </ThemeProvider>
  </React.StrictMode>,
);
