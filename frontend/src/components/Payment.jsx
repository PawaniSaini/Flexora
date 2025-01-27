"use client"; // Add this line to make the component a Client Component

import React from "react";

const PaymentPage = () => {
    const handlePayment = async () => {
        try {
            // Call the backend API to create an order
            const response = await axios.post("http://localhost:5000/create-order", { amount: 5000 });
            console.log(response.data);
            
            const { order } = await response.json();

            // Initialize Razorpay Checkout
            const options = {
                key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
                amount: order.amount,
                currency: order.currency,
                name: "Flexible Space Office",
                description: "Booking Payment",
                order_id: order.id,
                handler: async (response) => {
                    // Handle payment success
                    console.log("Payment successful:", response);
                    alert("Payment successful!");
                },
                prefill: {
                    name: "User Name",
                    email: "user@example.com",
                    contact: "9999999999",
                },
                theme: {
                    color: "#3399cc",
                },
            };

            const razorpay = new Razorpay(options);
            razorpay.open();

            razorpay.on("payment.failed", (response) => {
                console.error("Payment failed:", response.error);
                alert("Payment failed! Please try again.");
            });
        } catch (error) {
            console.error("Error in initiating payment:", error);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <h1 className="text-2xl text-black font-bold mb-4">Complete Your Payment</h1>
            <button
                className="bg-blue-500 text-white px-4 py-2 rounded"
                onClick={handlePayment} // Now this works in Client Component
            >
                Pay ₹50 Now
            </button>
        </div>
    );
};

export default PaymentPage;

