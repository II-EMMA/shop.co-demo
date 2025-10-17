import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    image: { type: String }, // profile picture from Google
    role: { type: String, default: "user" }, // can be "admin", "user", etc.
    address: {
      street: String,
      city: String,
      country: String,
      zip: String,
    },
    phone: { type: String },
    createdAt: { type: Date, default: Date.now },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.User || mongoose.model("User", UserSchema);
