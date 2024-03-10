import { CartEntity } from "../entities/cart.entity";
import {
  DeliveryEntity,
  OrderEntity,
  PaymentEntity,
} from "../entities/order.entity";
import { v4 as uuidv4 } from "uuid";
import * as cartsRespository from "../repositories/carts.repository";
import * as ordersRepository from "../repositories/orders.repository";

const getCartByUserId = async (id: string) => {
  const cart = await cartsRespository.getCartByUserId(id);
  return getCartResponse(cart);
};

const deleteCartByUserId = async (id: string) => {
  const newCart = await cartsRespository.deleteCartByUserId(id);
  return getCartResponse(newCart);
};

const updateCartItems = async (
  userId: string,
  productId: string,
  count: number
) => {
  const cart = await cartsRespository.updateCartItems(userId, productId, count);
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

const createOrder = async (
  userId: string,
  payment: PaymentEntity,
  delivery: DeliveryEntity,
  comments: string
) => {
  const cart = await cartsRespository.getCartByUserId(userId);
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
  await ordersRepository.createOrder(order);

  return { order };
};

export { getCartByUserId, deleteCartByUserId, updateCartItems, createOrder };
