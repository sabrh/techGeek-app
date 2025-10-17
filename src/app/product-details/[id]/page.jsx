import dbConnect, { collectionNamesObj } from '@/lib/dbConnect';
import { ObjectId } from 'mongodb';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';

export default async function ProductDetailsPage({ params }) {
  const p = await params;
  const productCollection = dbConnect(collectionNamesObj.productCollection);
  const data = await productCollection.findOne({ _id: new ObjectId(p.id) });

  return (
    <div className="w-full min-h-screen bg-[#EFF1F3]">
      {/* Banner Section */}
      <div className="relative w-full h-[200px] sm:h-[250px] md:h-[300px] lg:h-[350px]">
        <Image
          src="/assets/images/banner/banner.png"
          alt="banner"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/40 flex items-center justify-start px-4 sm:px-10">
          <h2 className="text-white font-bold text-lg sm:text-2xl md:text-3xl">
            Product Details
          </h2>
        </div>
      </div>

      {/* Product Info Section */}
      <div className="flex flex-col lg:flex-row items-center lg:items-start justify-center gap-10 max-w-5xl mx-auto my-10 px-4">
        {/* Product Image */}
        <div className="w-full sm:w-2/3 md:w-1/2 lg:w-1/3 flex justify-center">
          <Image
            src={data.image}
            alt={data.name}
            width={400}
            height={300}
            className="rounded-lg object-contain w-full h-auto"
          />
        </div>

        {/* Product Text Details */}
        <div className="w-full lg:w-2/3 bg-white rounded-xl shadow-sm p-6">
          <h2 className="font-bold text-2xl text-[#0D1821] mb-4">{data.name}</h2>

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-4">
            <p className="text-gray-700 text-sm sm:text-base">
              <span className="font-semibold">Category:</span> {data.category}
            </p>
            <p className="text-gray-700 text-sm sm:text-base">
              <span className="font-semibold">Price:</span> ${data.price}
            </p>
          </div>

          <p className="text-gray-700 leading-relaxed text-sm sm:text-base mb-6">
            {data.description}
          </p>

          {/* Action Buttons */}
          <div className="flex gap-6">
            <Link href={`/update-product/${data._id}`}>
              <FaEdit
                size={28}
                className="text-green-500 cursor-pointer hover:text-green-700 transition-colors"
              />
            </Link>
            <FaTrash
              size={28}
              className="text-red-500 cursor-pointer hover:text-red-700 transition-colors"
            />
          </div>
        </div>
      </div>
    </div>
  );
}