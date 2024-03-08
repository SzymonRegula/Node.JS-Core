import { OrderEntity } from "../entities/order.entity";

const orders: OrderEntity[] = [];

const createOrder = (order: OrderEntity) => {
  orders.push(order);
  return order;
};

export { createOrder };
