import { ProductEntity } from "../entities/product.entity";

const products: ProductEntity[] = [
  {
    id: "5c293ad0-19d0-41ee-baa3-4c648f9f7697",
    title: "Book",
    description: "Interesting book",
    price: 200,
  },
  {
    id: "afdd68c4-d359-45e6-b9fd-c8fdb2a162a0",
    title: "Pen",
    description: "Cute pen",
    price: 20,
  },
];

const getAllProducts = () => {
  return products;
};

const getProductById = (id: string) => {
  return products.find((product) => product.id === id);
};

export { getAllProducts, getProductById };
