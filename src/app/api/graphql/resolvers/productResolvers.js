// src/app/api/graphql/resolvers/productResolvers.js
import productService from "../services/productService.js";

const productResolvers = {
  Query: {
    // Get all products
    products: () =>
      productService.getProducts(),

    // Get single product by ID
    product: (_parent, { productid }) =>
      productService.getProductById(productid),
  },

  Mutation: {
    // Create new product
    createProduct: (_parent, args) =>
      productService.createProduct(args),

    // Update existing product
    updateProduct: (_parent, { productid, ...data }) =>
      productService.updateProduct(productid, data),

    // Delete product
    deleteProduct: (_parent, { productid }) =>
      productService.deleteProduct(productid),
  },
};

export default productResolvers;
