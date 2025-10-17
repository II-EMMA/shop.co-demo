import mongoose from "mongoose";

const ProductVariantSchema = new mongoose.Schema(
  {
    productId: {
      type: Number,
      required: true,
      validate: {
        validator: Number.isInteger,
        message: "productId must be an integer",
      },
    },
    title: { type: String, required: true },
    price: {
      type: String,
      required: true,
      match: /^\$\d+(\.\d{2})?$/, // e.g. "$145.00"
    },
    quantity: {
      type: Number,
      required: true,
      min: [1, "Quantity must be at least 1"],
    },
    selectedColor: { type: String, required: true },
    selectedSize: { type: String, required: true },
    selectedStyle: { type: String, default: null },
    variantKey: { type: String, required: true },
    addedAt: { type: Date, required: true },
  },
  { _id: false }
);

const PurchaseSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    productsPurchased: {
      type: [ProductVariantSchema],
      required: true,
      validate: {
        validator: (arr) => arr.length > 0,
        message: "productsPurchased must contain at least one item",
      },
    },
    purchasedAt: { type: Date, default: Date.now },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Purchase ||
  mongoose.model("Purchase", PurchaseSchema);
