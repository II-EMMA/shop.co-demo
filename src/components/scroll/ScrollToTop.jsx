"use client";

import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";

export default function ScrollToTop() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    const scrollToTop = () => {
      const hasHash = window.location.hash.length > 0;
      if (!hasHash) {
        // Try scroll after paint
        requestAnimationFrame(() => {
          window.scrollTo({ top: 0, behavior: "smooth" });
        });

        // Fallback for mobile layout delay
        setTimeout(() => {
          window.scrollTo({ top: 0, behavior: "smooth" });
        }, 100);
      }
    };

    scrollToTop();

    window.addEventListener("hashchange", scrollToTop);
    window.addEventListener("popstate", scrollToTop);

    return () => {
      window.removeEventListener("hashchange", scrollToTop);
      window.removeEventListener("popstate", scrollToTop);
    };
  }, [pathname, searchParams]);

  return null;
}
