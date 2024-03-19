import { CartEntity, CartItemEntity, CartModel } from "../entities/cart.entity";
import { v4 as uuidv4 } from "uuid";
import { getProductById } from "./products.repository";
import { logger } from "../utils";

const createNewCart = async (userId: string) => {
  const newCart: CartEntity = {
    id: uuidv4(),
    userId,
    isDeleted: false,
    items: [],
  };
  try {
    await CartModel.create(newCart);
  } catch (error) {
    logger.error(`Error creating new cart: ${(error as Error).message}`);
    throw error;
  }
  return newCart;
};

const findCart = async (userId: string) => {
  try {
    const mongoCart = await CartModel.findOne(
      { userId, isDeleted: false },
      { _id: 0, __v: 0 },
      { lean: true }
    );
    return mongoCart;
  } catch (error) {
    logger.error(`Error getting cart by user id: ${(error as Error).message}`);
    throw error;
  }
};

const deleteMongoIds = (cart: any) => {
  const itemsWithoutIds = cart.items.map((item: any) => {
    delete item._id;
    delete item.product._id;

    return item;
  });
  const cartWithoutMongoIds = { ...cart, items: itemsWithoutIds };
  return cartWithoutMongoIds as CartEntity;
};

const getCartByUserId = async (userId: string) => {
  const mongoCart = await findCart(userId);
  if (mongoCart) {
    const cart = deleteMongoIds(mongoCart);
    return cart;
  }
  return createNewCart(userId);
};

const deleteCartByUserId = async (userId: string) => {
  const cart = await findCart(userId);
  if (cart) {
    cart.isDeleted = true;
    try {
      await CartModel.updateOne({ userId }, cart);
    } catch (error) {
      logger.error(
        `Error deleting cart by user id: ${(error as Error).message}`
      );
      throw error;
    }
  }
  return createNewCart(userId);
};

const updateCartItems = async (
  userId: string,
  productId: string,
  count: number
) => {
  const mongoCart = await findCart(userId);

  if (!mongoCart) {
    throw new Error("Cart was not found");
  }

  const cart = deleteMongoIds(mongoCart);

  const itemIndex = cart.items.findIndex(
    (item) => item.product.id === productId
  );

  if (itemIndex === -1 && count > 0) {
    const product = await getProductById(productId);
    if (!product) {
      throw new Error("Products are not valid");
    }
    const newCartItem: CartItemEntity = {
      product,
      count,
    };
    cart.items.push(newCartItem);
  } else if (count <= 0) {
    cart.items.splice(itemIndex, 1);
  } else {
    cart.items[itemIndex].count = count;
  }
  try {
    await CartModel.updateOne({ userId }, cart);
  } catch (error) {
    logger.error(`Error updating cart items: ${(error as Error).message}`);
    throw error;
  }
  return cart;
};

export { getCartByUserId, deleteCartByUserId, updateCartItems };
