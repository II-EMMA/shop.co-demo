"use client";

import { BsCheckCircleFill } from "react-icons/bs";
import { TiStar, TiStarHalfOutline } from "react-icons/ti";
import { HiDotsHorizontal } from "react-icons/hi";
import { GiSettingsKnobs } from "react-icons/gi";
import { FaAngleDown } from "react-icons/fa";
import { TestimonialCards } from "@/mocks/Testimonials";

export default function Rating() {
  const renderStars = (rating) => {
    const numeric = parseFloat(rating);
    const fullStars = Math.floor(numeric);
    const hasHalfStar = numeric % 1 >= 0.5;
    const stars = [];

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <TiStar key={`full-${i}`} className="text-[#FFC633]" size={32} />
      );
    }

    if (hasHalfStar) {
      stars.push(
        <TiStarHalfOutline key="half" className="text-[#FFC633]" size={32} />
      );
    }

    return stars;
  };

  return (
    <div className="flex flex-col">
      {/* Header */}
      <div className="flex sm:flex-row flex-col sm:gap-y-0 gap-y-5 items-center justify-between mb-16 mt-4">
        <div className="font-satoshi flex gap-x-2">
          <span className="font-bold text-2xl">All Reviews</span>
          <span className="text-base text-black/60 font-normal self-end">
            ({TestimonialCards.length})
          </span>
        </div>

        <div className="flex flex-row gap-x-2.5 items-center">
          <div className="bg-[#F0F0F0] hover:bg-gray-300 duration-300 transition-all rounded-full p-3.5">
            <GiSettingsKnobs
              size={20}
              className="text-black font-black cursor-pointer outline-none"
            />
          </div>
          <button className="font-satoshi font-medium text-base bg-[#F0F0F0] py-3 px-5 rounded-full flex flex-row items-center gap-x-2">
            Latest
            <FaAngleDown className="cursor-pointer" />
          </button>
          <button className="font-satoshi font-medium text-base text-white bg-black py-3 px-5 flex justify-center items-center hover:text-black hover:bg-white hover:border-black border duration-300 transition-all rounded-full">
            Write a Review
          </button>
        </div>
      </div>

      {/* Reviews Grid */}
      <div className="grid md:grid-cols-2 grid-cols-1 xl:gap-5 lg:gap-4 gap-3">
        {TestimonialCards.map((card) => (
          <div
            key={card.id}
            className="flex flex-col gap-y-3 border border-black/10 p-7 rounded-[20px] lg:min-w-[360px] min-w-[300px] transition-all duration-300"
          >
            <div className="flex flex-row w-full justify-between items-center">
              <div className="flex flex-row gap-x-1">
                {renderStars(card.rating)}
              </div>
              <HiDotsHorizontal />
            </div>
            <div className="flex gap-x-2 items-center">
              <h4 className="font-bold font-satoshi text-xl">{card.name}</h4>
              <BsCheckCircleFill
                size={19.5}
                className="text-[#01AB31] bg-white border-0 overflow-hidden rounded-full"
              />
            </div>
            <p className="font-satoshi text-base text-black opacity-60">
              {card.description}
            </p>
            <p className="font-satoshi text-base font-medium text-black/60 mt-1">
              Posted on{" "}
              {new Date(card.date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
