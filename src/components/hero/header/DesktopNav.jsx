"use client";

import Link from "next/link";
import { FaAngleDown } from "react-icons/fa";

export default function DesktopNav({ open, setOpen }) {
  return (
    <nav className="flex-row lg:gap-x-5 gap-x-3 items-center opacity-95 font-satoshi relative md:flex hidden">
      <div className="flex items-center gap-x-1 relative">
        <Link href="/">Shop</Link>
        <button
          onClick={() => setOpen(!open)}
          className={`p-1 rounded-md transition-all duration-300 outline-none ${
            open ? "rotate-180" : "rotate-0"
          }`}
        >
          <FaAngleDown className="cursor-pointer" />
        </button>
        {open && (
          <div className="absolute top-full mt-2 left-0 bg-white shadow-xl rounded-2xl w-28">
            <ul className="flex flex-col text-sm text-gray-700 relative z-[9999]">
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
        )}
      </div>
      <Link href="/#top-selling">On Sale</Link>
      <Link href="/#new-arrivals">New Arrivals</Link>
      <Link href="/#brands">Brands</Link>
    </nav>
  );
}
