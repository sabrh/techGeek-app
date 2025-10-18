import dbConnect, { collectionNamesObj } from "@/lib/dbConnect";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const productCollection = dbConnect(collectionNamesObj.productCollection);
    const products = await productCollection.find({}).toArray();
    return NextResponse.json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    return NextResponse.json(
      { message: "Failed to fetch products" },
      { status: 500 }
    );
  }
}

export async function POST(req) {
  try {
    const body = await req.json();
    // Optional: Validate body server-side (you can add schema)
    const productCollection = dbConnect(collectionNamesObj.productCollection);
    const res = await productCollection.insertOne({ ...body, createdAt: new Date() });
    const created = await productCollection.findOne({ _id: res.insertedId });
    return NextResponse.json(created, { status: 201 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: "Failed to create" }, { status: 500 });
  }
}