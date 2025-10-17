"use client";

import { useSearchParams } from "next/navigation";
import Questions from "../fqa/Question";
import Rating from "../rating/Rating";

export default function ProductTabContent({ product }) {
  const searchParams = useSearchParams();
  const tab = searchParams.get("tab") || "reviews";

  return (
    <div className="mt-10">
      {/* {tab === "details" && (
        <p className="text-black/80 font-satoshi">Product details go here...</p>
      )} */}
      {tab === "reviews" && <Rating />}
      {tab === "faqs" && <Questions />}
    </div>
  );
}
