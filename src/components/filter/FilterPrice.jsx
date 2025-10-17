"use client";
import { FaAngleRight } from "react-icons/fa6";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import TopComming from "@/lib/animations/TopComming";
import { useFilterLocalContext } from "@/context/FilterLocalContext";

export default function FilterPrice() {
  const MIN = 0;
  const MAX = 250;

  const [minPrice, setMinPrice] = useState(50);
  const [maxPrice, setMaxPrice] = useState(200);
  const [open, setOpen] = useState(false);

  const { updateFilter } = useFilterLocalContext();

  const trackRef = useRef(null);
  const rangeRef = useRef(null);
  const minHandleRef = useRef(null);
  const maxHandleRef = useRef(null);

  const percent = (value) => ((value - MIN) / (MAX - MIN)) * 100;
  const valueFromX = (x, trackWidth) =>
    Math.round((x / trackWidth) * (MAX - MIN) + MIN);

  useEffect(() => {
    const updateVisuals = () => {
      if (!trackRef.current) return;

      const minPercent = percent(minPrice);
      const maxPercent = percent(maxPrice);

      if (rangeRef.current) {
        rangeRef.current.style.left = `${minPercent}%`;
        rangeRef.current.style.width = `${maxPercent - minPercent}%`;
      }
      if (minHandleRef.current) {
        minHandleRef.current.style.left = `${minPercent}%`;
      }
      if (maxHandleRef.current) {
        maxHandleRef.current.style.left = `${maxPercent}%`;
      }
    };
    updateVisuals();
  }, [minPrice, maxPrice]);

  useEffect(() => {
    updateFilter("price", { min: minPrice, max: maxPrice });
  }, [minPrice, maxPrice, updateFilter]);

  const makeDraggable = (ref, isMin) => {
    const handle = ref.current;
    const track = trackRef.current;

    const onMove = (e) => {
      const rect = track.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const trackWidth = rect.width;
      const value = Math.min(MAX, Math.max(MIN, valueFromX(x, trackWidth)));

      if (isMin) {
        setMinPrice(Math.min(value, maxPrice - 1));
      } else {
        setMaxPrice(Math.max(value, minPrice + 1));
      }
    };

    const onUp = () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
    };

    handle.addEventListener("mousedown", () => {
      window.addEventListener("mousemove", onMove);
      window.addEventListener("mouseup", onUp);
    });
  };

  useEffect(() => {
    makeDraggable(minHandleRef, true);
    makeDraggable(maxHandleRef, false);
  }, []);

  return (
    <div className="flex flex-col gap-y-8 items-center w-full">
      <div className="flex justify-between items-center w-full px-1">
        <p className="font-satoshi font-bold text-xl">Price</p>
        <FaAngleRight
          onClick={() => setOpen(!open)}
          className={`text-black/40 hover:text-black duration-300 transition-all cursor-pointer outline-none ${
            open ? "-rotate-90" : "rotate-0"
          }`}
        />
      </div>

      <TopComming open={open} className="mb-6">
        <div
          ref={trackRef}
          className="relative w-full h-1.5 bg-[#F0F0F0] rounded-full mb-2.5"
        >
          <div
            ref={rangeRef}
            className="absolute top-0 h-full bg-black mt-0.5 rounded-full transition-all duration-300"
          />

          {/* Min Handle */}
          <div
            ref={minHandleRef}
            className="font-satoshi font-medium text-sm absolute top-1/2 -translate-y-1/2 w-[20px] h-[20px] bg-black outline-none rounded-full cursor-pointer z-10"
            onMouseEnter={() => gsap.to(minHandleRef.current, { scale: 1.2 })}
            onMouseLeave={() => gsap.to(minHandleRef.current, { scale: 1 })}
          >
            <div className="absolute top-full mt-2 left-1/2 -translate-x-1/2 text-sm text-black font-satoshi">
              ${minPrice}
            </div>
          </div>

          {/* Max Handle */}
          <div
            ref={maxHandleRef}
            className="font-satoshi font-medium text-sm absolute top-1/2 -translate-y-1/2 w-[20px] h-[20px] bg-black outline-none rounded-full cursor-pointer z-10 -ml-1"
            onMouseEnter={() => gsap.to(maxHandleRef.current, { scale: 1.2 })}
            onMouseLeave={() => gsap.to(maxHandleRef.current, { scale: 1 })}
          >
            <div className="absolute top-full mt-2 left-1/2 -translate-x-1/2 text-sm text-black font-satoshi">
              ${maxPrice}
            </div>
          </div>
        </div>
      </TopComming>
    </div>
  );
}
