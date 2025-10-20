"use client";

import { useSession, signIn, signOut } from "next-auth/react";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { CgProfile } from "react-icons/cg";

export default function AuthIconButton() {
  const { data: session, status } = useSession();
  const buttonRef = useRef(null);
  const [tooltip, setTooltip] = useState("Sign in");

  useEffect(() => {
    if (!buttonRef.current) return;

    const color =
      status === "authenticated"
        ? "#22c55e" // green
        : status === "unauthenticated"
        ? "#ef4444" // red
        : "#000000"; // black

    const scale = status === "authenticated" ? 1.1 : 1;

    gsap.to(buttonRef.current, {
      color,
      scale,
      duration: 0.4,
      ease: "power2.out",
    });

    setTooltip(
      status === "authenticated"
        ? `Signed in as ${session?.user?.name || "user"}`
        : status === "unauthenticated"
        ? "Signed out"
        : "Sign in"
    );
  }, [status, session]);

  const handleClick = async () => {
    if (status === "authenticated") {
      signOut({ callbackUrl: "/" });
    } else {
      await signIn("google", { callbackUrl: "/" });
      // Wait briefly then sync user
      setTimeout(() => {
        fetch("/api/users", { method: "POST" });
      }, 1000);
    }
  };

  return (
    <button
      onClick={handleClick}
      className="cursor-pointer relative group"
      ref={buttonRef}
    >
      <CgProfile className="sm:w-auto sm:h-auto w-5 h-5" />
      <span className="font-satoshi font-medium absolute top-6 left-1/2 -translate-x-1/2 bg-white border border-black/10 text-black lg:text-xs text-[10px] px-2 py-1 rounded-xl shadow-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
        {tooltip}
      </span>
    </button>
  );
}
