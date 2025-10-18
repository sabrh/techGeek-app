import dbConnect, { collectionNamesObj } from "@/lib/dbConnect";
import ProductForm from "@/components/ProductForm";
import { ObjectId } from "mongodb";

export default async function EditProductPage({ params }) {
  const productCollection = dbConnect(collectionNamesObj.productCollection);
  const data = await productCollection.findOne({ _id: new ObjectId(params.id) });
  if (!data) {
    return <div>Product not found</div>;
  }
  // Pass initialValues to client form
  return (
    <div className="py-8">
      <h1 className="text-2xl font-bold mb-6 text-center">Edit Product</h1>
      {/* mount client component with initialValues */}
      <ProductForm initialValues={JSON.parse(JSON.stringify(data))} mode="edit" />
    </div>
  );
}