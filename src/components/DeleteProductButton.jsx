"use client";
import React from "react";
import { useDeleteProductMutation } from "@/redux/slices/productsApi";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { FaTrash } from "react-icons/fa";

export default function DeleteProductButton({ id }) {
  const [deleteProduct, { isLoading }] = useDeleteProductMutation();
  const token = useSelector((s) => s.auth.token);
  const router = useRouter();

  const handleDelete = async () => {
    if (!confirm("Permanently Delete this Product?")) return;
    try {
      await deleteProduct({ id, token }).unwrap();
      toast.success("Product Deleted");
      router.push("/products");
    } catch (err) {
      toast.error("Delete Failed");
    }
  };

  return (
    <button onClick={handleDelete} disabled={isLoading} className="text-[#A44A3F] hover:text-[#A44A3F]">
      <FaTrash size={22} className="text-[#A44A3F] cursor-pointer hover:text-[#A44A3F]" />
    </button>
  );
}