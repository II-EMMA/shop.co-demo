"use client";

import { useState, useRef, useEffect } from "react";
import { FaAngleRight } from "react-icons/fa6";
import gsap from "gsap";
import TopComming from "@/lib/animations/TopComming";
import { useFilterLocalContext } from "@/context/FilterLocalContext";

const sizes = [
  "XX-Small",
  "X-Small",
  "Small",
  "Medium",
  "Large",
  "X-Large",
  "XX-Large",
  "3X-Large",
  "4X-Large",
];

export default function FilterSize() {
  const [open, setOpen] = useState(false);
  const [selectedSizes, setSelectedSizes] = useState([]);
  const sizeRefs = useRef([]);

  const { updateFilter } = useFilterLocalContext();

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
  }, [selectedSizes]);

  const toggleSize = (size) => {
    const updated = selectedSizes.includes(size)
      ? selectedSizes.filter((s) => s !== size)
      : [...selectedSizes, size];

    setSelectedSizes(updated);
    updateFilter("sizes", updated); // ✅ sync with context
  };

  useEffect(() => {
    setSelectedSizes([]);
    updateFilter("sizes", []); // ✅ reset context on close
  }, [open, updateFilter]);

  return (
    <div className="flex flex-col gap-y-7 items-center w-full">
      <div className="flex justify-between items-center w-full px-1">
        <p className="font-satoshi font-bold text-xl">Size</p>
        <FaAngleRight
          onClick={() => setOpen(!open)}
          className={`text-black/40 hover:text-black duration-300 transition-all cursor-pointer outline-none ${
            open ? "-rotate-90" : "rotate-0"
          }`}
        />
      </div>

      <TopComming open={open}>
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
      </TopComming>
    </div>
  );
}
