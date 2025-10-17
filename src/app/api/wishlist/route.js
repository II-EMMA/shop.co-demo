import mongoose from "mongoose";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import Wishlist from "@/models/Wishlist";
import User from "@/models/User";

const connectDB = async () => {
  if (mongoose.connection.readyState >= 1) return;
  await mongoose.connect(process.env.MONGODB_URL);
};

export async function POST(req) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email)
    return Response.json({ error: "Unauthorized" }, { status: 401 });

  await connectDB();
  const userDoc = await User.findOne({ email: session.user.email });
  const { productId, selectedColor, selectedSize } = await req.json();

  if (!productId || !selectedColor || !selectedSize) {
    return Response.json({ error: "Missing variant data" }, { status: 400 });
  }

  const variantKey = `${productId}-${selectedColor}-${selectedSize}`;

  const exists = await Wishlist.findOne({
    user: userDoc._id,
    variantKey,
  });

  if (exists) return Response.json({ status: "Already in wishlist" });

  await Wishlist.create({
    user: userDoc._id,
    productId,
    selectedColor,
    selectedSize,
    variantKey,
  });

  return Response.json({ status: "Added to wishlist" });
}

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email)
    return Response.json({ error: "Unauthorized" }, { status: 401 });

  await connectDB();
  const userDoc = await User.findOne({ email: session.user.email });
  const items = await Wishlist.find({ user: userDoc._id });
  return Response.json({ items });
}
