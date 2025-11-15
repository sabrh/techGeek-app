import dbConnect, { collectionNamesObj } from "@/lib/dbConnect";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const limit = parseInt(searchParams.get("limit")) || 0;

    const productCollection = dbConnect(collectionNamesObj.productCollection);

    const products = await productCollection
      .find({})
      .limit(limit)
      .toArray();

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
    const productCollection = dbConnect(collectionNamesObj.productCollection);
    const res = await productCollection.insertOne({ ...body, createdAt: new Date() });
    const created = await productCollection.findOne({ _id: res.insertedId });
    return NextResponse.json(created, { status: 201 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: "Failed to create" }, { status: 500 });
  }
}