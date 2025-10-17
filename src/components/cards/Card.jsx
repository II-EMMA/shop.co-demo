"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";
import { TiStar, TiStarHalfOutline } from "react-icons/ti";

export default function Card({
  cards,
  className,
  line,
  navigate,
  onPageChange,
}) {
  const itemsPerPage = 9;
  const totalPages = Math.ceil(cards.length / itemsPerPage);
  const [currentPage, setCurrentPage] = useState(1);

  const paginatedCards = cards.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  useEffect(() => {
    if (navigate && onPageChange) {
      const start = (currentPage - 1) * itemsPerPage + 1;
      const end = Math.min(currentPage * itemsPerPage, cards.length);
      onPageChange({ start, end });
    }
  }, [currentPage, cards.length, navigate, onPageChange]);

  const handlePageClick = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  return (
    <div
      className={`flex flex-row flex-wrap items-center justify-center gap-y-12 max-w-[1500px] mx-auto ${className}`}
    >
      {paginatedCards.map((card) => {
        const price = parseFloat(card.price.replace("$", ""));
        const discountPrice = card.discountPrice
          ? parseFloat(card.discountPrice.replace("$", ""))
          : null;
        const discountPercent = discountPrice
          ? Math.round(((discountPrice - price) / discountPrice) * 100)
          : null;

        const ratingValue = parseFloat(card.rating.split("/")[0]);
        const fullStars = Math.floor(ratingValue);
        const hasHalfStar = ratingValue % 1 >= 0.5;

        return (
          <div key={card.id} className="flex flex-col gap-y-1">
            {card.image?.src ? (
              <Link href={`/en/${card.id}`}>
                <img
                  src={card.image.src}
                  alt={card.title}
                  className="mb-2 rounded-3xl max-w-[295px] max-h-[300px] transition-transform duration-300 ease-in-out hover:scale-[1.03] active:scale-[0.98] cursor-pointer"
                />
              </Link>
            ) : (
              <Link href={`/en/${card.id}`}>
                <div className="w-[290px] h-[300px] mb-2 rounded-3xl border-2 border-dashed border-black/20 bg-transparent" />
              </Link>
            )}
            <h3 className="font-black font-satoshi text-lg">{card.title}</h3>

            <div className="flex gap-x-3 items-center">
              <div className="flex flex-row items-center">
                {[...Array(fullStars)].map((_, i) => (
                  <TiStar
                    key={i}
                    className="bg-white text-[#FFC633]"
                    size={24}
                  />
                ))}
                {hasHalfStar && (
                  <TiStarHalfOutline
                    className="bg-white text-[#FFC633]"
                    size={24}
                  />
                )}
              </div>
              <p className="text-sm font-normal font-satoshi">
                <span>{ratingValue}</span>/<span className="opacity-60">5</span>
              </p>
            </div>

            <div className="flex flex-row gap-x-3 font-satoshi">
              <p className="font-extrabold text-2xl">{card.price}</p>
              {discountPrice && (
                <>
                  <span className="line-through opacity-40 font-bold text-2xl">
                    {card.discountPrice}
                  </span>
                  <p className="px-3 py-1 rounded-full flex items-center justify-center bg-[#FF33331A]">
                    <span className="text-[#FF3333] text-[12px] font-medium">
                      -{discountPercent}%
                    </span>
                  </p>
                </>
              )}
            </div>
          </div>
        );
      })}

      <span
        className={`${
          line ? "h-px" : ""
        } w-full bg-black/20 inline-block mr-16`}
      />

      {navigate && (
        <div className="flex flex-row justify-between w-full items-center -mt-5 mr-16">
          {/* Previous */}
          <button
            onClick={handlePrev}
            disabled={currentPage === 1}
            className={`cursor-pointer flex flex-row gap-x-2 items-center border border-black/10 py-2 px-4 rounded-lg ${
              currentPage === 1 ? "opacity-40 cursor-not-allowed" : ""
            }`}
          >
            <FaArrowLeft />
            <p className="font-satoshi font-medium text-sm">Previous</p>
          </button>

          {/* Page Numbers */}
          <ul className="font-satoshi text-sm flex flex-row gap-x-0.5 items-center">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <li
                key={page}
                onClick={() => handlePageClick(page)}
                className={`flex justify-center items-center w-10 h-10 rounded-lg cursor-pointer ${
                  page === currentPage
                    ? "bg-black/6 text-black font-medium"
                    : "text-black/50 font-medium hover:bg-black/10"
                }`}
              >
                {page}
              </li>
            ))}
          </ul>

          {/* Next */}
          <button
            onClick={handleNext}
            disabled={currentPage === totalPages}
            className={`cursor-pointer flex flex-row gap-x-2 items-center border border-black/10 py-2 px-4 rounded-lg ${
              currentPage === totalPages ? "opacity-40 cursor-not-allowed" : ""
            }`}
          >
            <p className="font-satoshi font-medium text-sm">Next</p>
            <FaArrowRight />
          </button>
        </div>
      )}
    </div>
  );
}
