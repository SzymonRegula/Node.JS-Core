import { Request, Response } from "express";
import * as productsService from "../services/products.service";
import { genereateResponse } from "../utils";

const getAllProducts = async (req: Request, res: Response) => {
  const products = await productsService.getAllProducts();

  res.send(genereateResponse(products));
};

const getProductById = async (req: Request, res: Response) => {
  const id = req.params.productId;
  const product = await productsService.getProductById(id);

  if (!product) {
    res.status(404).send(genereateResponse(null, "No product with such id"));
  }

  res.send(genereateResponse(product));
};

export { getAllProducts, getProductById };
