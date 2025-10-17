"use client";

import { useWishlist } from "@/context/WishlistContext";
import { useCart } from "@/context/CartContext";
import { ProductCards } from "@/mocks/Products";
import { RiDeleteBinFill } from "react-icons/ri";
import { BsCartPlus } from "react-icons/bs";
import gsap from "gsap";
import { useEffect, useRef } from "react";
import getNearestColorName from "@/lib/wishlist/getNearestColorName";

export default function WishlistCard() {
  const { wishlistItems, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();
  const containerRef = useRef();

  useEffect(() => {
    const items = containerRef.current.querySelectorAll(".wishlist-row");
    gsap.set(items, { opacity: 0, y: 20 });
    gsap.to(items, {
      opacity: 1,
      y: 0,
      duration: 0.5,
      stagger: 0.1,
      ease: "power2.out",
    });
  }, [wishlistItems]);

  return (
    <div
      ref={containerRef}
      className="md:w-full flex flex-col gap-y-4 md:p-6 py-8 px-6 rounded-[20px] border border-black/10 mx-auto"
    >
      {wishlistItems.map((item) => {
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

            <div className="md:hidden flex flex-row justify-between items-center w-full md:flex-col md:items-start md:gap-y-1">
              <div className="flex flex-col text-sm font-satoshi text-black/60 min-w-[100px]">
                {item.selectedSize && <p>Size: {item.selectedSize}</p>}
                {item.selectedColor && <p>Color: {colorName}</p>}
              </div>

              <div className="font-satoshi font-bold text-[20px] min-w-[80px] text-right md:text-left">
                {price}
              </div>
            </div>

            {/* Info */}
            <div className="md:flex hidden flex-col text-sm font-satoshi text-black/60 min-w-[100px]">
              {item.selectedSize && <p>Size: {item.selectedSize}</p>}
              {item.selectedColor && <p>Color: {colorName}</p>}
            </div>

            {/* Price */}
            <div className="md:block hidden font-satoshi font-bold text-[20px] min-w-[80px] text-right">
              {price}
            </div>

            {/* Actions */}
            <div className="flex flex-row items-center md:gap-x-4 md:w-auto justify-between md:justify-stretch w-full px-3 md:px-0">
              {/* Add to Cart */}
              <button
                onClick={() =>
                  addToCart({
                    product,
                    quantity: 1,
                    selectedColors: item.selectedColor
                      ? [item.selectedColor]
                      : [],
                    selectedSizes: item.selectedSize ? [item.selectedSize] : [],
                  })
                }
                className="bg-black text-white px-4 py-2 rounded-full hover:bg-gray-800 transition-all flex items-center gap-x-2"
              >
                <BsCartPlus size={18} />
                <span className="text-sm font-satoshi">Add to Cart</span>
              </button>

              {/* Delete */}
              <button onClick={() => removeFromWishlist(item.variantKey)}>
                <RiDeleteBinFill
                  size={24}
                  className="text-[#FF3333] cursor-pointer"
                />
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}
