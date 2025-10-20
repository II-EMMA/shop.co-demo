import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/authOptions";
import connectDB from "@/lib/db/db";
import CartItem from "@/models/CartItem";

export async function GET() {
  await connectDB();
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const items = await CartItem.find({ userId: session.user.id });
    return NextResponse.json({ cartItems: items });
  } catch (err) {
    console.error("Cart load error:", err);
    return NextResponse.json({ error: "Failed to load cart" }, { status: 500 });
  }
}
