import { OrderEntity, OrderModel } from "../entities/order.entity";

const createOrder = async (order: OrderEntity) => {
  try {
    await OrderModel.create(order);
  } catch (error) {
    console.log(`Error creating order: ${(error as Error).message}`);
    throw error;
  }
  return order;
};

export { createOrder };
