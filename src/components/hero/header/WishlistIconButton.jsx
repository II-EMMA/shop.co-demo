"use client";

import { useEffect, useRef } from "react";
import { FaHeart } from "react-icons/fa";
import gsap from "gsap";
import { useWishlist } from "@/context/WishlistContext";
import Link from "next/link";
import useSessionUser from "@/hooks/useSessionUser";

export default function WishlistIconButton() {
  const { wishlistItems } = useWishlist();
  const badgeRef = useRef(null);
  const count = wishlistItems.length;
  const user = useSessionUser();

  useEffect(() => {
    if (!badgeRef.current || count === 0) return;
    gsap.fromTo(
      badgeRef.current,
      { scale: 1.4, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.4, ease: "power3.out" }
    );
  }, [count]);

  const wishlistLink = user?.id ? `/en/wishlist/${user.id}` : null;

  return (
    <div className="relative w-10 h-10 flex items-center justify-center -ml-1">
      {wishlistLink ? (
        <Link href={wishlistLink}>
          <FaHeart
            className="cursor-pointer text-red-500 sm:w-auto sm:h-auto w-5 h-5"
            size={22}
          />
        </Link>
      ) : (
        <FaHeart className="text-gray-300 w-5 h-5" />
      )}
      {count > 0 && (
        <div
          ref={badgeRef}
          className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-black text-white text-[10px] font-bold flex items-center justify-center shadow-md"
        >
          {count}
        </div>
      )}
    </div>
  );
}
