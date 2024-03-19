import { ProductModel } from "../entities/product.entity";
import { logger } from "../utils";

const getAllProducts = async () => {
  try {
    const products = await ProductModel.find({}, { _id: 0 });
    return products;
  } catch (error) {
    logger.error(`Error getting all products: ${(error as Error).message}`);
    throw error;
  }
};

const getProductById = async (id: string) => {
  try {
    const product = await ProductModel.findOne({ id: id }, { _id: 0 });
    return product;
  } catch (error) {
    logger.error(`Error getting product by id: ${(error as Error).message}`);
    throw error;
  }
};

export { getAllProducts, getProductById };
