"use client";

import { useState, useRef, useEffect } from "react";
import gsap from "gsap";

export default function ProductSize({ sizes = [], onSelect }) {
  const [selectedSizes, setSelectedSizes] = useState([]);
  const sizeRefs = useRef([]);

  const toggleSize = (size) => {
    const updated = selectedSizes.includes(size)
      ? selectedSizes.filter((s) => s !== size)
      : [...selectedSizes, size];

    setSelectedSizes(updated);
    onSelect?.(updated);
  };

  useEffect(() => {
    sizeRefs.current.forEach((ref, index) => {
      if (!ref) return;
      const isSelected = selectedSizes.includes(sizes[index]);

      gsap.to(ref, {
        backgroundColor: isSelected ? "#000000" : "#F0F0F0",
        color: isSelected ? "#FFFFFF" : "#00000099",
        duration: 0.1,
        ease: "power3.inOut",
      });
    });
  }, [selectedSizes, sizes]);

  if (!sizes.length) return null;

  return (
    <div className="flex flex-col gap-y-2">
      <p className="font-satoshi text-base font-normal text-black/60">
        Select Sizes
      </p>
      <div className="flex flex-row flex-wrap gap-2 items-center">
        {sizes.map((size, index) => (
          <p
            key={size}
            ref={(el) => (sizeRefs.current[index] = el)}
            onClick={() => toggleSize(size)}
            className="font-satoshi font-normal text-sm text-black/60 px-5 py-2.5 bg-[#F0F0F0] rounded-full cursor-pointer transition-all border outline-none border-transparent hover:border-black"
          >
            {size}
          </p>
        ))}
      </div>
    </div>
  );
}
