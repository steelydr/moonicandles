// src/app/api/graphql/models/CartModel.js

/**
 * Cart Schema (BigQuery-Backed)
 *
 * @typedef {Object} Cart
 * @property {string} cartid                // PK
 * @property {string} user_id               // FK → user.userid
 * @property {string|null} customization_id // FK → custom_design.customizationid (optional)
 * @property {string|null} product_variant_id // FK → product_variant.product_variant (optional)
 * @property {number} quantity              // Must be positive integer
 * @property {string} cart_status           // active, checked_out, abandoned, saved_for_later
 */

const CartModel = {
  cartid: "string",
  user_id: "string",
  customization_id: "string",
  product_variant_id: "string",
  quantity: "int64",
  cart_status: "string",
};

export default CartModel;
