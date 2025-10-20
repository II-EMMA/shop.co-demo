// app/api/users/route.js
import mongoose from "mongoose";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/authOptions";
import User from "@/models/User";

const connectDB = async () => {
  if (mongoose.connection.readyState >= 1) return;
  await mongoose.connect(process.env.MONGODB_URL);
};

export async function POST() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return Response.json({ error: "Not authenticated" }, { status: 401 });
  }

  await connectDB();

  // ✅ Update or return existing user, don’t insert manually
  const user = await User.findOneAndUpdate(
    { email: session.user.email },
    {
      $set: {
        name: session.user.name,
        image: session.user.image,
      },
    },
    { upsert: true, new: true }
  );

  return Response.json({ status: "User ensured", user });
}

export async function GET() {
  await connectDB();
  const users = await User.find({});
  return Response.json(users);
}
