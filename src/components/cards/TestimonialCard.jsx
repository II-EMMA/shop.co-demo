"use client";
import { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import { IoIosArrowRoundBack, IoIosArrowRoundForward } from "react-icons/io";
import { BsCheckCircleFill } from "react-icons/bs";
import { TiStar } from "react-icons/ti";
import { TestimonialCards } from "@/mocks/Testimonials";

export default function TestimonialCard() {
  const trackRef = useRef(null);
  const cardRefs = useRef([]);
  const [visibleMap, setVisibleMap] = useState({});
  const cards = TestimonialCards.slice(0, 6);

  const scrollBy = (direction) => {
    if (!trackRef.current || cardRefs.current.length === 0) return;

    const cardWidth = cardRefs.current[0]?.offsetWidth || 360;
    const gap = 12; // gap-x-3 = 0.75rem = 12px
    const scrollAmount = (cardWidth + gap) * direction;

    const currentX = gsap.getProperty(trackRef.current, "x") || 0;
    const container = trackRef.current.parentElement;
    const containerWidth = container.offsetWidth;
    const trackWidth = trackRef.current.scrollWidth;

    const maxScroll = 0;
    const minScroll = containerWidth - trackWidth;

    let targetX = currentX + scrollAmount;
    if (targetX > maxScroll) targetX = maxScroll;
    if (targetX < minScroll) targetX = minScroll;

    gsap.to(trackRef.current, {
      x: targetX,
      duration: 0.6,
      ease: "power2.out",
    });
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const updated = {};
        entries.forEach((entry) => {
          const id = entry.target.getAttribute("data-id");
          updated[id] = entry.intersectionRatio >= 0.9;
        });
        setVisibleMap((prev) => ({ ...prev, ...updated }));
      },
      {
        root: trackRef.current?.parentElement,
        threshold: [0.5, 0.9],
      }
    );

    cardRefs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    let isDown = false;
    let startX = 0;
    let currentX = 0;

    const handleMouseDown = (e) => {
      isDown = true;
      startX = e.pageX;
      currentX = gsap.getProperty(track, "x") || 0;
      track.style.cursor = "grabbing";
    };

    const handleMouseUp = () => {
      isDown = false;
      track.style.cursor = "grab";
    };

    const handleMouseLeave = () => {
      isDown = false;
      track.style.cursor = "grab";
    };

    const handleMouseMove = (e) => {
      if (!isDown) return;
      const delta = e.pageX - startX;
      const targetX = currentX + delta;
      gsap.set(track, { x: targetX });
    };

    track.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    window.addEventListener("mousemove", handleMouseMove);
    track.addEventListener("mouseleave", handleMouseLeave);

    track.style.cursor = "grab";

    return () => {
      track.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("mousemove", handleMouseMove);
      track.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <div className="w-full md:overflow-hidden relative">
      {/* Arrows */}
      <div className="self-end flex gap-x-2 items-center mb-6 justify-end px-4 z-20 relative md:my-0 my-11">
        <button onClick={() => scrollBy(-1)} className="cursor-pointer">
          <IoIosArrowRoundBack className="text-black bg-white" size={35} />
        </button>
        <button onClick={() => scrollBy(1)} className="cursor-pointer">
          <IoIosArrowRoundForward className="text-black bg-white" size={35} />
        </button>
      </div>

      {/* Carousel Track */}
      <div className="overflow-x-auto sm:overflow-hidden px-0">
        <div
          ref={trackRef}
          className="flex flex-row gap-x-3 items-center w-max px-4 sm:px-0"
          style={{ willChange: "transform" }}
        >
          {cards.map((card, index) => {
            const isVisible = visibleMap[card.id];
            return (
              <div
                key={card.id}
                data-id={card.id}
                ref={(el) => (cardRefs.current[index] = el)}
                className={`flex flex-col gap-y-3 border border-black/10 p-7 rounded-[20px] min-w-[360px] transition-all duration-300 ${
                  isVisible ? "" : "lg:blur-sm"
                }`}
              >
                <div className="flex flex-row gap-x-1">
                  <TiStar className="bg-transparent text-[#FFC633]" size={32} />
                  <TiStar className="bg-transparent text-[#FFC633]" size={32} />
                  <TiStar className="bg-transparent text-[#FFC633]" size={32} />
                  <TiStar className="bg-transparent text-[#FFC633]" size={32} />
                  <TiStar className="bg-transparent text-[#FFC633]" size={32} />
                </div>
                <div className="flex gap-x-2 items-center">
                  <h4 className="font-bold font-satoshi text-xl">
                    {card.name}
                  </h4>
                  <BsCheckCircleFill
                    size={19.5}
                    className="text-[#01AB31] bg-white border-0 overflow-hidden rounded-full"
                  />
                </div>
                <p className="font-satoshi text-base text-black opacity-60 max-w-[336px]">
                  {card.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
