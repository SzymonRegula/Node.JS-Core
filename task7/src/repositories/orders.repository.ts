import { OrderEntity, OrderModel } from "../entities/order.entity";
import { logger } from "../utils";

const createOrder = async (order: OrderEntity) => {
  try {
    await OrderModel.create(order);
  } catch (error) {
    logger.error(`Error creating order: ${(error as Error).message}`);
    throw error;
  }
  return order;
};

export { createOrder };
