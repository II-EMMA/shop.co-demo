"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import Image from "next/image";
import Versace from "@/assets/icons/versace.svg";
import Zara from "@/assets/icons/zara.svg";
import Gucci from "@/assets/icons/gucci.svg";
import Prada from "@/assets/icons/prada.svg";
import CalvinKlein from "@/assets/icons/calvin-klein.svg";

const images = [
  {
    src: Versace,
    alt: "Versace",
    width: 167,
    height: 33,
  },
  {
    src: Zara,
    alt: "Zara",
    width: 91,
    height: 38,
  },
  {
    src: Gucci,
    alt: "Gucci",
    width: 156,
    height: 32,
  },
  {
    src: Prada,
    alt: "Prada",
    width: 194,
    height: 31,
  },
  {
    src: CalvinKlein,
    alt: "Calvin Klein",
    width: 207,
    height: 33,
  },
];

export default function AnimationBar() {
  const marqueeRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const totalWidth = marqueeRef.current.scrollWidth;
      gsap.to(marqueeRef.current, {
        x: `-${totalWidth / 2}`,
        duration: 20,
        ease: "linear",
        repeat: -1,
      });
    }, marqueeRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="brands"
      className="scroll-mt-[130px]  py-8 border-b-primary-gray border-t-primary-gray flex items-center justify-between mx-auto  max-w-[1540px] flex-col gap-y-12 full-bleed-black bg-black px-5"
    >
      <div className="bg-black h-20 flex items-center w-full">
        <div className="container mx-auto">
          <div className="overflow-hidden [mask-image:linear-gradient(to_right,_transparent,_black_25%,_black_75%,_transparent)]">
            <div ref={marqueeRef} className="flex gap-14 flex-none pr-14 w-max">
              {images.concat(images).map((image, index) => (
                <Image
                  key={index}
                  src={image.src}
                  alt={image.alt}
                  width={image.width}
                  height={image.height}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
