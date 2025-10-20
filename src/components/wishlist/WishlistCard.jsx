"use client";

import { useWishlist } from "@/context/WishlistContext";
import { ProductCards } from "@/mocks/Products";
import { RiDeleteBinFill } from "react-icons/ri";
import { BsCartPlus } from "react-icons/bs";
import gsap from "gsap";
import { useEffect, useRef, useState } from "react";
import getNearestColorName from "@/lib/wishlist/getNearestColorName";
import { useSession, signIn } from "next-auth/react";

export default function WishlistCard({
  items: externalItems,
  isOwner,
  onItemRemoved,
}) {
  const { wishlistItems, removeFromWishlist } = useWishlist();
  const { data: session } = useSession();
  const containerRef = useRef();
  const [localItems, setLocalItems] = useState([]);

  // Sync localItems with external or context
  useEffect(() => {
    setLocalItems(externalItems || wishlistItems);
  }, [externalItems, wishlistItems]);

  // Animate on load
  useEffect(() => {
    const rows = containerRef.current?.querySelectorAll(".wishlist-row");
    if (rows?.length) {
      gsap.set(rows, { opacity: 0, y: 20 });
      gsap.to(rows, {
        opacity: 1,
        y: 0,
        duration: 0.5,
        stagger: 0.1,
        ease: "power2.out",
      });
    }
  }, [localItems]);

  if (!localItems?.length) {
    return (
      <p className="text-center text-black/50 font-satoshi">
        This wishlist is empty or not found.
      </p>
    );
  }

  const handleBuyNow = async (item) => {
    if (!session?.user) {
      const callbackUrl = window.location.href;
      await signIn("google", { callbackUrl });
      return;
    }

    const product = ProductCards.find((p) => p.id === item.productId);
    if (!product) return;

    const cartItem = {
      title: product.title,
      image: product.image?.src?.startsWith("http")
        ? product.image.src
        : "https://via.placeholder.com/150",
      price: product.price,
      quantity: 1,
    };

    try {
      const res = await fetch("/api/stripe/checkout", {
        method: "POST",
        body: JSON.stringify({ cartItems: [cartItem] }),
      });

      const data = await res.json();
      if (data?.url) {
        window.location.href = data.url;
      }
    } catch (err) {
      console.error("Stripe checkout error:", err);
    }
  };

  const handleRemove = async (variantKey) => {
    await removeFromWishlist(variantKey);
    setLocalItems((prev) => prev.filter((i) => i.variantKey !== variantKey));
    onItemRemoved?.(); // ✅ trigger parent re-fetch if provided
  };

  return (
    <div
      ref={containerRef}
      className="md:w-full flex flex-col gap-y-4 md:p-6 py-8 px-6 rounded-[20px] border border-black/10 mx-auto"
    >
      {localItems.map((item) => {
        const product = ProductCards.find((p) => p.id === item.productId);
        const image = product?.image?.src || "/fallback.svg";
        const title = product?.title || "Unknown Product";
        const colorName = getNearestColorName(item.selectedColor);
        const price = product?.price || "$—";

        return (
          <div
            key={item.variantKey}
            className="wishlist-row flex md:flex-row flex-col gap-y-5 items-center justify-between gap-x-6 border-b border-black/10 pb-6"
          >
            {/* Image */}
            <div className="bg-[#F0F0F0] rounded-[20px]">
              <img
                src={image}
                alt={title}
                className="w-[100px] h-[110px] rounded-[20px] object-cover"
              />
            </div>

            {/* Title */}
            <div className="flex-1">
              <h4 className="font-satoshi font-bold text-lg">{title}</h4>
            </div>

            {/* Mobile Info */}
            <div className="md:hidden flex flex-row justify-between items-center w-full md:flex-col md:items-start md:gap-y-1">
              <div className="flex flex-col text-sm font-satoshi text-black/60 min-w-[100px]">
                {item.selectedSize && <p>Size: {item.selectedSize}</p>}
                {item.selectedColor && <p>Color: {colorName}</p>}
              </div>
              <div className="font-satoshi font-bold text-[20px] min-w-[80px] text-right md:text-left">
                {price}
              </div>
            </div>

            {/* Desktop Info */}
            <div className="md:flex hidden flex-col text-sm font-satoshi text-black/60 min-w-[100px]">
              {item.selectedSize && <p>Size: {item.selectedSize}</p>}
              {item.selectedColor && <p>Color: {colorName}</p>}
            </div>

            {/* Price */}
            <div className="md:block hidden font-satoshi font-bold text-[20px] min-w-[80px] text-right">
              {price}
            </div>

            {/* Actions */}
            <div className="flex flex-row items-center md:gap-x-4 md:w-auto justify-center gap-x-8 md:justify-stretch w-full px-3 md:px-0">
              <button
                type="button"
                onClick={() => handleBuyNow(item)}
                className="bg-black text-white px-4 py-2 rounded-full hover:bg-gray-800 transition-all flex items-center gap-x-2"
              >
                <BsCartPlus size={18} />
                <span className="text-sm font-satoshi">Buy now</span>
              </button>

              {isOwner && (
                <button
                  type="button"
                  onClick={() => handleRemove(item.variantKey)}
                >
                  <RiDeleteBinFill
                    size={24}
                    className="text-[#FF3333] cursor-pointer"
                  />
                </button>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
