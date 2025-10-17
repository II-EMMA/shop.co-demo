"use client";

import { useState } from "react";

export default function ProductImage({ product }) {
  const [activeImage, setActiveImage] = useState(product?.image?.src || null);

  const handlePreviewClick = (src) => {
    if (src) setActiveImage(src);
  };

  // Build preview list: main image + 2 from prevImages or null placeholders
  const previewList = [
    product?.image?.src || null,
    ...(product?.prevImages?.map((img) => img?.src) || []),
  ].slice(0, 3);

  while (previewList.length < 3) {
    previewList.push(null);
  }

  return (
    <div className="flex lg:flex-row flex-col-reverse justify-between items-center lg:gap-x-3.5 gap-y-3.5">
      <div className="flex lg:flex-col flex-row items-center lg:gap-y-3.5 gap-3.5 sm:flex-nowrap flex-wrap sm:justify-stretch justify-center">
        {previewList.map((src, index) =>
          src ? (
            <img
              key={index}
              src={src}
              alt={product.title}
              onClick={() => handlePreviewClick(src)}
              className={`w-[152px] h-[137px] bg-[#F0EEED] rounded-3xl border transition-transform duration-300 ease-in-out hover:scale-[1.03] active:scale-[0.97] cursor-pointer ${
                activeImage === src ? "border-black" : "border-none"
              }`}
            />
          ) : (
            <div
              key={index}
              className="w-[152px] h-[137px] rounded-3xl border-2 border-dashed border-black/20 bg-transparent"
            />
          )
        )}
      </div>

      <div>
        {activeImage ? (
          <img
            src={activeImage}
            alt={product.title}
            className="w-[444px] h-[530px] rounded-3xl transition-transform duration-300 ease-in-out hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
          />
        ) : (
          <div className="w-[444px] h-[530px] rounded-3xl border-2 border-dashed border-black/20 bg-transparent" />
        )}
      </div>
    </div>
  );
}
