"use client";

import React from "react";
import { RiDeleteBinFill } from "react-icons/ri";
import { useCart } from "@/context/CartContext";
import { ProductCards } from "@/mocks/Products";

function getNearestColorName(hex) {
  if (!hex) return "Unknown";

  const hexColor = hex.toLowerCase();
  const colorMap = {
    red: ["#f50606", "#cb1111", "#c80018"],
    blue: ["#063af5", "#06caf5"],
    green: ["#00c12b"],
    yellow: ["#f5dd06"],
    black: ["#000000"],
    white: ["#ffffff", "#f0f0f0"],
    pink: ["#f506a4"],
    orange: ["#f57906"],
    purple: ["#7d06f5"],
    brown: ["#4f4631", "#314f4a", "#31344f"],
  };

  for (const [name, shades] of Object.entries(colorMap)) {
    if (shades.includes(hexColor)) return name;
  }

  return "Custom";
}

export default function CartCard() {
  const { cartItems, removeFromCart, updateQuantity } = useCart();

  return (
    <div className="lg:w-7/12 w-full flex flex-col gap-y-6 p-6 rounded-[20px] border border-black/10">
      {cartItems.map((item) => {
        const { id, selectedColor, selectedSize, quantity, price, variantKey } =
          item;

        const product = ProductCards.find((p) => p.id === id);
        const image = product?.image?.src || "/fallback.svg";
        const title = product?.title || "Unknown Product";
        const colorName = getNearestColorName(selectedColor);

        return (
          <div key={variantKey} className="card">
            <div className="flex flex-row justify-between">
              <div className="flex flex-row  gap-x-3.5">
                <div className="bg-[#F0F0F0] rounded-[20px] flex justify-center items-center">
                  <img
                    src={image}
                    alt={title}
                    className="sm:w-[130px] h-[140px] w-[90px] sm:min-w-[130px] min-h-[140px] min-w-[90px]  rounded-[20px]"
                  />
                </div>
                <div className="flex flex-col justify-between my-0.5">
                  <div className="flex flex-col gap-y-0.5">
                    <h4 className="font-satoshi font-bold text-xl mb-0.5">
                      {title}
                    </h4>
                    <p className="font-satoshi font-normal text-sm">
                      Size:{" "}
                      <span className="text-black/60">{selectedSize}</span>
                    </p>
                    <p className="font-satoshi font-normal text-sm">
                      Color: <span className="text-black/60">{colorName}</span>
                    </p>
                  </div>
                  <p className="font-satoshi font-bold text-[24px]">{price}</p>
                </div>
              </div>
              <div className="flex flex-col justify-between">
                <button
                  onClick={() => removeFromCart(variantKey)}
                  className="self-end"
                >
                  <RiDeleteBinFill
                    size={24}
                    className="text-[#FF3333] cursor-pointer"
                  />
                </button>
                <div className="flex flex-row items-center gap-x-7 bg-[#F0F0F0] rounded-3xl py-1.5 px-6.5">
                  <button
                    onClick={() => updateQuantity(variantKey, quantity - 1)}
                    className="text-2xl font-bold cursor-pointer select-none"
                  >
                    –
                  </button>
                  <p className="font-satoshi text-base font-medium">
                    {quantity}
                  </p>
                  <button
                    onClick={() => updateQuantity(variantKey, quantity + 1)}
                    className="text-2xl font-bold cursor-pointer select-none"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
            <span className="inline-block w-full h-px bg-black/10 mt-7" />
          </div>
        );
      })}
    </div>
  );
}
