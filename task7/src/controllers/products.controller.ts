import { Request, Response } from "express";
import * as productsService from "../services/products.service";
import { genereateResponse } from "../utils/response";

const getAllProducts = (req: Request, res: Response) => {
  const products = productsService.getAllProducts();

  res.send(genereateResponse(products));
};

const getProductById = (req: Request, res: Response) => {
  const id = req.params.productId;
  const product = productsService.getProductById(id);

  if (!product) {
    res.status(404).send(genereateResponse(null, "No product with such id"));
  }

  res.send(genereateResponse(product));
};

export { getAllProducts, getProductById };
