"use client";

import ReduxProviderWrapper from "@/components/ReduxProviderWrapper";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProtectedRoute from "@/components/ProtectedRoute";

export default function ClientLayout({ children }) {
  return (
    <ReduxProviderWrapper>
      <ProtectedRoute>
        <Navbar />
        <div className="max-w-8xl">{children}</div>
        <Footer />
      </ProtectedRoute>
    </ReduxProviderWrapper>
  );
}