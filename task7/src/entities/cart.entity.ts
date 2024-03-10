import { Schema, model } from "mongoose";
import { ProductEntity, ProductSchema } from "./product.entity";

export interface CartItemEntity {
  product: ProductEntity;
  count: number;
}

export interface CartEntity {
  id: string; // uuid
  userId: string;
  isDeleted: boolean;
  items: CartItemEntity[];
}

export const CartItemSchema: Schema = new Schema<CartItemEntity>({
  product: { type: ProductSchema, required: true },
  count: { type: Number, required: true },
});

const CartSchema: Schema = new Schema<CartEntity>({
  id: { type: String, required: true },
  userId: { type: String, required: true },
  isDeleted: { type: Boolean, required: true },
  items: { type: [CartItemSchema] },
});

export const CartModel = model<CartEntity>("Cart", CartSchema);
