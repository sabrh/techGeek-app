"use client";
import React from "react";
import { useDeleteProductMutation } from "@/redux/slices/productsApi";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function DeleteProductButton({ id }) {
  const [deleteProduct, { isLoading }] = useDeleteProductMutation();
  const token = useSelector((s) => s.auth.token);
  const router = useRouter();

  const handleDelete = async () => {
    if (!confirm("Permanently delete this product?")) return;
    try {
      await deleteProduct({ id, token }).unwrap();
      toast.success("Product deleted");
      router.push("/products");
    } catch (err) {
      toast.error("Delete failed");
    }
  };

  return (
    <button onClick={handleDelete} disabled={isLoading} className="text-red-500 hover:text-red-700">
      Delete
    </button>
  );
}