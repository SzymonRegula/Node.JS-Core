import { Request, Response } from "express";
import * as productsService from "../services/products.service";
import { genereateResponse } from "../utils/response";

const getAllProducts = async (req: Request, res: Response) => {
  const products = await productsService.getAllProducts();
  console.log("productsController", products);

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
