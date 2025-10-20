import mongoose from "mongoose";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/authOptions";
import Wishlist from "@/models/Wishlist";

const connectDB = async () => {
  if (mongoose.connection.readyState >= 1) return;
  await mongoose.connect(process.env.MONGODB_URL);
};

export async function POST(req) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id)
    return Response.json({ error: "Unauthorized" }, { status: 401 });

  await connectDB();
  const { productId, selectedColor, selectedSize } = await req.json();

  if (!productId || !selectedColor || !selectedSize) {
    return Response.json({ error: "Missing variant data" }, { status: 400 });
  }

  const variantKey = `${productId}-${selectedColor}-${selectedSize}`;

  const exists = await Wishlist.findOne({
    userId: session.user.id,
    variantKey,
  });

  if (exists) {
    return Response.json({ status: "Already in wishlist" });
  }

  await Wishlist.create({
    userId: session.user.id,
    productId,
    selectedColor,
    selectedSize,
    variantKey,
  });

  return Response.json({ status: "Added to wishlist" });
}

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id)
    return Response.json({ error: "Unauthorized" }, { status: 401 });

  await connectDB();
  const items = await Wishlist.find({ userId: session.user.id });

  return Response.json({ items: items || [] });
}

export async function DELETE(req) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id)
    return Response.json({ error: "Unauthorized" }, { status: 401 });

  await connectDB();
  const { variantKey } = await req.json();

  if (!variantKey) {
    return Response.json({ error: "Missing variantKey" }, { status: 400 });
  }

  const result = await Wishlist.deleteOne({
    userId: session.user.id,
    variantKey,
  });

  return Response.json({
    status: "Deleted",
    deletedCount: result.deletedCount,
  });
}
