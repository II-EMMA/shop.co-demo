import { NextResponse } from "next/server";
import connectDB from "@/lib/db/db";
import WishlistItem from "@/models/Wishlist";
import User from "@/models/User";

export async function GET(_, context) {
  await connectDB();
  const { userId } = await context.params;

  if (!userId) {
    return NextResponse.json({ error: "Missing userId" }, { status: 400 });
  }

  try {
    const items = await WishlistItem.find({ userId });
    const user = await User.findById(userId).select("name");

    return NextResponse.json({
      items,
      userName: user?.name || "Unknown User",
    });
  } catch (err) {
    console.error("Wishlist fetch error:", err);
    return NextResponse.json(
      { error: "Failed to fetch wishlist" },
      { status: 500 }
    );
  }
}
