import mongoose from "mongoose";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import User from "@/models/User";
import Purchase from "@/models/Purchase";

const connectDB = async () => {
  if (mongoose.connection.readyState >= 1) return;
  await mongoose.connect(process.env.MONGODB_URL);
};

export async function POST(req) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return Response.json({ error: "Not authenticated" }, { status: 401 });
  }

  const { cartItems } = await req.json();
  if (!Array.isArray(cartItems) || cartItems.length === 0) {
    return Response.json({ error: "Cart is empty" }, { status: 400 });
  }

  await connectDB();

  const userDoc = await User.findOne({ email: session.user.email });
  if (!userDoc) {
    return Response.json({ error: "User not found" }, { status: 404 });
  }

  const sanitizedItems = cartItems.map((item) => ({
    productId: item.id,
    title: item.title,
    price: item.price,
    quantity: item.quantity,
    selectedColor: item.selectedColor,
    selectedSize: item.selectedSize,
    selectedStyle: item.selectedStyle || null,
    variantKey: item.variantKey,
    addedAt: new Date(item.addedAt),
  }));

  const purchase = new Purchase({
    user: userDoc._id,
    productsPurchased: sanitizedItems,
  });

  try {
    await purchase.save();
    return Response.json({ status: "Purchase saved" });
  } catch (error) {
    console.error("Insert failed:", error.message);
    return Response.json(
      { error: "Insert failed", details: error.message },
      { status: 500 }
    );
  }
}
