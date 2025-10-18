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
        <FaEdit size={30} className="text-green-500 cursor-pointer hover:text-green-700" />
      </Link>
      <DeleteProductButton id={productId} />
    </div>
  );
}