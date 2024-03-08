import { Request, Response } from "express";
import * as cartsService from "../services/carts.service";
import { genereateResponse } from "../utils/response";
import { DeliveryEntity, PaymentEntity } from "../entities/order.entity";

const getCartByUserId = (req: Request, res: Response) => {
  const userId = req.headers["x-user-id"] as string;
  const cart = cartsService.getCartByUserId(userId);

  res.send(genereateResponse(cart));
};

const deleteCartByUserId = (req: Request, res: Response) => {
  const userId = req.headers["x-user-id"] as string;
  cartsService.deleteCartByUserId(userId);

  res.send(genereateResponse({ success: true }));
};

const updateCartItems = (req: Request, res: Response) => {
  const userId = req.headers["x-user-id"] as string;
  const { productId, count } = req.body;

  try {
    const cart = cartsService.updateCartItems(userId, productId, count);
    res.send(genereateResponse(cart));
  } catch (error) {
    const err = error as Error;
    if (err.message === "Cart was not found") {
      return res.status(404).send(genereateResponse(null, err.message));
    }
    if (err.message === "Products are not valid") {
      return res.status(400).send(genereateResponse(null, err.message));
    }
    throw err;
  }
};

const createOrder = (req: Request, res: Response) => {
  const userId = req.headers["x-user-id"] as string;

  const payment: PaymentEntity = {
    type: "paypal",
    address: "London",
    creditCard: "1234-1234-1234-1234",
  };
  const delivery: DeliveryEntity = {
    type: "post",
    address: "London",
  };
  const comments = "some comments";

  try {
    const order = cartsService.createOrder(userId, payment, delivery, comments);
    cartsService.deleteCartByUserId(userId);
    res.send(genereateResponse(order));
  } catch (error) {
    const err = error as Error;
    if (err.message === "Cart is empty") {
      return res.status(400).send(genereateResponse(null, err.message));
    }
    throw err;
  }
};

export { getCartByUserId, deleteCartByUserId, updateCartItems, createOrder };
