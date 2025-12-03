// src/app/api/graphql/models/ProductVariantModel.js

/**
 * Product Variant Schema (BigQuery-Backed)
 *
 * @typedef {Object} ProductVariant
 * @property {string} product_variant          // PK
 * @property {string} productid                // FK → product.productid
 * @property {string} product_variant_name     // Display name for variant
 * @property {string|null} height_width_inches // Format: "HxW" (e.g. "4x3")
 * @property {number|null} wax_amount_oz       // Wax weight in ounces
 * @property {string|null} wick_type           // cotton, wood, hemp, etc.
 * @property {string|null} container_color     // Color of container
 * @property {string|null} wax_base_color      // Base wax color
 * @property {number|null} burn_time_hours     // Burn time in hours
 * @property {number} stock_quantity           // Inventory count (required)
 * @property {number|null} low_stock_threshold // Alert threshold
 */

const ProductVariantModel = {
  product_variant: "string",
  productid: "string",
  product_variant_name: "string",
  height_width_inches: "string",
  wax_amount_oz: "int64",
  wick_type: "string",
  container_color: "string",
  wax_base_color: "string",
  burn_time_hours: "int64",
  stock_quantity: "int64",
  low_stock_threshold: "int64",
};

export default ProductVariantModel;
