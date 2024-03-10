import { Schema, model } from "mongoose";
import { CartItemEntity, CartItemSchema } from "./cart.entity";

type ORDER_STATUS = "created" | "completed";

export interface PaymentEntity {
  type: string;
  address?: any;
  creditCard?: any;
}

export interface DeliveryEntity {
  type: string;
  address: any;
}

export interface OrderEntity {
  id: string; // uuid
  userId: string;
  cartId: string;
  items: CartItemEntity[]; // products from CartEntity
  payment: PaymentEntity;
  delivery: DeliveryEntity;
  comments: string;
  status: ORDER_STATUS;
  total: number;
}

const PaymentSchema: Schema = new Schema<PaymentEntity>({
  type: { type: String, required: true },
  address: { type: Schema.Types.Mixed },
  creditCard: { type: Schema.Types.Mixed },
});

const DeliverySchema: Schema = new Schema<DeliveryEntity>({
  type: { type: String, required: true },
  address: { type: Schema.Types.Mixed, required: true },
});

const OrderSchema: Schema = new Schema<OrderEntity>({
  id: { type: String, required: true },
  userId: { type: String, required: true },
  cartId: { type: String, required: true },
  items: { type: [CartItemSchema], required: true },
  payment: { type: PaymentSchema, required: true },
  delivery: { type: DeliverySchema, required: true },
  comments: { type: String, required: true },
  status: { type: String, required: true },
  total: { type: Number, required: true },
});

export const OrderModel = model<OrderEntity>("Order", OrderSchema);
