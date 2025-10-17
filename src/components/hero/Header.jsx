"use client";

import { useState, useEffect, useRef } from "react";
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

  const debounceTimer = useRef(null);
  const desktopSearchRef = useRef(null);
  const mobileSearchRef = useRef(null);

  useEffect(() => {
    if (showSearch && mobileSearchRef.current) {
      gsap.fromTo(
        mobileSearchRef.current,
        { opacity: 0, y: -20, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, duration: 0.4, ease: "power3.out" }
      );
    }
  }, [showSearch]);

  useEffect(() => {
    setShowSearch(false);
    setOpen(false);
  }, [toggle]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        desktopSearchRef.current &&
        !desktopSearchRef.current.contains(e.target)
      ) {
        setIsSearchActive(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        mobileSearchRef.current &&
        !mobileSearchRef.current.contains(e.target)
      ) {
        setShowSearch(false);
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

  return (
    <header className="fixed top-0 left-0 w-full bg-white md:shadow-none border-b border-black/10 z-[9999]">
      <div className="max-w-[1500px] mx-auto flex justify-between gap-x-4 items-center pr-11 pl-2 md:py-6 py-2 relative">
        <Logo toggle={toggle} setToggle={setToggle} />
        <DesktopNav open={open} setOpen={setOpen} />

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

        <div className="flex flex-row md:gap-x-2 gap-x-4 text-2xl items-center">
          <button
            onClick={() => setShowSearch((prev) => !prev)}
            className="md:hidden block"
          >
            <CgSearch />
          </button>
          <CartIconButton />
          <AuthIconButton />
          <WishlistIconButton />
        </div>

        {showSearch && (
          <div ref={mobileSearchRef}>
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
      </div>

      <MobileDrawer open={open} setOpen={setOpen} toggle={toggle} />
    </header>
  );
}
