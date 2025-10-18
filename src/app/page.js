import ProductsSection from "./_components/ProductsSection";
import ProtectedRoute from "@/components/ProtectedRoute";

export default function Home() {
  return (
    <div>
      <ProtectedRoute>
        <ProductsSection />
      </ProtectedRoute>
    </div>
  );
}
