import "@/style/index.css";

import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { ThemeProvider } from "./utils/context/theme-provider.tsx";
import { Toaster } from "./components/ui/toaster.tsx";
import { TokenProvider } from "./utils/context/token.tsx";
import { router } from "./routes/router.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProvider defaultTheme="system" storageKey="wanderer-theme">
      <TokenProvider>
        <RouterProvider router={router} />
        <Toaster />
      </TokenProvider>
    </ThemeProvider>
  </React.StrictMode>,
);
