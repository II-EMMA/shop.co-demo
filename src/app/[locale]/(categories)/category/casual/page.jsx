"use client";

import { usePathname } from "next/navigation";
import { useState } from "react";
import Card from "@/components/cards/Card";
import FilterSidebar from "@/components/filter/FilterSidebar";
import { FaAngleRight, FaAngleDown } from "react-icons/fa";
import { GiSettingsKnobs } from "react-icons/gi";
import {
  FilterLocalProvider,
  useFilterLocalContext,
} from "@/context/FilterLocalContext";

function PageContent() {
  const pathname = usePathname();
  const segments = pathname.split("/");
  const categorySlug = segments[segments.length - 1];
  const categoryName =
    categorySlug.charAt(0).toUpperCase() + categorySlug.slice(1).toLowerCase();

  const { filteredProducts } = useFilterLocalContext();
  const totalProducts = filteredProducts.length;
  const showingStart = 1;
  const showingEnd = filteredProducts.length;

  const [showFilterPopup, setShowFilterPopup] = useState(false);

  return (
    <>
      {/* Overlay + Filter Popup */}
      {showFilterPopup && (
        <div
          className="overflow-x-hidden fixed inset-0 z-[999] bg-white/50 backdrop-blur-sm flex items-center justify-center mt-32"
          onClick={() => setShowFilterPopup(false)}
        >
          <div
            className="w-[90%] sm:w-[400px] max-h-[90vh] bg-white p-6 overflow-y-auto shadow-xl rounded-4xl "
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-end mb-4">
              <button
                onClick={() => setShowFilterPopup(false)}
                className="text-black font-satoshi font-medium text-sm border border-black/10 px-4 py-2 rounded-full hover:bg-black hover:text-white transition-all"
              >
                Close
              </button>
            </div>
            <FilterSidebar closePopup={() => setShowFilterPopup(false)} />
          </div>
        </div>
      )}

      {/* Main Page */}
      <section className="flex flex-col gap-y-10 justify-between mt-20 max-w-[1500px] mx-auto xl:px-[55px] lg:px-[60px]">
        {/* Breadcrumb */}
        <div className="flex flex-row items-center gap-x-2.5 font-satoshi text-base lg:px-1 md:px-14 px-8">
          <p className="text-black/60">Home</p>
          <FaAngleRight />
          <p className="text-black">{categoryName}</p>
        </div>

        {/* Layout */}
        <div className="flex flex-row gap-x-2 justify-between">
          <div className="lg:block lg:min-w-1/4 hidden">
            <FilterSidebar />
          </div>
          <div className="flex flex-col gap-y-5">
            {/* Header */}
            <div className="flex flex-row items-center justify-between md:mx-24 sm:mx-16 mx-8 gap-x-2">
              <h4 className="lg:block hidden font-satoshi font-bold text-[32px]">
                {categoryName}
              </h4>
              <p className="flex flex-row items-center font-satoshi font-normal text-base">
                <span className="lg:hidden block font-satoshi font-bold text-[32px] mr-3">
                  {categoryName}
                </span>
                <span className="text-black/60 lg:mr-3">
                  Showing {showingStart}-{showingEnd} of {totalProducts}{" "}
                  Products
                </span>
              </p>
              <div
                onClick={() => setShowFilterPopup(true)}
                className="bg-[#F0F0F0] hover:bg-gray-300 duration-300 transition-all rounded-full p-3.5 lg:hidden block"
              >
                <GiSettingsKnobs
                  size={20}
                  className="text-black font-black cursor-pointer outline-none"
                />
              </div>
            </div>

            {/* Cards */}
            <Card
              cards={[...filteredProducts].reverse()}
              line={true}
              navigate={true}
              className={"gap-x-3"}
            />
          </div>
        </div>
      </section>
    </>
  );
}

export default function Page() {
  return (
    <FilterLocalProvider>
      <PageContent />
    </FilterLocalProvider>
  );
}
