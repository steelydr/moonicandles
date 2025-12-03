// src/app/api/graphql/models/ProductModel.js

/**
 * Product Schema (BigQuery-Backed)
 *
 * @typedef {Object} Product
 * @property {string} productid           // PK
 * @property {string} product_name        // Required product display name
 * @property {string|null} imageurl       // Cloud storage image URL
 * @property {string|null} candle_type    // pillar, jar, taper, votive, tealight, floating, container
 * @property {string|null} wax_type       // soy, beeswax, paraffin, coconut, palm, gel
 * @property {string|null} scent_type     // fragrance name or profile
 * @property {string|null} container_type // glass, tin, ceramic, bamboo, concrete, none
 */

const ProductModel = {
  productid: "string",
  product_name: "string",
  imageurl: "string",
  candle_type: "string",
  wax_type: "string",
  scent_type: "string",
  container_type: "string",
};

export default ProductModel;
