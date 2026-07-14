import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router";
import { router } from "./router/router";
import "./index.css";
<<<<<<< HEAD
import AuthProvider from "./Provider/AuthProvider";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
    <AuthProvider>{/* <RouterProvider router={router} /> */}</AuthProvider>
  </StrictMode>,
);
=======



createRoot(document.getElementById("root")).render(
  <StrictMode>

        <RouterProvider router={router} />
  </StrictMode>
);
>>>>>>> 8a244edf2be928f2d8c87acdf199ba27d8dbbae2
