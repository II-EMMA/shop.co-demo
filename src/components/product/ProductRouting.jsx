"use client";

import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import gsap from "gsap";

const tabs = [
  // { label: "Product Details", key: "details" },
  { label: "Rating & Reviews", key: "reviews" },
  { label: "FAQs", key: "faqs" },
];

export default function ProductRouting() {
  const searchParams = useSearchParams();
  const tabRefs = useRef([]);
  const underlineRef = useRef(null);

  const currentTabKey = searchParams.get("tab") || "reviews";
  const currentTabLabel =
    tabs.find((t) => t.key === currentTabKey)?.label || "Rating & Reviews";
  const [activeTab, setActiveTab] = useState(currentTabLabel);

  useEffect(() => {
    const index = tabs.findIndex((tab) => tab.label === activeTab);
    const target = tabRefs.current[index];
    if (!target || !underlineRef.current) return;

    const bounds = target.getBoundingClientRect();
    const parentBounds = target.parentNode.getBoundingClientRect();

    gsap.to(underlineRef.current, {
      x: bounds.left - parentBounds.left,
      width: bounds.width,
      duration: 0.4,
      ease: "power3.out",
    });
  }, [activeTab]);

  const handleTabClick = (tab) => {
    setActiveTab(tab.label);

    const newUrl = `?tab=${tab.key}`;
    window.history.replaceState(null, "", newUrl);
  };

  return (
    <div className="relative flex flex-row justify-between items-center font-satoshi text-xl mt-20 text-center">
      {tabs.map((tab, index) => (
        <p
          key={tab.key}
          ref={(el) => (tabRefs.current[index] = el)}
          onClick={() => handleTabClick(tab)}
          className={`self-center cursor-pointer transition-all duration-300 ${
            activeTab === tab.label
              ? "font-bold text-black"
              : "font-normal text-black/60 hover:text-black"
          }`}
        >
          {tab.label}
        </p>
      ))}

      {/* Static full-width track line */}
      <span className="absolute -bottom-10 left-0 w-full h-[2px] bg-black/10" />

      {/* Animated underline */}
      <span
        ref={underlineRef}
        className="absolute -bottom-10 h-[2px] bg-black"
        style={{ width: 0, transform: "translateX(0px)" }}
      />
    </div>
  );
}
