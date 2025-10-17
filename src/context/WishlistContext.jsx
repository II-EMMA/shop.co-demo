"use client";

import { createContext, useContext, useState, useEffect } from "react";

const WishlistContext = createContext();

export function WishlistProvider({ children }) {
  const [wishlistItems, setWishlistItems] = useState([]);

  useEffect(() => {
    const fetchWishlist = async () => {
      const res = await fetch("/api/wishlist");
      const data = await res.json();
      setWishlistItems(data.items || []);
    };
    fetchWishlist();
  }, []);

  const addToWishlist = async ({
    productId,
    selectedColors,
    selectedSizes,
  }) => {
    if (!productId || !selectedColors?.length || !selectedSizes?.length) return;

    const newItems = [];

    selectedColors.forEach((color) => {
      selectedSizes.forEach((size) => {
        const variantKey = `${productId}-${color}-${size}`;
        const exists = wishlistItems.some(
          (item) => item.variantKey === variantKey
        );
        if (!exists) {
          newItems.push({
            productId,
            selectedColor: color,
            selectedSize: size,
            variantKey,
          });
        }
      });
    });

    if (newItems.length === 0) return;

    await Promise.all(
      newItems.map((item) =>
        fetch("/api/wishlist", {
          method: "POST",
          body: JSON.stringify(item),
          headers: { "Content-Type": "application/json" },
        })
      )
    );

    const res = await fetch("/api/wishlist");
    const data = await res.json();
    setWishlistItems(data.items || []);
  };

  const removeFromWishlist = async (variantKey) => {
    await fetch(`/api/wishlist/${variantKey}`, { method: "DELETE" });
    setWishlistItems((prev) => prev.filter((i) => i.variantKey !== variantKey));
  };

  const removeProductFromWishlist = async (productId) => {
    setWishlistItems((prev) => prev.filter((i) => i.productId !== productId));
    await fetch(`/api/wishlist/${productId}`, { method: "DELETE" });
  };

  return (
    <WishlistContext.Provider
      value={{
        wishlistItems,
        addToWishlist,
        removeFromWishlist,
        removeProductFromWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

export const useWishlist = () => useContext(WishlistContext);
