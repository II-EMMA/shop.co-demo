"use client";

import { useEffect, useRef } from "react";
import { FaHeart } from "react-icons/fa";
import gsap from "gsap";
import { useWishlist } from "@/context/WishlistContext";
import Link from "next/link";

export default function WishlistIconButton() {
  const { wishlistItems } = useWishlist();
  const badgeRef = useRef(null);
  const count = wishlistItems.length;

  useEffect(() => {
    if (!badgeRef.current) return;
    gsap.fromTo(
      badgeRef.current,
      { scale: 1.4, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.4, ease: "power3.out" }
    );
  }, [count]);

  return (
    <div className="relative w-10 h-10 flex items-center justify-center -ml-1">
      <Link href="/en/wishlist">
        <FaHeart className="cursor-pointer text-red-500" size={22} />
      </Link>
      {count > 0 && (
        <div
          ref={badgeRef}
          className="absolute -top-1 -right-1 sm:w-auto sm:h-auto w-5 h-5 rounded-full bg-black text-white text-[10px] font-bold flex items-center justify-center shadow-md"
        >
          {count}
        </div>
      )}
    </div>
  );
}
