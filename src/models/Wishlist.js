// import mongoose from "mongoose";

// const WishlistSchema = new mongoose.Schema(
//   {
//     user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
//     productId: { type: Number, required: true },
//     selectedColor: { type: String, required: true },
//     selectedSize: { type: String, required: true },
//     variantKey: { type: String, required: true, unique: true },
//     addedAt: { type: Date, default: Date.now },
//   },
//   { timestamps: true }
// );

// export default mongoose.models.Wishlist ||
//   mongoose.model("Wishlist", WishlistSchema);

import mongoose from "mongoose";

const WishlistSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    productId: { type: Number, required: true },
    selectedColor: { type: String, required: true },
    selectedSize: { type: String, required: true },
    variantKey: { type: String, required: true },
    addedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

// Ensure uniqueness per user
WishlistSchema.index({ userId: 1, variantKey: 1 }, { unique: true });

export default mongoose.models.Wishlist ||
  mongoose.model("Wishlist", WishlistSchema);
