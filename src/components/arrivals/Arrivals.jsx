"use client";

import { ProductCards } from "@/mocks/Products";
import Card from "../cards/Card";

const sortedByDate = [...ProductCards].sort(
  (a, b) => new Date(b.date) - new Date(a.date)
);
const cards = sortedByDate.slice(0, 4);

export default function Arrivals() {
  return (
    <section
      id="new-arrivals"
      className="scroll-mt-24 max-w-[1500px] mx-auto flex flex-col items-center"
    >
      <h2 className="font-integral font-extrabold text-5xl mt-16 text-center mb-12">
        NEW ARRIVALS
      </h2>

      <div className="w-full flex justify-center">
        <Card cards={cards} className="gap-x-5" />
      </div>

      <button className="font-satoshi font-medium text-base text-black px-16 py-3 rounded-full cursor-pointer mt-16 border border-black/10 self-center hover:bg-black hover:text-white transition-all duration-400">
        View All
      </button>
    </section>
  );
}
