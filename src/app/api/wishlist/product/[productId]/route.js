// import mongoose from "mongoose";
// import { getServerSession } from "next-auth";
// import { authOptions } from "@/app/api/auth/[...nextauth]/route";
// import Wishlist from "@/models/Wishlist";
// import User from "@/models/User";

// const connectDB = async () => {
//   if (mongoose.connection.readyState >= 1) return;
//   await mongoose.connect(process.env.MONGODB_URL);
// };

// export async function DELETE(request, { params }) {
//   // const { params } = context;
//   // const productId = parseInt(params.productId);
//   const { productId: id } = await params;
//   const productId = parseInt(id);

//   const session = await getServerSession(authOptions);
//   if (!session?.user?.email)
//     return Response.json({ error: "Unauthorized" }, { status: 401 });

//   await connectDB();
//   const userDoc = await User.findOne({ email: session.user.email });

//   await Wishlist.deleteMany({
//     user: userDoc._id,
//     productId,
//   });

//   return Response.json({ status: "Removed all variants from wishlist" });
// }

import mongoose from "mongoose";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/authOptions";
import Wishlist from "@/models/Wishlist";

const connectDB = async () => {
  if (mongoose.connection.readyState >= 1) return;
  await mongoose.connect(process.env.MONGODB_URL);
};

export async function DELETE(_, context) {
  const { productId } = await context.params;

  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  await connectDB();

  const result = await Wishlist.deleteMany({
    userId: session.user.id,
    productId,
  });

  console.log("Deleted count:", result.deletedCount);

  return Response.json({ status: "Removed all variants from wishlist" });
}
