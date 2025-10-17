"use client";

import gsap from "gsap";
import { useEffect, useRef, useState } from "react";

export default function ProductColor({ colors = [], onSelect }) {
  const [selectedColors, setSelectedColors] = useState([]);
  const [lastToggled, setLastToggled] = useState(null);
  const checkRefs = useRef([]);

  const toggleColor = (color) => {
    const updated = selectedColors.includes(color)
      ? selectedColors.filter((c) => c !== color)
      : [...selectedColors, color];

    setSelectedColors(updated);
    setLastToggled(color);
    onSelect?.(updated);
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
  }, [lastToggled, selectedColors, colors]);

  if (!colors.length) return null;

  return (
    <div className="flex flex-col gap-y-2">
      <p className="font-satoshi text-base font-normal text-black/60">
        Select Colors
      </p>
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
    </div>
  );
}
