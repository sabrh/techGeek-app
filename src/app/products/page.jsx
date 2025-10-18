"use client";
import React, { useEffect, useMemo, useState } from "react";
import { useGetProductsQuery, useDeleteProductMutation } from "@/redux/slices/productsApi";
import { FaEye, FaEdit, FaTrash } from "react-icons/fa";
import Image from "next/image";
import Link from "next/link";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";

export default function ProductsPage() {
  const { data = [], isLoading, isError } = useGetProductsQuery();
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const token = useSelector((s) => s.auth.token);
  const [products, setProducts] = useState([]);
  const [deleteProduct] = useDeleteProductMutation();


  const filtered = useMemo(
    () =>
      data.filter((it) =>
        it.name?.toLowerCase().includes(searchQuery.toLowerCase())
      ),
    [data, searchQuery]
  );

  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const currentItems = filtered.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handleDelete = async (id) => {
    if (!confirm("Delete this product?")) return;
    try {
      await deleteProduct({ id, token }).unwrap();
      toast.success("Deleted");
      // RTK Query invalidation will refresh the list
    } catch (err) {
      toast.error("Delete failed");
    }
  };

  if (isLoading) return <p className="p-6 text-center">Loading...</p>;
  if (isError) return <p className="p-6 text-center">Failed to load products.</p>;

  return (
    <div className="container mx-auto my-10 px-4">
      <h3 className="mb-6 text-center font-bold text-2xl">All Products</h3>

      <div className="flex justify-end mb-4">
        <input
          className="border rounded px-3 py-2 w-64"
          placeholder="Search products..."
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            setCurrentPage(1);
          }}
        />
      </div>

      <div className="border rounded-lg overflow-hidden">
        <div className="grid grid-cols-12 bg-gray-100 font-semibold py-3 px-4 text-sm">
          <div className="col-span-2">Image</div>
          <div className="col-span-3">Name</div>
          <div className="col-span-3">Category</div>
          <div className="col-span-2">Price</div>
          <div className="col-span-2 text-center">Actions</div>
        </div>

        {currentItems.map((item) => (
          <div
            key={item._id}
            className="grid grid-cols-12 items-center border-t py-3 px-4 hover:bg-gray-50 transition-all duration-150"
          >
            <div className="col-span-2">
              <img src={item.image} alt={item.name} className="w-20 h-20 object-contain rounded-md" />
              {/*<Image src={item.image} alt={item.name} width={80} height={80} className="object-contain rounded-md" />*/}
            </div>
            <div className="col-span-3 font-medium">{item.name}</div>
            <div className="col-span-3 text-gray-600">{item.category}</div>
            <div className="col-span-2 font-semibold">${item.price}</div>
            <div className="col-span-2 flex justify-center gap-4 text-lg">
              <Link href={`/product-details/${item._id}`}>
                <FaEye className="text-blue-500 cursor-pointer hover:text-blue-700" />
              </Link>
              <Link href={`/products/${item._id}/edit`}>
                <FaEdit className="text-green-500 cursor-pointer hover:text-green-700" />
              </Link>
              <button onClick={() => handleDelete(item._id)}>
                <FaTrash className="text-red-500 cursor-pointer hover:text-red-700" />
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-center items-center mt-6 space-x-2">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => setCurrentPage(index + 1)}
            className={`px-4 py-2 rounded-md border ${currentPage === index + 1 ? "bg-[#0D1821] text-white" : "bg-white hover:bg-gray-100"}`}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
}