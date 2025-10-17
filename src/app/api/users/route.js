import mongoose from "mongoose";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
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

  const existingUser = await User.findOne({ email: session.user.email });

  if (existingUser) {
    return Response.json({ status: "User already exists" });
  }

  const newUser = new User({
    name: session.user.name,
    email: session.user.email,
    image: session.user.image,
    createdAt: new Date(),
  });

  try {
    await newUser.save();
    return Response.json({ status: "User inserted" });
  } catch (error) {
    return Response.json(
      { error: "Insert failed", details: error.message },
      { status: 500 }
    );
  }
}

export async function GET() {
  await connectDB();
  const users = await User.find({});
  return Response.json(users);
}
