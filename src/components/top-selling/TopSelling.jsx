"use client";

import { useEffect, useState } from "react";
import { ProductCards } from "@/mocks/Products";
import Card from "../cards/Card";

export default function TopSelling() {
  const [topCards, setTopCards] = useState([]);

  useEffect(() => {
    const fetchTop = async () => {
      try {
        const res = await fetch("/api/top-products");
        const data = await res.json();

        const topIds = data.map((item) => item._id);
        const matched = ProductCards.filter((p) => topIds.includes(p.id));

        if (matched.length > 0) {
          setTopCards(matched);
        } else {
          // fallback to mock slice
          setTopCards(ProductCards.slice(4, 8));
        }
      } catch (error) {
        console.error("Failed to fetch top products:", error);
        setTopCards(ProductCards.slice(4, 8)); // fallback on error
      }
    };

    fetchTop();
  }, []);

  return (
    <section
      id="top-selling"
      className="scroll-mt-36 max-w-[1500px] mx-auto flex flex-col mt-14"
    >
      <h2 className="font-integral font-extrabold text-5xl mt-16 text-center mb-12">
        Top Selling
      </h2>
      <Card cards={topCards} className="gap-x-5" />
      <button className="font-satoshi font-medium text-base text-black px-16 py-3 rounded-full cursor-pointer mt-16 border border-black/10 self-center hover:bg-black hover:text-white transition-all duration-400">
        View All
      </button>
    </section>
  );
}
