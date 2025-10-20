"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { useSession } from "next-auth/react";

const CartContext = createContext();

export function CartProvider({ children }) {
  const { data: session, status } = useSession();
  const [cartItems, setCartItems] = useState([]);

  // ✅ Add to cart
  const addToCart = ({
    product,
    quantity,
    selectedColors,
    selectedSizes,
    selectedStyle,
  }) => {
    if (!product?.id || !selectedColors?.length || !selectedSizes?.length)
      return;

    const combinations = [];
    selectedColors.forEach((color) => {
      selectedSizes.forEach((size) => {
        combinations.push({ color, size });
      });
    });

    const totalCombos = combinations.length;
    const quantityPerCombo = Math.max(1, Math.floor(quantity / totalCombos));

    setCartItems((prev) => {
      const updated = [...prev];

      combinations.forEach(({ color, size }) => {
        const variantKey = `${product.id}-${color}-${size}`;
        const existing = updated.find((item) => item.variantKey === variantKey);

        if (existing) {
          existing.quantity += quantityPerCombo;
        } else {
          updated.push({
            ...product,
            quantity: quantityPerCombo,
            selectedColor: color,
            selectedSize: size,
            selectedStyle,
            variantKey,
            addedAt: Date.now(),
          });
        }
      });

      return updated;
    });
  };

  // ✅ Remove item
  const removeFromCart = async (variantKey) => {
    setCartItems((prev) =>
      prev.filter((item) => item.variantKey !== variantKey)
    );
    await fetch("/api/cart/remove", {
      method: "POST",
      body: JSON.stringify({ variantKey }),
      headers: { "Content-Type": "application/json" },
    });
  };

  // ✅ Update quantity
  const updateQuantity = (variantKey, quantity) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.variantKey === variantKey
          ? { ...item, quantity: Math.max(1, quantity) }
          : item
      )
    );
  };

  // ✅ Clear cart
  const clearCart = () => setCartItems([]);

  // ✅ Load cart from MongoDB
  const loadCartFromDB = async () => {
    try {
      const res = await fetch("/api/cart/load");
      const data = await res.json();
      if (Array.isArray(data.cartItems)) {
        setCartItems(data.cartItems);
      }
    } catch (err) {
      console.error("Failed to load cart:", err);
    }
  };

  // ✅ Sync cart to MongoDB
  const syncCartToDB = async (items) => {
    try {
      await fetch("/api/cart/save", {
        method: "POST",
        body: JSON.stringify({ cartItems: items }),
        headers: { "Content-Type": "application/json" },
      });
    } catch (err) {
      console.error("Failed to sync cart:", err);
    }
  };

  // ✅ Load on mount (only when authenticated)
  useEffect(() => {
    if (status === "authenticated") {
      loadCartFromDB();
    }
  }, [status]);

  // ✅ Sync on change
  useEffect(() => {
    if (status === "authenticated" && cartItems.length > 0) {
      syncCartToDB(cartItems);
    }
  }, [cartItems, status]);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
