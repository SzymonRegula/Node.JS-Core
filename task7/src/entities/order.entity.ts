import { CartItemEntity } from "./cart.entity";

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
