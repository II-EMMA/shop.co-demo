"use client";

import { useEffect, useRef } from "react";
import { CgShoppingCart } from "react-icons/cg";
import { useCart } from "@/context/CartContext";
import Link from "next/link";
import gsap from "gsap";

export default function CartIconButton() {
  const { cartItems } = useCart();
  const badgeRef = useRef(null);
  const totalCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  useEffect(() => {
    if (!badgeRef.current) return;
    gsap.fromTo(
      badgeRef.current,
      { scale: 1.4, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.4, ease: "power3.out" }
    );
  }, [totalCount]);

  return (
    <div className="relative w-10 h-10 flex items-center justify-center">
      <Link href="/en/cart">
        <CgShoppingCart className="text-black" />
      </Link>
      {totalCount > 0 && (
        <div
          ref={badgeRef}
          className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-red-500 text-white text-[10px] font-bold flex items-center justify-center shadow-md"
        >
          {totalCount}
        </div>
      )}
    </div>
  );
}
