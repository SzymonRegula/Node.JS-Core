import * as productsRepository from "../repositories/products.repository";

const getAllProducts = () => {
  return productsRepository.getAllProducts();
};

const getProductById = (id: string) => {
  return productsRepository.getProductById(id);
};

export { getAllProducts, getProductById };
