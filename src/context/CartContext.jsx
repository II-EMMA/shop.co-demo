"use client";

import { createContext, useContext, useState } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = ({
    product,
    quantity,
    selectedColors,
    selectedSizes,
    selectedStyle, // optional future variant
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

  const removeFromCart = (variantKey) => {
    setCartItems((prev) =>
      prev.filter((item) => item.variantKey !== variantKey)
    );
  };

  const updateQuantity = (variantKey, quantity) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.variantKey === variantKey
          ? { ...item, quantity: Math.max(1, quantity) }
          : item
      )
    );
  };

  const clearCart = () => setCartItems([]);

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
