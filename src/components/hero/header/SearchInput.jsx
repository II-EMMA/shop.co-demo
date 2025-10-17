"use client";

import { CgSearch } from "react-icons/cg";
import Link from "next/link";
import getNearestColorName from "@/lib/wishlist/getNearestColorName";

export default function SearchInput({
  query,
  onSearch,
  results,
  error,
  isSearchActive,
  onClose,
}) {
  return (
    <div className="relative flex-1 max-w-xl md:block hidden">
      <CgSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-black opacity-40 text-xl" />
      <input
        type="text"
        placeholder="Search for products..."
        value={query}
        onChange={(e) => onSearch(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") onSearch(query);
        }}
        className="bg-[#F0F0F0] pl-11 pr-4 py-3 w-full rounded-full focus:outline-none placeholder:text-black placeholder:opacity-40"
      />

      {isSearchActive && (results.length > 0 || error || query.length > 0) && (
        <div className="absolute top-full left-0 mt-4 w-full z-[5000] min-w-[290px]">
          {error && (
            <div className="bg-white rounded-2xl shadow-2xl border border-black/10 p-4 text-center font-satoshi text-sm text-red-500">
              {error}
            </div>
          )}

          {results.length > 0 && (
            <div className="bg-white rounded-2xl shadow-2xl border border-black/10 p-4 max-h-[400px] overflow-y-auto">
              <ul className="flex flex-col gap-y-4">
                {results.map((product) => {
                  const image = product?.image?.src || "/fallback.svg";
                  const title = product?.title || "Unknown Product";
                  const price = product?.price || "$—";
                  const colorName = getNearestColorName(product?.colors?.[0]);

                  return (
                    <li key={product.id}>
                      <Link
                        onClick={onClose}
                        href={`/en/${product.id}`}
                        className="flex gap-x-4 items-center hover:bg-[#F9F9F9] p-2 rounded-xl transition-colors duration-200"
                      >
                        <div className="bg-[#F0F0F0] rounded-[20px] overflow-hidden">
                          <img
                            src={image}
                            alt={title}
                            className="w-[80px] h-[90px] object-cover rounded-[20px]"
                          />
                        </div>
                        <div className="flex flex-col justify-between">
                          <p className="font-satoshi font-bold text-base hover:underline">
                            {title}
                          </p>
                          <p className="text-sm font-satoshi text-black/60">
                            Color: {colorName}
                          </p>
                          <p className="font-satoshi font-bold text-[18px]">
                            {price}
                          </p>
                        </div>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          )}

          {query.length > 0 && results.length === 0 && !error && (
            <div className="bg-white rounded-2xl shadow-2xl border border-black/10 p-4 text-center font-satoshi text-sm text-black/60">
              No results found for “{query}”
            </div>
          )}
        </div>
      )}
    </div>
  );
}
