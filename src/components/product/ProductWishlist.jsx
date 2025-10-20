"use client";

import { FaRegHeart, FaHeart } from "react-icons/fa";
import { useWishlist } from "@/context/WishlistContext";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

export default function ProductWishlist({
  product,
  selectedColors,
  selectedSizes,
  onFeedback,
}) {
  const { data: session, status } = useSession();
  const { wishlistItems, addToWishlist, removeProductFromWishlist } =
    useWishlist();

  const [isWishedLocal, setIsWishedLocal] = useState(false);

  useEffect(() => {
    const isWished = wishlistItems.some((i) => i.productId === product.id);
    setIsWishedLocal(isWished);
  }, [wishlistItems, product.id]);

  if (status === "loading") return null;
  if (!session?.user?.id) return null;

  const handleClick = () => {
    const isWished = wishlistItems.some((i) => i.productId === product.id);

    // ✅ Case: product is already wished, and no color/size selected → remove all variants
    if (isWished && !selectedColors?.length && !selectedSizes?.length) {
      setIsWishedLocal(false);
      removeProductFromWishlist(product.id);
      onFeedback?.("removed");
      return;
    }

    // ✅ Warn if only one of color/size is selected
    if (
      (!selectedColors?.length && selectedSizes?.length) ||
      (selectedColors?.length && !selectedSizes?.length)
    ) {
      onFeedback?.("warn");
      return;
    }

    // ✅ Build variant keys
    const newVariantKeys = selectedColors.flatMap((color) =>
      selectedSizes.map((size) => `${product.id}-${color}-${size}`)
    );

    const alreadySaved = wishlistItems
      .filter((i) => i.productId === product.id)
      .map((i) => i.variantKey);

    const allVariantsAlreadySaved = newVariantKeys.every((key) =>
      alreadySaved.includes(key)
    );

    if (allVariantsAlreadySaved) {
      onFeedback?.("already");
      return;
    }

    // ✅ Add new variants
    setIsWishedLocal(true);
    addToWishlist({
      productId: product.id,
      selectedColors,
      selectedSizes,
    });
    onFeedback?.("success");
  };

  return (
    <div
      onClick={handleClick}
      className="flex flex-row gap-x-5 items-center cursor-pointer"
    >
      {isWishedLocal ? (
        <FaHeart size={26} className="text-red-500" />
      ) : (
        <FaRegHeart size={26} />
      )}
      <p className="text-base font-medium font-satoshi">
        {isWishedLocal ? "Saved to Wishlist" : "Save to Wishlist"}
      </p>
    </div>
  );
}
