// src/app/api/graphql/services/cartService.js
import { randomUUID } from "crypto";
import bigquery from "../lib/bigqueryClient";

const dataset = "mooni-candles-api.candle_store";
const table = "cart";

// Normalize BigQuery → JS
function normalizeCartRow(row) {
  return {
    ...row,
    quantity: row.quantity ? Number(row.quantity) : 0,
  };
}

const cartService = {
  // Get all carts
  async getCarts() {
    const query = `SELECT * FROM \`${dataset}.${table}\``;
    const [rows] = await bigquery.query({ query });
    return rows.map(normalizeCartRow);
  },

  // Get one cart
  async getCartById(cartid) {
    const query = `
      SELECT * FROM \`${dataset}.${table}\`
      WHERE cartid = @cartid
    `;
    const params = { cartid: String(cartid) };

    const [rows] = await bigquery.query({ query, params });
    const row = rows[0] || null;
    return row ? normalizeCartRow(row) : null;
  },

  // Get all carts belonging to a user
  async getCartsByUser(user_id) {
    const query = `
      SELECT * FROM \`${dataset}.${table}\`
      WHERE user_id = @user_id
    `;
    const params = { user_id: String(user_id) };

    const [rows] = await bigquery.query({ query, params });
    return rows.map(normalizeCartRow);
  },

  // Create a cart entry
  async createCart(data) {
    const cartid = randomUUID();

    const params = {
      cartid,
      user_id: String(data.user_id),

      customization_id: data.customization_id ?? null,
      product_variant_id: data.product_variant_id ?? null,

      quantity:
        typeof data.quantity === "number" ? data.quantity : 1,

      cart_status: data.cart_status ?? "active",
    };

    const query = `
      INSERT INTO \`${dataset}.${table}\`
      (
        cartid, user_id,
        customization_id, product_variant_id,
        quantity, cart_status
      )
      VALUES (
        @cartid, @user_id,
        @customization_id, @product_variant_id,
        @quantity, @cart_status
      )
    `;

    await bigquery.query({ query, params });

    return normalizeCartRow(params);
  },

  // Update an existing cart
  async updateCart(cartid, data) {
    const params = {
      cartid: String(cartid),

      customization_id: data.customization_id ?? null,
      product_variant_id: data.product_variant_id ?? null,

      quantity:
        typeof data.quantity === "number"
          ? data.quantity
          : null,

      cart_status: data.cart_status ?? null,
    };

    const query = `
      UPDATE \`${dataset}.${table}\`
      SET
        customization_id = @customization_id,
        product_variant_id = @product_variant_id,
        quantity = @quantity,
        cart_status = @cart_status
      WHERE cartid = @cartid
    `;

    await bigquery.query({ query, params });

    return {
      cartid,
      ...params,
    };
  },

  // Delete cart
  async deleteCart(cartid) {
    const query = `
      DELETE FROM \`${dataset}.${table}\`
      WHERE cartid = @cartid
    `;
    const params = { cartid: String(cartid) };

    await bigquery.query({ query, params });
    return true;
  },
};

export default cartService;
