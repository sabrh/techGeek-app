import React from "react";
import ProductForm from "@/components/ProductForm";

export default function NewProductPage() {
  return (
    <div className="py-8">
      <h1 className="text-2xl font-bold mb-6 text-center">Create Product</h1>
      <ProductForm mode="create" />
    </div>
  );
}