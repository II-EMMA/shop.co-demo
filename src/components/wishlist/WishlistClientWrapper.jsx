// components/wishlist/WishlistClientWrapper.tsx
"use client";

import WishlistCard from "@/components/wishlist/WishlistCard";

export default function WishlistClientWrapper({
  items,
  isOwner,
  onItemRemoved,
}) {
  return (
    <WishlistCard
      items={items}
      isOwner={isOwner}
      onItemRemoved={onItemRemoved}
    />
  );
}
