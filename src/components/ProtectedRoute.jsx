"use client";

import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function ProtectedRoute({ children }) {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const router = useRouter();

  useEffect(() => {
    if (!isLoggedIn) router.push("/signin");
  }, [isLoggedIn]);

  if (!isLoggedIn) return null;
  return children;
}
