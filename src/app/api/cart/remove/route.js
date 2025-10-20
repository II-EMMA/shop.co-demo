import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/authOptions";
import connectDB from "@/lib/db/db";
import CartItem from "@/models/CartItem";

export async function POST(req) {
  await connectDB();
  const session = await getServerSession(authOptions);
  const body = await req.json();

  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { variantKey } = body;

    if (!variantKey || typeof variantKey !== "string") {
      return NextResponse.json(
        { error: "Missing or invalid variantKey" },
        { status: 400 }
      );
    }

    const result = await CartItem.deleteOne({
      userId: session.user.id,
      variantKey,
    });

    if (result.deletedCount === 0) {
      return NextResponse.json(
        { error: "Item not found or already deleted" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Cart item delete error:", err);
    return NextResponse.json(
      { error: "Failed to delete item" },
      { status: 500 }
    );
  }
}
