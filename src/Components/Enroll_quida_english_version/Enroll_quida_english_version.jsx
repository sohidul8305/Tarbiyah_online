import React, { useState } from "react";
import { Link } from "react-router";
import { FaLock, FaSpinner, FaShieldAlt } from "react-icons/fa";

const Enroll_quida_english_version = () => {
  const [loading, setLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("bkash");
  const [showOrderSummary, setShowOrderSummary] = useState(true);

  // স্ক্রিনশটের সাথে মিলিয়ে ৪টি কোর্স বা আইটেম
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "Tarbiyah Alimiyah Program (Bangladesh)",
      price: 3000,
      signupFee: 6000,
      quantity: 3,
      image: "https://via.placeholder.com/60",
    },
    {
      id: 2,
      name: "Tarbiyah Alimiyah Program (Overseas)",
      price: 9000,
      signupFee: 9000,
      quantity: 2,
      image: "https://via.placeholder.com/60",
    },
    {
      id: 3,
      name: "Qaida Nuraniyah Course (Bangladesh)",
      price: 2000,
      signupFee: 2000,
      quantity: 2,
      image: "https://via.placeholder.com/60",
    },
    {
      id: 4,
      name: "Tarbiyah Najera Course (Overseas)",
      price: 2000,
      signupFee: 2000,
      quantity: 1,
      image: "https://via.placeholder.com/60",
    },
  ]);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    streetAddress: "",
    townCity: "",
    postcode: "",
    country: "bangladesh",
    state: "",
  });
  const [formErrors, setFormErrors] = useState({});

  // মোট হিসাব
  const calculateTotals = () => {
    let subtotal = cartItems.reduce(
      (acc, item) => acc + (item.price * item.quantity + item.signupFee),
      0,
    );
    return { subtotal, bkashCharge: 0, total: subtotal };
  };

  const totals = calculateTotals();

  const handleQuantityChange = (id, delta) => {
    setCartItems(
      cartItems.map((item) => {
        if (item.id === id) {
          const newQty = item.quantity + delta;
          return { ...item, quantity: newQty > 0 ? newQty : 1 };
        }
        return item;
      }),
    );
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.firstName) errors.firstName = "First name is required";
    if (!formData.lastName) errors.lastName = "Last name is required";
    if (!formData.phone) errors.phone = "Phone is required";
    if (!formData.email) errors.email = "Email is required";
    if (!formData.streetAddress)
      errors.streetAddress = "Street address is required";
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }
    setLoading(true);
    setFormErrors({});

    try {
      setTimeout(() => {
        if (paymentMethod === "sslcommerz") {
          window.location.href =
            "https://sandbox.sslcommerz.com/gwprocess/v4/index.php";
        } else {
          alert(
            `${paymentMethod.toUpperCase()} Payment processing successful.`,
          );
          setLoading(false);
        }
      }, 1500);
    } catch (error) {
      console.error("Payment Error:", error);
      alert("Payment processing failed.");
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    if (formErrors[e.target.name]) {
      setFormErrors({
        ...formErrors,
        [e.target.name]: "",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-sm border border-gray-200 p-6 md:p-10">
        {/* Top Toggleable Order Summary Bar */}
        <div className="border border-gray-200 rounded-lg p-4 mb-8 flex justify-between items-center bg-white shadow-xs">
          <button
            onClick={() => setShowOrderSummary(!showOrderSummary)}
            className="text-sm font-semibold text-gray-700 flex items-center gap-2 hover:text-teal-600 cursor-pointer"
          >
            <span>
              {showOrderSummary
                ? "▲ Hide Enrolment Summary"
                : "▼ Show Enrolment Summary"}
            </span>
          </button>
          <span className="text-lg font-bold text-gray-900">
            ৳ {totals.total.toLocaleString()}
          </span>
        </div>

        {/* Collapsible Items List */}
        {showOrderSummary && (
          <div className="mb-8 border-b border-gray-200 pb-6 space-y-4">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 py-3 border-b border-gray-100 last:border-0"
              >
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-12 h-12 object-cover rounded border"
                    />
                    <span className="absolute -top-2 -left-2 bg-gray-600 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                      {item.id}
                    </span>
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-gray-800">
                      {item.name} × {item.quantity}
                    </h4>
                    <p className="text-xs text-gray-500">
                      ৳ {item.price.toLocaleString()} / month and a ৳{" "}
                      {item.signupFee.toLocaleString()} sign-up fee
                    </p>
                  </div>
                </div>
                <div className="flex items-center justify-between w-full sm:w-auto gap-4">
                  <div className="flex items-center border rounded overflow-hidden">
                    <button
                      onClick={() => handleQuantityChange(item.id, -1)}
                      className="px-2.5 py-1 bg-gray-100 hover:bg-gray-200 text-xs cursor-pointer"
                    >
                      -
                    </button>
                    <span className="px-3 text-xs font-semibold">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => handleQuantityChange(item.id, 1)}
                      className="px-2.5 py-1 bg-gray-100 hover:bg-gray-200 text-xs cursor-pointer"
                    >
                      +
                    </button>
                  </div>
                  <span className="font-semibold text-sm text-gray-800">
                    ৳{" "}
                    {(
                      item.price * item.quantity +
                      item.signupFee
                    ).toLocaleString()}
                  </span>
                </div>
              </div>
            ))}

            <div className="text-xs text-teal-600 font-medium cursor-pointer mt-2">
              Have a coupon? Click here to enter your code
            </div>

            <div className="space-y-2 pt-4 text-sm text-gray-700">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-semibold">
                  ৳ {totals.subtotal.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between">
                <span>bKash Charge</span>
                <span className="text-green-600 font-semibold">
                  ৳ {totals.bkashCharge}
                </span>
              </div>
              <div className="flex justify-between text-base font-bold text-gray-900 border-t pt-3">
                <span>Total</span>
                <span className="text-teal-700">
                  ৳ {totals.total.toLocaleString()}
                </span>
              </div>
            </div>
          </div>
        )}

        <div className="text-xs text-gray-600 mb-6">
          Returning customer?{" "}
          <span className="text-teal-600 font-semibold cursor-pointer">
            Click here to login
          </span>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <h3 className="text-sm font-bold text-blue-900 tracking-wider uppercase border-b pb-2">
            SHIPPING INFORMATION
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                placeholder="FIRST NAME *"
                className="w-full px-4 py-2.5 border border-gray-300 rounded text-sm focus:outline-none focus:border-teal-500 uppercase"
              />
              {formErrors.firstName && (
                <p className="text-red-500 text-xs mt-1">
                  {formErrors.firstName}
                </p>
              )}
            </div>
            <div>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                placeholder="LAST NAME *"
                className="w-full px-4 py-2.5 border border-gray-300 rounded text-sm focus:outline-none focus:border-teal-500 uppercase"
              />
              {formErrors.lastName && (
                <p className="text-red-500 text-xs mt-1">
                  {formErrors.lastName}
                </p>
              )}
            </div>
          </div>

          <div className="flex border border-gray-300 rounded overflow-hidden">
            <div className="flex items-center bg-gray-50 px-3 border-r border-gray-300 text-sm gap-1 text-gray-600">
              <span>🇧🇩</span>
              <span>+880</span>
            </div>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              placeholder="PHONE"
              className="w-full px-4 py-2.5 text-sm focus:outline-none"
            />
          </div>
          {formErrors.phone && (
            <p className="text-red-500 text-xs mt-1">{formErrors.phone}</p>
          )}

          <div>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="EMAIL *"
              className="w-full px-4 py-2.5 border border-gray-300 rounded text-sm focus:outline-none focus:border-teal-500"
            />
            {formErrors.email && (
              <p className="text-red-500 text-xs mt-1">{formErrors.email}</p>
            )}
          </div>

          <div>
            <input
              type="text"
              name="streetAddress"
              value={formData.streetAddress}
              onChange={handleInputChange}
              placeholder="STREET ADDRESS *"
              className="w-full px-4 py-2.5 border border-gray-300 rounded text-sm focus:outline-none focus:border-teal-500 uppercase"
            />
          </div>

          <div>
            <input
              type="text"
              name="townCity"
              value={formData.townCity}
              onChange={handleInputChange}
              placeholder="TOWN / CITY"
              className="w-full px-4 py-2.5 border border-gray-300 rounded text-sm focus:outline-none focus:border-teal-500"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <input
              type="text"
              name="postcode"
              value={formData.postcode}
              onChange={handleInputChange}
              placeholder="POSTCODE"
              className="w-full px-4 py-2.5 border border-gray-300 rounded text-sm focus:outline-none focus:border-teal-500 uppercase"
            />
            <select
              name="country"
              value={formData.country}
              onChange={handleInputChange}
              className="w-full px-4 py-2.5 border border-gray-300 rounded text-sm bg-white focus:outline-none focus:border-teal-500"
            >
              <option value="bangladesh">Bangladesh</option>
            </select>
            <select
              name="state"
              value={formData.state}
              onChange={handleInputChange}
              className="w-full px-4 py-2.5 border border-gray-300 rounded text-sm bg-white focus:outline-none focus:border-teal-500"
            >
              <option value="">state (optional)</option>
              <option value="dhaka">Dhaka</option>
              <option value="chittagong">Chittagong</option>
            </select>
          </div>

          {/* Lower Order Summary Section as in Screenshot */}
          <div className="pt-6 border-t border-gray-200">
            <h3 className="text-sm font-bold text-blue-900 tracking-wider uppercase mb-4">
              ORDER SUMMARY
            </h3>
            <div className="text-xs text-teal-600 mb-4 cursor-pointer">
              Have a coupon? Click here to enter your code
            </div>

            <div className="space-y-3 text-sm border-b pb-4">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="flex justify-between items-center text-xs text-gray-600"
                >
                  <span>{item.name}</span>
                  <span className="font-semibold text-gray-800">
                    ৳ {item.price.toLocaleString()} / month and a ৳{" "}
                    {item.signupFee.toLocaleString()} sign-up fee
                  </span>
                </div>
              ))}
            </div>

            <div className="space-y-2 py-4 text-sm border-b">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-semibold">
                  ৳ {totals.subtotal.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">bKash Charge</span>
                <span className="text-teal-600 font-semibold">
                  ৳ {totals.bkashCharge}
                </span>
              </div>
              <div className="flex justify-between font-bold text-base pt-2">
                <span>Total</span>
                <span className="text-teal-700">
                  ৳ {totals.total.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between text-xs text-gray-500 pt-1">
                <span>Recurring totals</span>
              </div>
              <div className="flex justify-between text-xs text-gray-500">
                <span>Subtotal</span>
                <span>৳ 16,000 / month</span>
              </div>
            </div>

            <div className="py-4 border-b flex justify-between items-center">
              <span className="font-bold text-sm text-teal-700">
                Recurring totals
              </span>
              <div className="text-right">
                <span className="font-bold text-teal-700 text-base">
                  ৳ 16,000 / month
                </span>
                <p className="text-[10px] text-gray-400">
                  First renewal: 08/30/2026
                </p>
              </div>
            </div>
          </div>

          {/* Payment Section */}
          <div className="pt-4">
            <h3 className="text-sm font-bold text-blue-900 tracking-wider uppercase mb-1">
              PAYMENT
            </h3>
            <p className="text-[11px] text-gray-400 mb-4 flex items-center gap-1">
              <FaShieldAlt className="text-green-500" /> ALL TRANSACTIONS ARE
              SECURE AND ENCRYPTED.
            </p>

            <div className="space-y-3">
              <label className="flex items-center gap-3 p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                <input
                  type="radio"
                  name="payment"
                  value="bkash"
                  checked={paymentMethod === "bkash"}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="accent-teal-600"
                />
                <span className="text-xs font-semibold text-gray-700 flex-1">
                  Direct bKash Payment Automatic
                </span>
              </label>

              <label className="flex items-center justify-between p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                <div className="flex items-center gap-3">
                  <input
                    type="radio"
                    name="payment"
                    value="sslcommerz"
                    checked={paymentMethod === "sslcommerz"}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="accent-teal-600"
                  />
                  <span className="text-xs font-semibold text-gray-700">
                    Pay Online(Credit/Debit Card/MobileBanking/NetBanking/bkash)
                  </span>
                </div>
                <span className="text-[10px] bg-blue-900 text-white px-1.5 py-0.5 rounded font-bold">
                  SSLCOMMERZ
                </span>
              </label>

              <label className="flex items-center gap-3 p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                <input
                  type="radio"
                  name="payment"
                  value="bank"
                  checked={paymentMethod === "bank"}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="accent-teal-600"
                />
                <span className="text-xs font-semibold text-gray-700 flex-1">
                  Bank Payment
                </span>
              </label>
            </div>
          </div>

          {/* Terms & Conditions */}
          <div className="flex items-center gap-2 pt-2">
            <input
              type="checkbox"
              required
              className="accent-teal-600 w-4 h-4 cursor-pointer"
            />
            <span className="text-xs text-gray-600">
              I've read and accept the{" "}
              <span className="text-teal-600 underline cursor-pointer">
                terms & conditions
              </span>
              ,{" "}
              <span className="text-teal-600 underline cursor-pointer">
                privacy policy
              </span>{" "}
              &{" "}
              <span className="text-teal-600 underline cursor-pointer">
                refund policy
              </span>
              .
            </span>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-3.5 rounded transition-all flex items-center justify-center gap-2 text-sm shadow-inner cursor-pointer"
          >
            {loading ? (
              <>
                <FaSpinner className="animate-spin" />
                Processing...
              </>
            ) : (
              <>
                <FaLock className="text-xs" />
                <span>Enroll Now ৳ {totals.total.toLocaleString()}</span>
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Enroll_quida_english_version;
