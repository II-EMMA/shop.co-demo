"use client";

import Link from "next/link";
import { FaAngleDown } from "react-icons/fa";

export default function MobileDrawer({
  open,
  setOpen,
  toggle,
  drawerRef,
  handleCloseDrawer,
}) {
  return (
    <div
      ref={drawerRef}
      className={`fixed top-0 left-0 h-full w-full max-w-sm bg-white z-[1000] transform transition-transform duration-300 ease-in-out p-6 flex flex-col justify-between
        ${toggle ? "translate-x-0" : "-translate-x-full"} md:hidden`}
    >
      <div className="flex flex-col gap-y-6">
        <nav className="flex flex-col gap-y-4 font-satoshi mt-[60px] ml-20">
          <Link href="/#top-selling" onClick={handleCloseDrawer}>
            On Sale
          </Link>
          <Link href="/#new-arrivals" onClick={handleCloseDrawer}>
            New Arrivals
          </Link>
          <Link href="/#brands" onClick={handleCloseDrawer}>
            Brands
          </Link>

          <div className="flex items-center gap-x-1 relative">
            <Link href="/en/category/casual" onClick={handleCloseDrawer}>
              Shop
            </Link>
            <button
              onClick={() => setOpen(!open)}
              className={`p-1 ${
                open ? "rotate-180" : "rotate-0"
              } rounded-md transition-all duration-300`}
            >
              <FaAngleDown className="cursor-pointer" />
            </button>

            {open && (
              <div className="absolute top-full mt-2 left-0 bg-white shadow-xl rounded-2xl w-28 z-50 transition-all duration-300">
                <ul className="flex flex-col text-sm text-gray-700">
                  <li>
                    <Link
                      href="/en/category/casual"
                      prefetch={true}
                      onClick={handleCloseDrawer}
                      className="block px-4 py-2 hover:bg-gray-100 rounded-t-2xl pointer-events-auto"
                    >
                      Casual
                    </Link>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </nav>
      </div>
    </div>
  );
}
