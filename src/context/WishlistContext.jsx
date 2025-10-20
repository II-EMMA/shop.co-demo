"use client";

import { createContext, useContext, useState, useEffect } from "react";

const WishlistContext = createContext();

export function WishlistProvider({ children }) {
  const [wishlistItems, setWishlistItems] = useState([]);

  const fetchWishlist = async () => {
    try {
      const res = await fetch("/api/wishlist");
      const text = await res.text();

      if (!text) {
        console.warn("Empty response from wishlist API");
        setWishlistItems([]);
        return;
      }

      const data = JSON.parse(text);
      setWishlistItems(data.items || []);
    } catch (err) {
      console.error("Failed to fetch wishlist:", err);
      setWishlistItems([]);
    }
  };

  useEffect(() => {
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

    try {
      await Promise.all(
        newItems.map((item) =>
          fetch("/api/wishlist", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(item),
          })
        )
      );
      await fetchWishlist();
    } catch (err) {
      console.error("Failed to add to wishlist:", err);
    }
  };

  const removeFromWishlist = async (variantKey) => {
    try {
      await fetch("/api/wishlist", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ variantKey }),
      });

      setWishlistItems((prev) =>
        prev.filter((item) => item.variantKey !== variantKey)
      );
    } catch (err) {
      console.error("Failed to delete variant:", err);
    }
  };

  return (
    <WishlistContext.Provider
      value={{
        wishlistItems,
        addToWishlist,
        removeFromWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

export const useWishlist = () => useContext(WishlistContext);
