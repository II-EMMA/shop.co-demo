"use client";

import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";

export default function scrollToTop() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    const hash = window.location.hash;

    if (hash) {
      // Wait a tick so the DOM is ready
      requestAnimationFrame(() => {
        const el = document.querySelector(hash);
        if (el) {
          el.scrollIntoView({ behavior: "smooth" });
        }
      });
    } else {
      // No hash → scroll to top
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [pathname, searchParams]);

  return null;
}
