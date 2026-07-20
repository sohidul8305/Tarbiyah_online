import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import "./index.css";

// সঠিক পাথ অনুযায়ী AuthProvider এবং Router ইমপোর্ট করুন
import AuthProvider from "./Provider/AuthProvider"; // আপনার ফাইলটি যদি AuthProvider.jsx হয় তবে "./Provider/AuthProvider" দিন
import { router } from "./router/router";

console.log("🔥 App starting...");

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>,
);
