"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";

import Casual from "@/assets/images/casual.svg";
import Formal from "@/assets/images/formal.svg";
import Party from "@/assets/images/party.svg";
import Gym from "@/assets/images/gym.svg";

export default function BrowseStyling() {
  const imgRefs = useRef([]);

  useEffect(() => {
    imgRefs.current.forEach((img) => {
      if (!img) return;
      const parent = img.closest(".group");

      parent.addEventListener("mouseenter", () => {
        gsap.to(img, { scale: 1.05, duration: 0.4, ease: "power3.out" });
      });

      parent.addEventListener("mouseleave", () => {
        gsap.to(img, { scale: 1, duration: 0.4, ease: "power3.out" });
      });
    });
  }, []);

  const styles = [
    { id: 1, src: Casual.src, alt: "Casual", href: "/en/category/casual" },
    { id: 2, src: Formal.src, alt: "Formal", href: "/category/formal" },
    { id: 3, src: Party.src, alt: "Party", href: "/category/party" },
    { id: 4, src: Gym.src, alt: "Gym", href: "/category/gym" },
  ];

  return (
    <section className="max-w-[1239px] mx-auto bg-[#F0F0F0] rounded-[40px] py-[70px] mt-20">
      <h2 className="font-integral font-extrabold text-5xl text-center mb-16 uppercase">
        BROWSE BY dress STYLE
      </h2>
      <div className="flex flex-row justify-center items-center gap-x-3 mb-3">
        {styles.slice(0, 2).map((style, index) => (
          <Link
            key={style.id}
            href={style.href}
            prefetch={true}
            className="group block overflow-hidden"
          >
            <img
              src={style.src}
              alt={style.alt}
              ref={(el) => (imgRefs.current[index] = el)}
              className="w-full h-auto"
            />
          </Link>
        ))}
      </div>
      <div className="flex flex-row justify-center items-center gap-x-3">
        {styles.slice(2).map((style, index) => (
          <Link
            key={style.id}
            href={style.href}
            className="group block overflow-hidden"
          >
            <img
              src={style.src}
              alt={style.alt}
              ref={(el) => (imgRefs.current[index + 2] = el)}
              className="w-full h-auto"
            />
          </Link>
        ))}
      </div>
    </section>
  );
}
