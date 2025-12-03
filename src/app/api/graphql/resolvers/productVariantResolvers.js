// src/app/api/graphql/resolvers/productVariantResolvers.js
import productVariantService from "../services/productVariantService.js";

const productVariantResolvers = {
  Query: {
    // Get all product variants
    productVariants: () =>
      productVariantService.getProductVariants(),

    // Get single variant by variant ID
    productVariant: (_parent, { product_variant }) =>
      productVariantService.getProductVariantById(product_variant),

    // Get all variants for a specific product
    variantsByProduct: (_parent, { productid }) =>
      productVariantService.getVariantsByProduct(productid),
  },

  Mutation: {
    // Create new variant
    createProductVariant: (_parent, args) =>
      productVariantService.createProductVariant(args),

    // Update variant
    updateProductVariant: (_parent, { product_variant, ...data }) =>
      productVariantService.updateProductVariant(product_variant, data),

    // Delete variant
    deleteProductVariant: (_parent, { product_variant }) =>
      productVariantService.deleteProductVariant(product_variant),
  },
};

export default productVariantResolvers;
