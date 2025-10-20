"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useSession } from "next-auth/react";
import WishlistCard from "@/components/wishlist/WishlistCard";
import toast from "react-hot-toast";

export default function WishlistPage() {
  const { userId } = useParams();
  const { data: session, status } = useSession();

  const [wishlistItems, setWishlistItems] = useState([]);
  const [userName, setUserName] = useState("");
  const [isOwner, setIsOwner] = useState(false);

  const fetchWishlist = async () => {
    if (!userId || status === "loading") return;

    try {
      const res = await fetch(`/api/wishlist/${userId}`);
      const text = await res.text();

      if (!text) {
        console.warn("Empty response from wishlist API");
        setWishlistItems([]);
        setUserName("...");
        return;
      }

      const data = JSON.parse(text);
      setWishlistItems(data.items || []);

      const isViewingOwn = session?.user?.id === userId;
      setIsOwner(isViewingOwn);

      const resolvedName = isViewingOwn
        ? session?.user?.name || "You"
        : data.userName || userId;

      setUserName(resolvedName);
    } catch (err) {
      console.error("Wishlist fetch failed:", err);
      setWishlistItems([]);
      setUserName("...");
    }
  };

  useEffect(() => {
    fetchWishlist();
  }, [userId, session, status]);

  const displayName = userName ? userName.split(" ")[0] : "...";

  return (
    <section className="overflow-x-hidden max-w-[1500px] mx-auto px-12 mt-20 flex flex-col gap-y-12">
      <h2 className="font-integral font-extrabold text-5xl text-center uppercase">
        Wishlist of {displayName}
      </h2>

      <WishlistCard
        items={wishlistItems}
        isOwner={isOwner}
        onItemRemoved={fetchWishlist} // ✅ triggers re-sync after deletion
        onFeedback={(type) => {
          if (type === "warn") toast.error("Please sign in to continue.");
          if (type === "success") toast.success("Checkout started.");
          if (type === "error") toast.error("Something went wrong.");
        }}
      />
    </section>
  );
}
