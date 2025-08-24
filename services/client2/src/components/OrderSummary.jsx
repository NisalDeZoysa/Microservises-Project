"use client";
import { useRouter } from "next/navigation";
import React from "react";


const OrderSummary = ({ total }) => {
  const router = useRouter();

  const handlePlaceOrder = () => {

    router.push(`/checkout?total=${total}`);
  };

  return (
    <div className="bg-white shadow rounded-2xl p-5 h-fit">
      <h2 className="text-lg font-semibold mb-4">Summary</h2>
      <div className="space-y-2">
        <div className="flex justify-between">
          <span className="text-gray-600">Subtotal</span>
          <span className="font-medium">${total}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Promo codes</span>
          <span className="text-blue-600 cursor-pointer">Enter</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Shipping fee</span>
          <span className="font-medium">Free Shipping</span>
        </div>
        <div className="border-t my-2"></div>
        <div className="flex justify-between text-lg font-bold">
          <span>Total</span>
          <span>${total}</span>
        </div>
      </div>
      <button
        onClick={handlePlaceOrder}
        className="mt-5 w-full bg-red-500 hover:bg-red-600 text-white py-3 rounded-full font-semibold transition"
      >
        Place order
      </button>
      <p className="text-xs text-gray-500 mt-2 text-center">
        <span>Upon clicking &apos;Place Order&apos;, I confirm I have read ...</span>
        <span className="text-blue-600 cursor-pointer">all terms and policies</span>.
      </p>
    </div>
  );
};

export default OrderSummary;
