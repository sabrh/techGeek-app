"use client";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useCreateProductMutation, useUpdateProductMutation } from "@/redux/slices/productsApi";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const productSchema = z.object({
  name: z.string().min(2, "Name is required"),
  category: z.string().min(2, "Category is required"),
  price: z.number().positive("Price must be > 0"),
  image: z.string().url("Provide a valid image URL"),
  description: z.string().min(5, "Provide a description"),
});

export default function ProductForm({ initialValues = null, mode = "create" }) {
  const router = useRouter();
  const token = useSelector((s) => s.auth.token);
  const [createProduct, { isLoading: creating }] = useCreateProductMutation();
  const [updateProduct, { isLoading: updating }] = useUpdateProductMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: zodResolver(productSchema),
    defaultValues: initialValues || {
      name: "",
      category: "",
      price: undefined,
      image: "",
      description: "",
    },
  });

  useEffect(() => {
    if (initialValues) {
      // set numeric price correctly
      Object.entries(initialValues).forEach(([k, v]) => setValue(k, v));
    }
  }, [initialValues, setValue]);

  const onSubmit = async (values) => {
    try {
      const payload = { ...values, price: Number(values.price) };
      if (mode === "create") {
        await createProduct({ body: payload, token }).unwrap();
        toast.success("Product created");
      } else {
        await updateProduct({ id: initialValues._id, body: payload, token }).unwrap();
        toast.success("Product updated");
      }
      router.push("/products");
    } catch (err) {
      toast.error(err?.data?.message || err.message || "Operation failed");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-2xl mx-auto bg-white p-6 rounded shadow">
      <div className="mb-4">
        <label className="block font-medium">Name</label>
        <input className="mt-1 w-full border rounded px-3 py-2" {...register("name")} />
        {errors.name && <p className="text-sm text-[#A44A3F]">{errors.name.message}</p>}
      </div>

      <div className="mb-4">
        <label className="block font-medium">Category</label>
        <input className="mt-1 w-full border rounded px-3 py-2" {...register("category")} />
        {errors.category && <p className="text-sm text-[#A44A3F]">{errors.category.message}</p>}
      </div>

      <div className="mb-4">
        <label className="block font-medium">Price (USD)</label>
        <input type="number" step="0.01" className="mt-1 w-full border rounded px-3 py-2" {...register("price", { valueAsNumber: true })} />
        {errors.price && <p className="text-sm text-[#A44A3F]">{errors.price.message}</p>}
      </div>

      <div className="mb-4">
        <label className="block font-medium">Image URL</label>
        <input className="mt-1 w-full border rounded px-3 py-2" {...register("image")} />
        {errors.image && <p className="text-sm text-[#A44A3F]">{errors.image.message}</p>}
      </div>

      <div className="mb-4">
        <label className="block font-medium">Description</label>
        <textarea className="mt-1 w-full border rounded px-3 py-2" rows={5} {...register("description")} />
        {errors.description && <p className="text-sm text-[#A44A3F]">{errors.description.message}</p>}
      </div>

      <div className="flex items-center gap-4">
        <button type="submit" disabled={creating || updating} className="bg-[#4E6E5D] text-white px-4 py-2 rounded">
          {mode === "create" ? (creating ? "Creating..." : "Create Product") : (updating ? "Updating..." : "Update Product")}
        </button>
      </div>
    </form>
  );
}