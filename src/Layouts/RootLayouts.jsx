import React from "react";
import Navbar from "../Components/Navbar/Navbar";
import { Outlet } from "react-router";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Footer from "../Components/Navbar/Footer/Footer";

const RootLayouts = () => {
  // ⬇️ এই ১০ লাইন কোড বসাবেন ⬇️
  const location = useLocation();

  useEffect(() => {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: "PageView",
      page_path: location.pathname + location.search,
    });
  }, [location]);
  // ⬆️ এখান পর্যন্ত ⬆️
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow max-w-[95%] xl:max-w-[1400px] mx-auto px-4 w-full">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default RootLayouts;
