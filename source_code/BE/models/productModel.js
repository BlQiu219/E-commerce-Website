import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: String, required: true },
  brand: { type: String, required: true },
  bestseller: { type: Boolean, default: false },
  images: { type: [String], required: true },
  date: { type: Date, required: true }, // Ensure this is required
});
const productModel =
  mongoose.models.product || mongoose.model("product", productSchema);

export default productModel;
