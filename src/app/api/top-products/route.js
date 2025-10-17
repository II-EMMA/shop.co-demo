import mongoose from "mongoose";
import Purchase from "@/models/Purchase";

const connectDB = async () => {
  if (mongoose.connection.readyState >= 1) return;
  await mongoose.connect(process.env.MONGODB_URL);
};

export async function GET() {
  await connectDB();

  const topProducts = await Purchase.aggregate([
    { $unwind: "$productsPurchased" },
    {
      $group: {
        _id: "$productsPurchased.productId",
        totalSold: { $sum: "$productsPurchased.quantity" },
      },
    },
    { $sort: { totalSold: -1 } },
    { $limit: 4 },
  ]);

  return Response.json(topProducts);
}
