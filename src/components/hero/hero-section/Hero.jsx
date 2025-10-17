"use client";

import HeroImage from "./HeroImage";
import HeroStats from "./HeroStats";
import HeroText from "./HeroText";

export default function Hero() {
  return (
    <section
      id="hero"
      className="flex items-center xl:justify-between xl:flex-row flex-col-reverse xl:gap-y-0 gap-y-9 justify-center xl:bg-[#F2F0F1] max-w-[1500px] mx-auto pt-7 full-bleed-shade-white relative z-10 overflow-visible"
    >
      <div className="w-1/2 flex flex-col gap-y-8 2xl:ml-20 xl:ml-16">
        <HeroText />
        <HeroStats />
      </div>
      <HeroImage />
    </section>
  );
}
