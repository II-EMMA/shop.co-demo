"use client";

import TopComming from "@/lib/animations/TopComming";
import { useState } from "react";
import { FaAngleRight } from "react-icons/fa6";
import { FaAngleRight as FaAngleRightSmall } from "react-icons/fa";
import { GiSettingsKnobs } from "react-icons/gi";
import { useFilterLocalContext } from "@/context/FilterLocalContext";

export default function FilterStylies({
  styles = [],
  title,
  icon = "FaAngleRight",
  openIntail,
}) {
  const [open, setOpen] = useState(openIntail);
  const Icon = icon === "GiSettingsKnobs" ? GiSettingsKnobs : FaAngleRight;

  const { filters, updateFilter, applyFilters } = useFilterLocalContext();
  const selected = title === "Filters" ? filters.styles : filters.styleTags;

  const toggleStyle = (style) => {
    const updated = selected.includes(style)
      ? selected.filter((s) => s !== style)
      : [...selected, style];

    updateFilter(title === "Filters" ? "styles" : "styleTags", updated);
  };

  return (
    <div className="flex flex-col gap-y-7 items-center w-full">
      <div className="flex justify-between items-center w-full">
        <p className="font-satoshi font-bold text-xl">{title}</p>
        <Icon
          onClick={() => setOpen(!open)}
          className={`text-black/40 font-bold hover:text-black duration-300 transition-all cursor-pointer outline-none ${
            icon === "FaAngleRight" && open ? "-rotate-90" : "rotate-0"
          }`}
        />
      </div>

      <TopComming open={open}>
        <div className="flex flex-col gap-y-4">
          {styles.map((style) => (
            <div
              key={style}
              onClick={() => toggleStyle(style)}
              className="flex flex-row items-center justify-between cursor-pointer"
            >
              <p
                className={`font-satoshi text-base transition-all duration-300 ${
                  selected.includes(style)
                    ? "font-bold text-black"
                    : "font-normal text-black/60"
                }`}
              >
                {style}
              </p>
              <FaAngleRightSmall
                className={`text-black/40 hover:text-black duration-300 transition-all outline-none ${
                  selected.includes(style) ? "rotate-90" : ""
                }`}
              />
            </div>
          ))}
        </div>
      </TopComming>
    </div>
  );
}
