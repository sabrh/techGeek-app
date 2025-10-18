"use client";
import { useSelector } from "react-redux";
import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function ProtectedRoute({ children }) {
  const router = useRouter();
  const pathname = usePathname();
  const token = useSelector((state) => state.auth.token);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const localToken = typeof window !== "undefined" ? localStorage.getItem("token") : null;

    // If no token and not on signin page, redirect
    if (!localToken && pathname !== "/signin") {
      router.replace("/signin");
    }

    // Done checking
    setIsLoading(false);
  }, [pathname, router, token]);

  if (isLoading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  return <>{children}</>;
}