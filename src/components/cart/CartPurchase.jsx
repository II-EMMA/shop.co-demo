"use client";

import { useState } from "react";
import { ImPriceTag } from "react-icons/im";
import { useCart } from "@/context/CartContext";
import CheckoutButton from "./CheckoutButton";

export default function CartPurchase() {
  const { cartItems, clearCart } = useCart();
  const [promoCode, setPromoCode] = useState("");
  const [appliedCode, setAppliedCode] = useState(null);

  const subtotal = cartItems.reduce((acc, item) => {
    const numericPrice =
      typeof item.price === "string"
        ? parseFloat(item.price.replace(/[^0-9.]/g, ""))
        : item.price;
    return acc + numericPrice * item.quantity;
  }, 0);

  const discountRate = appliedCode === "SAVE20" ? 0.2 : 0;
  const discount = subtotal * discountRate;
  const deliveryFee = cartItems.length > 0 ? 15 : 0;
  const total = subtotal - discount + deliveryFee;

  const handleApplyPromo = () => {
    if (promoCode.trim().toUpperCase() === "SAVE20") {
      setAppliedCode("SAVE20");
    } else {
      setAppliedCode(null);
    }
  };

  return (
    <div className="lg:w-5/12 w-full border border-black/10 rounded-3xl px-6 py-5 flex flex-col gap-y-5">
      <p className="font-satoshi font-bold text-2xl mb-1">Order Summary</p>

      <div className="font-satoshi text-xl flex flex-row justify-between items-center">
        <p className="font-normal text-black/60">Subtotal</p>
        <p className="font-satoshi font-bold">${subtotal.toFixed(2)}</p>
      </div>

      <div className="font-satoshi text-xl flex flex-row justify-between items-center">
        <p className="font-normal text-black/60">Discount (-20%)</p>
        <p className="font-satoshi font-bold text-[#FF3333]">
          -${discount.toFixed(2)}
        </p>
      </div>

      <div className="font-satoshi text-xl flex flex-row justify-between items-center">
        <p className="font-normal text-black/60">Delivery Fee</p>
        <p className="font-satoshi font-bold">${deliveryFee.toFixed(2)}</p>
      </div>

      <span className="inline-block w-full h-px bg-black/10 my-1" />

      <div className="font-satoshi text-xl flex flex-row justify-between items-center my-1">
        <p className="font-normal">Total</p>
        <p className="font-satoshi font-bold">${total.toFixed(2)}</p>
      </div>

      <div className="flex-1 flex flex-row w-full gap-x-3 items-center">
        <div className="relative w-full max-w-xl">
          <ImPriceTag
            size={18}
            className="absolute left-4 top-1/2 -translate-y-[40%] text-black/60 opacity-40 text-xl rotate-270"
          />
          <input
            type="text"
            placeholder="Add promo code"
            value={promoCode}
            onChange={(e) => setPromoCode(e.target.value)}
            className="bg-[#F0F0F0] pl-11 pr-4 py-3 w-full rounded-full focus:outline-none placeholder:text-black placeholder:opacity-40"
          />
        </div>
        <button
          onClick={handleApplyPromo}
          className="py-2.5 px-8 rounded-full bg-black text-white flex items-center justify-center border hover:border-black hover:bg-white hover:text-black transition-all duration-300"
        >
          Apply
        </button>
      </div>

      <CheckoutButton />
    </div>
  );
}
