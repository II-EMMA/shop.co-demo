"use client";

import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";

export default function ScrollToTop() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    const handleScrollReset = () => {
      const hasHash = window.location.hash.length > 0;

      // ✅ Only scroll to top if there's no hash target
      if (!hasHash) {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    };

    // ✅ Trigger on route change, query change, or hash change
    handleScrollReset();

    // ✅ Listen to browser back/forward and manual hash updates
    window.addEventListener("hashchange", handleScrollReset);
    window.addEventListener("popstate", handleScrollReset);

    return () => {
      window.removeEventListener("hashchange", handleScrollReset);
      window.removeEventListener("popstate", handleScrollReset);
    };
  }, [pathname, searchParams]);

  return null;
}
