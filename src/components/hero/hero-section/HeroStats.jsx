"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function HeroStats() {
  return (
    <div className="xl:self-start self-center flex sm:flex-row flex-col 2xl:justify-between sm:gap-x-8 gap-y-5 items-center h-[80px] max-w-[600px] xl:mb-0 sm:mb-16 mb-[400px] mt-5 xl:mt-0">
      <div className="sm:hidden block">
        <Divider />
      </div>
      <StatBlock number={200} label="International Brands" />
      <Divider />
      <StatBlock number={3000} label="High-Quality Products" />
      <Divider />
      <StatBlock number={200} label="Happy Customers" />
      <div className="sm:hidden block">
        <Divider />
      </div>
    </div>
  );
}

function StatBlock({ number, label }) {
  const numberRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      numberRef.current,
      { innerText: 0 },
      {
        innerText: number,
        duration: 4,
        ease: "power3.out",
        snap: { innerText: 1 },
        onUpdate: () => {
          numberRef.current.innerText = `${Math.floor(
            numberRef.current.innerText
          )}+`;
        },
      }
    );
  }, [number]);

  return (
    <div className="flex flex-col gap-y-1 items-center sm:items-start">
      <p ref={numberRef} className="font-bold font-satoshi text-[40px]">
        0+
      </p>
      <p className="font-satoshi text-base text-black opacity-60">{label}</p>
    </div>
  );
}

function Divider() {
  return (
    <span className="inline-block sm:w-[1px] w-screen sm:h-full bg-black sm:opacity-10 pb-px" />
  );
}
