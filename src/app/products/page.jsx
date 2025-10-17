"use client";
import React, { useEffect, useState } from "react";
import { FaEye, FaEdit, FaTrash } from "react-icons/fa";
import Image from "next/image";
import Link from "next/link";

export default function ProductsPage() {
  const [data, setData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    const fetchData = async () => {
      try {
        // ✅ Correct API route call
        const res = await fetch("/api/products");
        if (!res.ok) throw new Error("Failed to fetch data");
        const json = await res.json();
        setData(json);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchData();
  }, []);

  // Filter products by search
  const filteredData = data.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="container mx-auto my-10 px-4">
      <h3 className="mb-6 text-center font-bold text-2xl">All Products</h3>

      {/* Search Field */}
      <div className="flex justify-end mb-4">
        <input
          type="text"
          placeholder="Search products..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="border border-gray-300 rounded-md px-4 py-2 w-64 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Product List (Horizontal Rows) */}
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
              <Image
                src={item.image}
                alt={item.name}
                width={80}
                height={80}
                className="object-contain rounded-md"
              />
            </div>
            <div className="col-span-3 font-medium">{item.name}</div>
            <div className="col-span-3 text-gray-600">{item.category}</div>
            <div className="col-span-2 font-semibold">${item.price}</div>
            <div className="col-span-2 flex justify-center gap-4 text-lg">
              <Link href={`/product-details/${item._id}`}>
                <FaEye className="text-blue-500 cursor-pointer hover:text-blue-700" />
              </Link>
              <Link href={`/update-product/${item._id}`}>
                <FaEdit className="text-green-500 cursor-pointer hover:text-green-700" />
              </Link>
              <FaTrash className="text-red-500 cursor-pointer hover:text-red-700" />
            </div>
          </div>
        ))}
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-center items-center mt-6 space-x-2">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => handlePageChange(index + 1)}
            className={`px-4 py-2 rounded-md border ${
              currentPage === index + 1
                ? "bg-blue-500 text-white"
                : "bg-white hover:bg-gray-100"
            }`}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
}