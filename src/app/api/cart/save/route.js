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
    const { cartItems } = body;

    if (!Array.isArray(cartItems)) {
      return NextResponse.json({ error: "Invalid cart data" }, { status: 400 });
    }

    // Clear existing cart for this user
    await CartItem.deleteMany({ userId: session.user.id });

    // Sanitize and prepare items
    const itemsToInsert = cartItems.map((item) => {
      const numericPrice =
        typeof item.price === "string"
          ? Number(item.price.replace(/[^0-9.]/g, ""))
          : item.price;

      return {
        userId: session.user.id,
        productId: item.productId || item.id || "unknown", // fallback
        selectedColor: item.selectedColor || "unknown",
        selectedSize: item.selectedSize || "unknown",
        selectedStyle: item.selectedStyle || null,
        quantity: Math.max(1, item.quantity || 1),
        price: numericPrice || 0,
        variantKey:
          item.variantKey ||
          `${item.id}-${item.selectedColor}-${item.selectedSize}`,
        addedAt: item.addedAt || Date.now(),
      };
    });

    await CartItem.insertMany(itemsToInsert);

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Cart save error:", err);
    return NextResponse.json({ error: "Failed to save cart" }, { status: 500 });
  }
}
