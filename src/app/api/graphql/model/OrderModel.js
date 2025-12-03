// src/app/api/graphql/models/OrderModel.js

/**
 * Order Schema (BigQuery-Backed)
 *
 * @typedef {Object} Order
 * @property {string} orderid              // PK
 * @property {string} userid               // FK → user.userid
 * @property {string} addressid            // FK → address.addressid (shipping)
 * @property {string} cartid               // FK → cart.cartid (converted cart)
 * @property {string} order_created_at     // Timestamp (UTC)
 * @property {string} order_status         // pending, confirmed, processing, shipped, delivered, cancelled, refunded
 * @property {number} subtotal_amount      // Subtotal in cents
 * @property {number} tax_amount           // Tax in cents
 * @property {number} shipment_amount      // Shipping cost in cents
 * @property {number} total_amount         // subtotal + tax + shipping (in cents)
 * @property {string|null} shipment_location // Optional tracking location
 */

const OrderModel = {
  orderid: "string",
  userid: "string",
  addressid: "string",
  cartid: "string",
  order_created_at: "timestamp",
  order_status: "string",
  subtotal_amount: "int64",
  tax_amount: "int64",
  shipment_amount: "int64",
  total_amount: "int64",
  shipment_location: "string",
};

export default OrderModel;
