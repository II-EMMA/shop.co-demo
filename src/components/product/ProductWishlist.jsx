"use client";

import { FaRegHeart, FaHeart } from "react-icons/fa";
import { useWishlist } from "@/context/WishlistContext";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

export default function ProductWishlist({
  product,
  selectedColors,
  selectedSizes,
  onFeedback, // ✅ Add this
}) {
  const { data: session } = useSession();

  const { wishlistItems, addToWishlist, removeProductFromWishlist } =
    useWishlist();

  const [isWishedLocal, setIsWishedLocal] = useState(false);
  const [lastActionWasAdd, setLastActionWasAdd] = useState(false);

  useEffect(() => {
    const isWished = wishlistItems.some((i) => i.productId === product.id);
    setIsWishedLocal(isWished);
  }, [wishlistItems, product.id]);

  const handleClick = () => {
    if (!session?.user) return;

    const isWished = wishlistItems.some((i) => i.productId === product.id);

    // ✅ Case: product is already wished, and no color/size selected → remove all variants
    if (isWished && !selectedColors?.length && !selectedSizes?.length) {
      setIsWishedLocal(false);
      setLastActionWasAdd(false);
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

    // ✅ If all selected variants already exist → show toast, do nothing
    if (allVariantsAlreadySaved) {
      onFeedback?.("already");
      return;
    }

    // ✅ Add new variants
    setIsWishedLocal(true);
    setLastActionWasAdd(true);
    addToWishlist({
      productId: product.id,
      selectedColors,
      selectedSizes,
    });
    onFeedback?.("success");
  };

  if (!session?.user) return null;

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
