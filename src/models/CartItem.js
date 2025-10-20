import mongoose from "mongoose";

const CartItemSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  productId: { type: String, required: true },
  selectedColor: { type: String, required: true },
  selectedSize: { type: String, required: true },
  selectedStyle: { type: String },
  quantity: { type: Number, required: true },
  price: { type: Number, required: true },
  variantKey: { type: String, required: true },
  addedAt: { type: Date, default: Date.now },
});

export default mongoose.models.CartItem ||
  mongoose.model("CartItem", CartItemSchema);
