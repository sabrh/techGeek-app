"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa";

export default function ProductsSection() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const res = await fetch("/api/products?limit=6");
      const products = await res.json();
      setData(products);
    };
    fetchProducts();
  }, []);

  return (
    <section className='my-10'>
      <h3 className='mb-5 text-center font-bold text-xl'>Our Products</h3>
      <div className='grid grid-cols-12 gap-4 container mx-auto'>
        {data.map((item) => (
          <div className='col-span-12 md:col-span-6 lg:col-span-4 p-4 h-full border rounded-lg' key={item._id}>
            <figure className='w-full h-3/4 flex justify-center items-center'>
              <img src={item.image} alt={item.name} className="w-full h-full object-fill rounded-md" />
            </figure>
            <div className='flex justify-between items-center mt-4'>
              <div>
                <h2 className='font-bold text-lg'>{item.name}</h2>
                <p className='font-bold text-lg'>$ {item.price}</p>
              </div>
              <div>
                <Link href={`/product-details/${item._id}`}>Details</Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-center mt-8">
        <Link
          href="/products"
          className="bg-blue-600 text-white px-6 py-2 rounded-md font-medium hover:bg-blue-700 transition-colors duration-200"
        >
          See All Products <FaArrowRight />
        </Link>
      </div>
    </section>
  );
}