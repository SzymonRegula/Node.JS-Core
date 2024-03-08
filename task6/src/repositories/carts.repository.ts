import { CartEntity, CartItemEntity } from "../entities/cart.entity";
import { v4 as uuidv4 } from "uuid";
import { getProductById } from "./products.repository";

const carts: CartEntity[] = [
  {
    id: "1434fec6-cd85-420d-95c0-eee2301a971d",
    userId: "0fe36d16-49bc-4aab-a227-f84df899a6cb",
    isDeleted: false,
    items: [
      {
        product: {
          id: "5c293ad0-19d0-41ee-baa3-4c648f9f7697",
          title: "Book",
          description: "Interesting book",
          price: 200,
        },
        count: 2,
      },
    ],
  },
];

const createNewCart = (userId: string) => {
  const newCart: CartEntity = {
    id: uuidv4(),
    userId,
    isDeleted: false,
    items: [],
  };
  carts.push(newCart);
  return newCart;
};

const findCart = (userId: string) => {
  return carts.find((cart) => cart.userId === userId && !cart.isDeleted);
};

const getCartByUserId = (userId: string) => {
  const cart = findCart(userId);
  if (cart) {
    return cart;
  }
  return createNewCart(userId);
};

const deleteCartByUserId = (userId: string) => {
  const cart = findCart(userId);
  if (cart) {
    cart.isDeleted = true;
  }
  return createNewCart(userId);
};

const updateCartItems = (userId: string, productId: string, count: number) => {
  const cart = findCart(userId);
  if (!cart) {
    throw new Error("Cart was not found");
  }
  const itemIndex = cart.items.findIndex(
    (item) => item.product.id === productId
  );

  if (itemIndex === -1 && count > 0) {
    const product = getProductById(productId);
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
  return cart;
};

export { getCartByUserId, deleteCartByUserId, updateCartItems };
