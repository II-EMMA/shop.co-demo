"use client";

import { useEffect, useState } from "react";
import Card from "../cards/Card";

export default function RelatedProducts({ productId }) {
  const [relatedCards, setRelatedCards] = useState([]);

  useEffect(() => {
    const fetchRelated = async () => {
      try {
        const res = await fetch(`/api/related-products?id=${productId}`);
        const data = await res.json();
        setRelatedCards(data.related || []);
      } catch (error) {
        console.error("Failed to fetch related products:", error);
      }
    };

    fetchRelated();
  }, [productId]);

  return (
    <section className="max-w-[1500px] mx-auto flex flex-col">
      <h2 className="font-integral font-extrabold text-5xl mt-16 text-center mb-12 uppercase">
        You Might Also Like
      </h2>
      <Card cards={relatedCards} className="gap-x-3.5" />
      <button className="font-satoshi font-medium text-base text-black px-16 py-3 rounded-full cursor-pointer mt-16 border border-black/10 self-center hover:bg-black hover:text-white transition-all duration-400">
        View All
      </button>
    </section>
  );
}
