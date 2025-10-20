import mongoose from "mongoose";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/authOptions";
import User from "@/models/User";
import Purchase from "@/models/Purchase";

const connectDB = async () => {
  if (mongoose.connection.readyState >= 1) return;
  await mongoose.connect(process.env.MONGODB_URL);
};

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return Response.json({ error: "Not authenticated" }, { status: 401 });
  }

  await connectDB();

  const userDoc = await User.findOne({ email: session.user.email });
  if (!userDoc) {
    return Response.json({ error: "User not found" }, { status: 404 });
  }

  const purchases = await Purchase.find({ user: userDoc._id });

  if (purchases.length === 0) {
    return Response.json({ fallback: true });
  }

  const productFrequency = {};

  purchases.forEach((purchase) => {
    purchase.productsPurchased.forEach((item) => {
      productFrequency[item.productId] =
        (productFrequency[item.productId] || 0) + item.quantity;
    });
  });

  const sortedIds = Object.entries(productFrequency)
    .sort((a, b) => b[1] - a[1])
    .map(([id]) => parseInt(id))
    .slice(0, 4);

  return Response.json({ fallback: false, productIds: sortedIds });
}
