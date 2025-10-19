"use client";

import { useState, useRef, useEffect } from "react";
import gsap from "gsap";
import { useCart } from "@/context/CartContext";

export default function ProductCount({
  product,
  selectedColors,
  selectedSizes,
}) {
  const [count, setCount] = useState(1);
  const countRef = useRef(null);
  const { addToCart } = useCart();

  const handleAdd = () => {
    if (!selectedColors || !selectedSizes) return;
    const totalCombos = selectedColors.length * selectedSizes.length;
    addToCart({
      product,
      quantity: count * totalCombos,
      selectedColors,
      selectedSizes,
    });
    gsap.fromTo(".cart-toast", { opacity: 0 }, { opacity: 1, duration: 0.4 });
  };

  const updateCount = (delta) => {
    setCount((prev) => {
      const next = Math.max(1, prev + delta);
      animateCount();
      return next;
    });
  };

  const animateCount = () => {
    if (!countRef.current) return;
    gsap.fromTo(
      countRef.current,
      { scale: 1.2 },
      { scale: 1, duration: 0.3, ease: "power3.out" }
    );
  };

  useEffect(() => {
    animateCount();
  }, []);

  return (
    <div className="flex sm:flex-row flex-col items-center sm:gap-x-5 gap-y-4 sm:gap-y-0 sm:mt-0 mt-4">
      <div className="flex flex-row items-center justify-between bg-[#F0F0F0] rounded-3xl sm:w-1/3 w-1/2 py-2 px-8">
        <button
          onClick={() => updateCount(-1)}
          className="text-2xl font-bold cursor-pointer select-none"
        >
          –
        </button>
        <p ref={countRef} className="font-satoshi text-base font-medium">
          {count}
        </p>
        <button
          onClick={() => updateCount(1)}
          className="text-2xl font-bold cursor-pointer select-none"
        >
          +
        </button>
      </div>
      <button
        onClick={handleAdd}
        className="w-2/3 rounded-full bg-black text-white py-3 font-satoshi text-base font-medium cursor-pointer transition-all duration-300 hover:bg-white border outline-none hover:border-black hover:text-black max-w-[400px]"
      >
        Add to Cart
      </button>
    </div>
  );
}
