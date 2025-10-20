"use client";

import ProductColor from "./ProductColor";
import ProductSize from "./ProductSize";
import ProductCount from "./ProductCount";
import ProductRate from "./ProductRate";
import ProductPrice from "./ProductPrice";
import ProductWishlist from "./ProductWishlist";
import { useState } from "react";
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";

export default function ProductCard({ product }) {
  const [selectedColors, setSelectedColors] = useState([]);
  const [selectedSizes, setSelectedSizes] = useState([]);
  const { data: session } = useSession();

  // const handleWishlistFeedback = (type) => {
  //   if (type === "warn") {
  //     toast.error("Please select both color and size");
  //   } else if (type === "success") {
  //     toast.success("Added to wishlist");
  //   }
  // };

  return (
    <div className="flex flex-col gap-y-0.5">
      <h3 className="font-black font-integral -tracking-[0.07em] text-[40px] uppercase">
        {product.title}
      </h3>

      <ProductRate rating={product.rating} />
      <ProductPrice
        price={product.price}
        discountPrice={product.discountPrice}
      />

      <p
        className={`font-satoshi text-base font-normal text-black/60 max-w-[590px] ${
          !product.description ? "hidden" : ""
        }`}
      >
        {product.description}
      </p>

      <span className="inline-block w-full h-px bg-black/10 my-4" />
      <ProductColor colors={product.colors} onSelect={setSelectedColors} />
      <span className="inline-block w-full h-px bg-black/10 my-4" />
      <ProductSize sizes={product.sizes} onSelect={setSelectedSizes} />
      <span className="inline-block w-full h-px bg-black/10 my-4" />

      {session?.user && (
        <>
          <ProductWishlist
            product={product}
            selectedColors={selectedColors}
            selectedSizes={selectedSizes}
            onFeedback={(type) => {
              if (type === "warn")
                toast.error("Please select both color and size");
              if (type === "success") toast.success("Added to wishlist");
              if (type === "already")
                toast("This product is already in your wishlist");
              if (type === "removed")
                toast.success("Product has been removed from wishlist");
            }}
          />

          <span className="inline-block w-full h-px bg-black/10 my-4" />
        </>
      )}

      <ProductCount
        product={product}
        selectedColors={selectedColors}
        selectedSizes={selectedSizes}
      />
    </div>
  );
}
