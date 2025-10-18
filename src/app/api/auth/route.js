import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function POST(req) {
  try {
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json({ message: "Email is required" }, { status: 400 });
    }

    // Sign JWT (valid for 1 day)
    const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: "1d" });

    return NextResponse.json({ token });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: "Failed to login" }, { status: 500 });
  }
}
