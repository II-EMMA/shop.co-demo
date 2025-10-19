"use client";

import { FaArrowRight } from "react-icons/fa6";
import { useCart } from "@/context/CartContext";

export default function CheckoutButton() {
  const { cartItems } = useCart();

  const handleCheckout = async () => {
    if (cartItems.length === 0) return;

    const res = await fetch("/api/stripe/checkout", {
      method: "POST",
      body: JSON.stringify({ cartItems }),
      headers: { "Content-Type": "application/json" },
    });

    const data = await res.json();
    if (res.ok && data.url) {
      window.location.href = data.url;
    } else {
      alert("Error: " + data.error || "Unable to create Stripe session");
    }
  };

  return (
    <button
      onClick={handleCheckout}
      disabled={cartItems.length === 0}
      className={`flex-row gap-x-3 py-3.5 w-full rounded-full flex items-center justify-center border transition-all duration-300 ${
        cartItems.length === 0
          ? "bg-black/20 text-white cursor-not-allowed"
          : "bg-black text-white hover:border-black hover:bg-white hover:text-black"
      }`}
    >
      <span>Go to Checkout</span>
      <FaArrowRight />
    </button>
  );
}
