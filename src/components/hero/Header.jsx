"use client";

import { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Logo from "./header/Logo";
import DesktopNav from "./header/DesktopNav";
import MobileDrawer from "./header/MobileDrawer";
import SearchInput from "./header/SearchInput";
import SearchPopout from "./header/SearchPopout";
import CartIconButton from "./header/CartIconButton";
import WishlistIconButton from "./header/WishlistIconButton";
import AuthIconButton from "./header/AuthButton";
import { CgSearch } from "react-icons/cg";
import gsap from "gsap";
import filterProducts from "@/lib/search/filterProducts";

export default function Header() {
  const [open, setOpen] = useState(false);
  const [toggle, setToggle] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [error, setError] = useState(null);

  const pathname = usePathname();
  const drawerRef = useRef(null);
  const debounceTimer = useRef(null);
  const desktopSearchRef = useRef(null);
  const mobileSearchRef = useRef(null);
  const desktopMenuRef = useRef(null); // ✅ new ref for desktop dropdown

  // ✅ Animate mobile search popout
  useEffect(() => {
    if (showSearch && mobileSearchRef.current) {
      requestAnimationFrame(() => {
        gsap.fromTo(
          mobileSearchRef.current,
          { opacity: 0, y: -20, scale: 0.95 },
          { opacity: 1, y: 0, scale: 1, duration: 0.4, ease: "power3.out" }
        );
      });
    }
  }, [showSearch]);

  // ✅ Close drawer/search on any route or hash change
  useEffect(() => {
    const closeDrawerOnRouteChange = () => {
      setToggle(false);
      setOpen(false);
      setShowSearch(false);
    };

    window.addEventListener("hashchange", closeDrawerOnRouteChange);
    window.addEventListener("popstate", closeDrawerOnRouteChange);

    return () => {
      window.removeEventListener("hashchange", closeDrawerOnRouteChange);
      window.removeEventListener("popstate", closeDrawerOnRouteChange);
    };
  }, []);

  useEffect(() => {
    setToggle(false);
    setOpen(false);
    setShowSearch(false);
  }, [pathname]);

  // ✅ Outside click detection
  useEffect(() => {
    const handleClickOutside = (e) => {
      // ignore clicks inside desktop dropdown
      if (desktopMenuRef.current && desktopMenuRef.current.contains(e.target)) {
        return;
      }

      if (
        desktopSearchRef.current &&
        !desktopSearchRef.current.contains(e.target)
      ) {
        setIsSearchActive(false);
      }

      if (
        mobileSearchRef.current &&
        !mobileSearchRef.current.contains(e.target)
      ) {
        setShowSearch(false);
      }

      if (drawerRef.current && !drawerRef.current.contains(e.target)) {
        setToggle(false);
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearch = (value) => {
    setQuery(value);
    setError(null);
    setIsSearchActive(true);

    clearTimeout(debounceTimer.current);
    debounceTimer.current = setTimeout(() => {
      runSearch(value);
    }, 200);
  };

  const runSearch = (value) => {
    if (!value.trim()) {
      setResults([]);
      setIsSearchActive(false);
      return;
    }

    try {
      const filtered = filterProducts(value);
      setResults(filtered);
      setIsSearchActive(!!filtered.length);
    } catch (err) {
      console.error("Search error:", err);
      setError("Something went wrong while searching.");
      setResults([]);
    }
  };

  const handleCloseSearch = () => {
    setShowSearch(false);
    setIsSearchActive(false);
  };

  const handleCloseDrawer = () => {
    setToggle(false);
    setOpen(false);
    setShowSearch(false);
  };

  return (
    <header className="fixed top-0 left-0 w-full bg-white md:shadow-none border-b border-black/10 z-[9999]">
      <div className="max-w-[1500px] mx-auto flex justify-between gap-x-4 items-center md:pr-11 pr-4.5 pl-2 md:py-6 py-2 relative">
        <Logo toggle={toggle} setToggle={setToggle} />
        {/* ✅ pass desktopMenuRef down */}
        <DesktopNav open={open} setOpen={setOpen} menuRef={desktopMenuRef} />

        {/* Desktop search */}
        <div
          ref={desktopSearchRef}
          className="relative flex-1 max-w-xl md:block hidden"
        >
          <SearchInput
            query={query}
            onSearch={handleSearch}
            results={results}
            error={error}
            isSearchActive={isSearchActive}
            onClose={handleCloseSearch}
          />
        </div>

        {/* Icons */}
        <div className="flex flex-row md:gap-x-2 gap-x-1 text-2xl items-center">
          <button
            onClick={() => setShowSearch((prev) => !prev)}
            className="md:hidden block"
          >
            <CgSearch className="sm:w-auto sm:h-auto w-5 h-5" />
          </button>
          <CartIconButton />
          <AuthIconButton />
          <WishlistIconButton />
        </div>
      </div>

      {/* Mobile search popout */}
      {showSearch && (
        <div className="relative w-full" ref={mobileSearchRef}>
          <SearchPopout
            toggle={toggle}
            query={query}
            onSearch={handleSearch}
            results={results}
            onClose={handleCloseSearch}
            error={error}
          />
        </div>
      )}

      <MobileDrawer
        open={open}
        setOpen={setOpen}
        toggle={toggle}
        drawerRef={drawerRef}
        handleCloseDrawer={handleCloseDrawer}
      />
    </header>
  );
}
