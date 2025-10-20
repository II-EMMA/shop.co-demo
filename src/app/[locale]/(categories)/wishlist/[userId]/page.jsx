// "use client";

// import { useEffect, useState } from "react";
// import { useParams } from "next/navigation";
// import { useSession } from "next-auth/react";
// import WishlistCard from "@/components/wishlist/WishlistCard";

// export default function WishlistPage() {
//   const { userId } = useParams();
//   const { data: session, status } = useSession();

//   const [wishlistItems, setWishlistItems] = useState([]);
//   const [userName, setUserName] = useState("");
//   const [isOwner, setIsOwner] = useState(false);

//   const fetchWishlist = async () => {
//     if (!userId || status === "loading") return;

//     try {
//       const res = await fetch(`/api/wishlist/${userId}`);
//       const text = await res.text();

//       if (!text) {
//         console.warn("Empty response from wishlist API");
//         setWishlistItems([]);
//         setUserName("...");
//         return;
//       }

//       const data = JSON.parse(text);
//       setWishlistItems(data.items || []);

//       const isViewingOwn = session?.user?.id === userId;
//       setIsOwner(isViewingOwn);

//       const resolvedName = isViewingOwn
//         ? session?.user?.name || "You"
//         : data.userName || userId;

//       setUserName(resolvedName);
//     } catch (err) {
//       console.error("Wishlist fetch failed:", err);
//       setWishlistItems([]);
//       setUserName("...");
//     }
//   };

//   useEffect(() => {
//     fetchWishlist();
//   }, [userId, session, status]);

//   const displayName = userName ? userName.split(" ")[0] : "...";

//   return (
//     <section className="overflow-x-hidden max-w-[1500px] mx-auto px-12 mt-20 flex flex-col gap-y-12">
//       <h2 className="font-integral font-extrabold text-5xl text-center uppercase">
//         Wishlist of {displayName}
//       </h2>

//       <WishlistCard
//         items={wishlistItems}
//         isOwner={isOwner}
//         onItemRemoved={fetchWishlist} // ✅ triggers re-sync after deletion
//       />
//     </section>
//   );
// }

// app/wishlist/[userId]/page.tsx
import WishlistClientWrapper from "@/components/wishlist/WishlistClientWrapper";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/authOptions";

export const dynamic = "force-dynamic";
export const revalidate = 60;

export default async function WishlistPage({ params }) {
  const { userId } = params;
  const session = await getServerSession(authOptions);

  let wishlistItems = [];
  let userName = "...";
  let isOwner = false;

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/wishlist/${userId}`,
      {
        next: { revalidate: 60 },
      }
    );
    const data = await res.json();

    wishlistItems = data.items || [];
    isOwner = session?.user?.id === userId;
    userName = isOwner ? session?.user?.name || "You" : data.userName || userId;
  } catch (err) {
    console.error("Wishlist fetch failed:", err);
  }

  const displayName = userName.split(" ")[0];

  return (
    <section className="overflow-x-hidden max-w-[1500px] mx-auto px-12 mt-20 flex flex-col gap-y-12">
      <h2 className="font-integral font-extrabold text-5xl text-center uppercase">
        Wishlist of {displayName}
      </h2>

      <WishlistClientWrapper
        items={wishlistItems}
        isOwner={isOwner}
        onItemRemoved={() => {}}
      />
    </section>
  );
}
