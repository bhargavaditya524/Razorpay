import React from "react";
import { loadRazorpay } from "../utils/loadRazorpay";

const RazorpayCheckout = () => {
  const handlePayment = async () => {
    
    const loaded = await loadRazorpay();
    if (!loaded) {
      alert("Razorpay SDK failed to load");
      return;
    }

    // Create order from backend
    const res = await fetch("/api/checkout", {
      method: "POST",
    });
    const data = await res.json();

    const options = {
      key: "rzp_test_RsiLvHSdfv89vK", // ONLY KEY ID
      amount: data.order.amount,
      currency: data.order.currency,
      order_id: data.order.id,

      name: "My App",
      description: "Test Payment",

      handler: async function (response) {
        const verifyRes = await fetch("/api/payment/verify", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(response),
        });

        const verifyData = await verifyRes.json();
        alert(verifyData.message);
      },

      theme: { color: "#3399cc" },
    };

    const rzp = new window.Razorpay(options);

    // OPTIONAL: catch Razorpay failure
    rzp.on("payment.failed", function (response) {
      console.error(response.error);
      alert(response.error.description || "Payment Failed");
    });

    rzp.open();
  };

  return <button onClick={handlePayment}>Pay ₹500</button>;
};

export default RazorpayCheckout;
