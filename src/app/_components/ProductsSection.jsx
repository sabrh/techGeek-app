"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";

export default function ProductsSection() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const res = await fetch("/api/products?limit=8");
      const products = await res.json();
      setData(products);
    };
    fetchProducts();
  }, []);

  return (
    <section className='py-12 px-4 md:px-6 lg:px-8 bg-[#EFF1F3]'>
      <div className='max-w-7xl mx-auto'>
        <h3 className='mb-8 text-[#0D1821] font-bold text-2xl'>Featured Products</h3>
        
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6'>
          {data.map((item) => (
            <div 
              className='col-span-1 bg-white p-4 h-full rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 flex flex-col' 
              key={item._id}
            >
              <figure className='w-full aspect-square flex justify-center items-center overflow-hidden rounded-lg'>
                <img 
                  src={item.image} 
                  alt={item.name} 
                  className="w-full h-full object-cover rounded-lg" 
                />
              </figure>
              
              <div className='flex flex-col mt-4'>
                <div>
                  <h2 className='font-semibold text-lg text-[#0D1821] truncate'>{item.name}</h2>
                </div>
                <div className="flex flex-row justify-between">
                  <p className='font-bold text-lg text-[#4E6E5D] mt-1'>$ {item.price}</p>
                  <Link 
                  href={`/product-details/${item._id}`} 
                  className="btn bg-[#4E6E5D] rounded-full text-white  py-2 text-sm font-medium hover:bg-[#3D5A4B] transition-colors"
                >Details
                </Link>
                </div>
                
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-center mt-12">
          <Link
            href="/products"
            className="bg-[#4E6E5D] text-white px-8 py-3 rounded-full font-semibold text-lg hover:bg-[#3D5A4B] transition-colors duration-200 shadow-md"
          >
            See All Products 
          </Link>
        </div>
      </div>
    </section>
  );
}