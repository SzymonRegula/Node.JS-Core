import { CartEntity } from "../entities/cart.entity";
import {
  DeliveryEntity,
  OrderEntity,
  PaymentEntity,
} from "../entities/order.entity";
import { v4 as uuidv4 } from "uuid";
import * as cartsRespository from "../repositories/carts.repository";
import * as ordersRepository from "../repositories/orders.repository";

const getCartByUserId = (id: string) => {
  const cart = cartsRespository.getCartByUserId(id);
  return getCartResponse(cart);
};

const deleteCartByUserId = (id: string) => {
  const newCart = cartsRespository.deleteCartByUserId(id);
  return getCartResponse(newCart);
};

const updateCartItems = (userId: string, productId: string, count: number) => {
  const cart = cartsRespository.updateCartItems(userId, productId, count);
  return getCartResponse(cart);
};

const getCartResponse = (cart: CartEntity) => {
  const total = cart.items.reduce(
    (acc, { product, count }) => acc + product.price * count,
    0
  );
  const { userId, isDeleted, ...cartWithoutUserIdAndIsDeleted } = cart;

  const cartResponse = {
    cart: cartWithoutUserIdAndIsDeleted,
    total,
  };

  return cartResponse;
};

const createOrder = (
  userId: string,
  payment: PaymentEntity,
  delivery: DeliveryEntity,
  comments: string
) => {
  const cart = cartsRespository.getCartByUserId(userId);
  if (cart.items.length === 0) {
    throw new Error("Cart is empty");
  }
  const order: OrderEntity = {
    id: uuidv4(),
    userId,
    cartId: cart.id,
    items: cart.items,
    payment,
    delivery,
    comments,
    status: "created",
    total: cart.items.reduce(
      (acc, { product, count }) => acc + product.price * count,
      0
    ),
  };
  ordersRepository.createOrder(order);

  return { order };
};

export { getCartByUserId, deleteCartByUserId, updateCartItems, createOrder };
