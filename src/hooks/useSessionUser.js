// hooks/useSessionUser.js
"use client";
import { useSession } from "next-auth/react";

export default function useSessionUser() {
  const { data } = useSession();
  return data?.user || null;
}
