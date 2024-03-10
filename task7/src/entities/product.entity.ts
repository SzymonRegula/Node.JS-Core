import { Schema, model } from "mongoose";

export interface ProductEntity {
  id: string; // uuid
  title: string;
  description: string;
  price: number;
}

export const ProductSchema: Schema = new Schema<ProductEntity>({
  id: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
});

export const ProductModel = model<ProductEntity>("Product", ProductSchema);
