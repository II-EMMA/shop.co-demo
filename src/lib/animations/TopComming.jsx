"use client";
import gsap from "gsap";
import { useEffect, useRef } from "react";

export default function TopComming({ children, open, className }) {
  const progressWrapperRef = useRef(null);

  useEffect(() => {
    if (!progressWrapperRef.current) return;

    const el = progressWrapperRef.current;

    if (open) {
      el.style.display = "block";
      gsap.fromTo(
        el,
        { opacity: 0, y: -20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.3,
          ease: "power3.inOut",
        }
      );
    } else {
      gsap.to(el, {
        opacity: 0,
        y: -20,
        duration: 0.25,
        ease: "power3.inOut",
        onComplete: () => {
          el.style.display = "none";
        },
      });
    }
  }, [open]);

  return (
    <div
      ref={progressWrapperRef}
      className={`w-full ${className}`}
      style={{ display: "none", opacity: 0 }}
    >
      {children}
    </div>
  );
}
