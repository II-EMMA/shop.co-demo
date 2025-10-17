"use client";

import TopComming from "@/lib/animations/TopComming";
import { useState, useRef, useEffect } from "react";
import { FaAngleRight } from "react-icons/fa6";
import gsap from "gsap";
import { useFilterLocalContext } from "@/context/FilterLocalContext";

const colors = [
  "#00C12B",
  "#F50606",
  "#F5DD06",
  "#F57906",
  "#06CAF5",
  "#063AF5",
  "#7D06F5",
  "#F506A4",
  "#FFFFFF",
  "#000000",
];

export default function FilterColor() {
  const [open, setOpen] = useState(false);
  const [selectedColors, setSelectedColors] = useState([]);
  const [lastToggled, setLastToggled] = useState(null);
  const checkRefs = useRef([]);

  const { updateFilter } = useFilterLocalContext();

  const toggleColor = (color) => {
    const updated = selectedColors.includes(color)
      ? selectedColors.filter((c) => c !== color)
      : [...selectedColors, color];

    setSelectedColors(updated);
    setLastToggled(color);
    updateFilter("colors", updated); // ✅ sync with context
  };

  useEffect(() => {
    if (!lastToggled) return;

    const index = colors.indexOf(lastToggled);
    const ref = checkRefs.current[index];
    if (!ref) return;

    const path = ref.querySelector("path");
    const isSelected = selectedColors.includes(lastToggled);

    if (isSelected) {
      gsap.set(ref, { opacity: 1 });
      gsap.fromTo(
        path,
        { strokeDasharray: 24, strokeDashoffset: 24 },
        {
          strokeDashoffset: 0,
          duration: 0.4,
          ease: "power3.out",
        }
      );
    } else {
      gsap.to(ref, {
        opacity: 0,
        duration: 0.2,
        ease: "power3.in",
      });
    }
  }, [lastToggled, selectedColors]);

  useEffect(() => {
    setSelectedColors([]);
    setLastToggled(null);
    updateFilter("colors", []); // ✅ reset context on close
  }, [open, updateFilter]);

  return (
    <div className="flex flex-col gap-y-7 items-center w-full">
      <div className="flex justify-between items-center w-full px-1">
        <p className="font-satoshi font-bold text-xl">Color</p>
        <FaAngleRight
          onClick={() => setOpen(!open)}
          className={`text-black/40 hover:text-black duration-300 transition-all cursor-pointer outline-none ${
            open ? "-rotate-90" : "rotate-0"
          }`}
        />
      </div>

      <TopComming open={open}>
        <div className="flex flex-row flex-wrap gap-4 w-full">
          {colors.map((color, index) => (
            <button
              key={color}
              onClick={() => toggleColor(color)}
              className="w-9 h-9 rounded-full outline-none border hover:scale-105 transition-all duration-200 focus:scale-105 border-black/20 relative flex items-center justify-center"
              style={{ backgroundColor: color }}
            >
              <svg
                ref={(el) => (checkRefs.current[index] = el)}
                viewBox="0 0 24 24"
                fill="none"
                stroke={color === "#FFFFFF" ? "#000" : "#fff"}
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="absolute w-4 h-4 pointer-events-none"
                style={{ opacity: 0 }}
              >
                <path d="M5 13l4 4L19 7" />
              </svg>
            </button>
          ))}
        </div>
      </TopComming>
    </div>
  );
}
