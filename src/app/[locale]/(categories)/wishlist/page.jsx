"use client";

import WishlistCard from "@/components/wishlist/WishlistCard";

export default function WishlistPage() {
  return (
    <section className="max-w-[1500px] mx-auto px-12 mt-20 flex flex-col gap-y-12">
      <h2 className="font-integral font-extrabold text-5xl text-center uppercase">
        Your Wishlist
      </h2>
      <WishlistCard />
    </section>
  );
}
