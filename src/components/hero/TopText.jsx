"use client";
import { useRef, useState } from "react";
import { gsap } from "gsap";
import { MdClose } from "react-icons/md";
import Link from "next/link";

export default function TopText() {
  const bannerRef = useRef(null);
  const [isVisible, setIsVisible] = useState(true);

  const handleClose = () => {
    if (!bannerRef.current) return;

    gsap.to(bannerRef.current, {
      opacity: 0,
      y: -50,
      duration: 0.6,
      ease: "power2.inOut",
      onComplete: () => setIsVisible(false),
    });
  };

  if (!isVisible) return null;

  return (
    <div
      ref={bannerRef}
      className="relative bg-black full-bleed-black text-white font-satoshi 
                 text-xs sm:text-sm md:text-base lg:text-lg 
                 max-w-[1500px] mx-auto 
                 px-3 sm:px-6 md:px-8 
                 py-2 sm:py-3 md:py-4"
    >
      <div className="text-center px-6 sm:px-0">
        <p className="leading-snug sm:leading-normal">
          <span className="opacity-85">
            Sign up and get 20% off to your first order.
          </span>{" "}
          <span className="underline underline-offset-[3px]">
            <Link href="/">Sign Up Now</Link>
          </span>
        </p>
      </div>

      <button
        type="button"
        onClick={handleClose}
        className="absolute right-3 sm:right-5 md:right-7 
                   top-1/2 -translate-y-1/2 
                   sm:text-xl 
                   cursor-pointer"
      >
        <MdClose />
      </button>
    </div>
  );
}
