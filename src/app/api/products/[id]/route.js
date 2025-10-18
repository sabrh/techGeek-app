import dbConnect, { collectionNamesObj } from "@/lib/dbConnect";
import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";

export async function GET(req, { params }) {
  try {
    const { id } = params;
    const productCollection = dbConnect(collectionNamesObj.productCollection);
    const doc = await productCollection.findOne({ _id: new ObjectId(id) });
    if (!doc) return NextResponse.json({ message: "Not found" }, { status: 404 });
    return NextResponse.json(doc);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: "Failed to fetch" }, { status: 500 });
  }
}

export async function PUT(req, { params }) {
  try {
    const { id } = params;
    const body = await req.json();
    const productCollection = dbConnect(collectionNamesObj.productCollection);
    await productCollection.updateOne({ _id: new ObjectId(id) }, { $set: body });
    const updated = await productCollection.findOne({ _id: new ObjectId(id) });
    return NextResponse.json(updated);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: "Failed to update" }, { status: 500 });
  }
}

export async function DELETE(req, { params }) {
  try {
    const { id } = params;
    const productCollection = dbConnect(collectionNamesObj.productCollection);
    await productCollection.deleteOne({ _id: new ObjectId(id) });
    return NextResponse.json({ message: "Deleted" });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: "Failed to delete" }, { status: 500 });
  }
}