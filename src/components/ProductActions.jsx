"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { FaEdit } from "react-icons/fa";

const DeleteProductButton = dynamic(
  () => import("@/components/DeleteProductButton"),
  { ssr: false }
);

export default function ProductActions({ productId }) {
  return (
    <div className="flex flex-row gap-5 mt-4">
      <Link href={`/update-product/${productId}`}>
        <FaEdit size={25} className="text-[#4E6E5D] cursor-pointer hover:text-[#4E6E5D]" />
      </Link>
      <DeleteProductButton id={productId} />
    </div>
  );
}