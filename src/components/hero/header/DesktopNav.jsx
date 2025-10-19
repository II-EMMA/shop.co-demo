"use client";

import Link from "next/link";
import { useRef } from "react";
import { FaAngleDown } from "react-icons/fa";

export default function DesktopNav({ open, setOpen, menuRef }) {
  return (
    <nav className="md:flex hidden items-center gap-x-3 opacity-95 font-satoshi relative">
      <div
        className="flex items-center gap-x-1 relative"
        ref={menuRef}
        data-menu="shop"
      >
        <Link href="/en/category/casual">Shop</Link>
        <button
          type="button"
          onClick={() => setOpen(!open)}
          className={`p-1 rounded-md transition-all duration-300 outline-none ${
            open ? "rotate-180" : "rotate-0"
          }`}
        >
          <FaAngleDown className="cursor-pointer" />
        </button>

        {/* Keep dropdown mounted; toggle visibility */}
        <div
          className={`absolute top-full mt-2 left-0 w-28 z-[9999] bg-white shadow-xl rounded-2xl transition-all duration-150
            ${
              open
                ? "opacity-100 translate-y-0 pointer-events-auto"
                : "opacity-0 -translate-y-1 pointer-events-none"
            }
          `}
          onMouseDown={(e) => e.stopPropagation()} // block global mousedown
          onClick={(e) => e.stopPropagation()}
        >
          <ul className="flex flex-col text-sm text-gray-700">
            <li>
              <Link
                href="/en/category/casual"
                prefetch={true}
                className="block px-4 py-2 hover:bg-gray-100 rounded-t-2xl"
              >
                Casual
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <Link href="/#top-selling">On Sale</Link>
      <Link href="/#new-arrivals">New Arrivals</Link>
      <Link href="/#brands">Brands</Link>
    </nav>
  );
}
