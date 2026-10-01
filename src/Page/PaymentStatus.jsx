import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "../Components/Navbar/Navbar";
import Footer from "../Components/Navbar/Footer/Footer";
import Swal from "sweetalert2";

const PaymentStatus = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // URL থেকে ট্রানজেকশন আইডি (tran_id) নেওয়া
  const queryParams = new URLSearchParams(location.search);
  const tranId = queryParams.get("tran_id");

  // URL দেখে বোঝা এটি success, fail নাকি cancel
  const isSuccess = location.pathname.includes("success");
  const isFail = location.pathname.includes("fail");
  const isCancel = location.pathname.includes("cancel");

  useEffect(() => {
    // পেজ লোড হওয়ার সাথে সাথে সুইট অ্যালার্ট দেখানো (অপশনাল)
    if (isSuccess) {
      Swal.fire({
        icon: "success",
        title: "পেমেন্ট সফল!",
        text: "আপনার অ্যাডমিশন সফলভাবে সম্পন্ন হয়েছে। অ্যাডমিন অ্যাপ্রুভ করলে আপনি লগইন করতে পারবেন।",
        confirmButtonColor: "#00ADD2",
      });
    }
  }, [isSuccess]);

  return (
    <div
      className="min-h-screen bg-g
    ray-50 flex flex-col"
    >
      <Navbar />
      <div className="flex-grow flex items-center justify-center p-6">
        <div
          className="max-w-md w-full bg-white rounded-lg shadow-xl p-8 text-center border-t-4"
          style={{ borderColor: "#00ADD2" }}
        >
          {isSuccess && (
            <>
              <div className="text-green-500 text-6xl mb-4">✔️</div>
              <h1 className="text-2xl font-bold text-gray-800 mb-2">
                Payment Successful!
              </h1>
              <p className="text-gray-600 mb-4">
                আপনার পেমেন্টটি সফলভাবে সম্পন্ন হয়েছে।
              </p>
              {tranId && (
                <p className="text-sm text-gray-500 bg-gray-100 p-2 rounded">
                  Transaction ID: {tranId}
                </p>
              )}
              <p className="text-sm text-gray-500 mt-4">
                Admin approve করার পর আপনি Student ID দিয়ে লগইন করতে পারবেন।
              </p>
            </>
          )}

          {isFail && (
            <>
              <div className="text-red-500 text-6xl mb-4">✖️</div>
              <h1 className="text-2xl font-bold text-gray-800 mb-2">
                Payment Failed!
              </h1>
              <p className="text-gray-600 mb-4">
                দুঃখিত, আপনার পেমেন্টটি ব্যর্থ হয়েছে। দয়া করে আবার চেষ্টা করুন।
              </p>
            </>
          )}

          {isCancel && (
            <>
              <div className="text-yellow-500 text-6xl mb-4">⚠️</div>
              <h1 className="text-2xl font-bold text-gray-800 mb-2">
                Payment Cancelled!
              </h1>
              <p className="text-gray-600 mb-4">
                আপনি পেমেন্ট প্রক্রিয়াটি বাতিল করেছেন।
              </p>
            </>
          )}

          <button
            onClick={() => navigate("/")} // আপনার হোম পেজের রাউট
            className="mt-6 text-white px-6 py-2 rounded-md hover:opacity-90 transition"
            style={{ backgroundColor: "#00ADD2" }}
          >
            Back to Home
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default PaymentStatus;
