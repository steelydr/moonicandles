// src/app/api/graphql/services/orderService.js
import { randomUUID } from "crypto";
import bigquery from "../lib/bigqueryClient";

const dataset = "mooni-candles-api.candle_store";
const table = "order";

// Normalize BigQuery row → plain JS object for GraphQL
function normalizeOrderRow(row) {
  let order_created_at = row.order_created_at;

  // BigQuery TIMESTAMP can come back in a few shapes
  if (order_created_at && typeof order_created_at === "object") {
    if ("value" in order_created_at) {
      // e.g. { value: '2025-12-02T17:10:00.123Z' }
      order_created_at = order_created_at.value;
    } else if (typeof order_created_at.toISOString === "function") {
      order_created_at = order_created_at.toISOString();
    } else {
      order_created_at = String(order_created_at);
    }
  }

  return {
    ...row,
    order_created_at,
    subtotal_amount: row.subtotal_amount != null ? Number(row.subtotal_amount) : 0,
    tax_amount: row.tax_amount != null ? Number(row.tax_amount) : 0,
    shipment_amount: row.shipment_amount != null ? Number(row.shipment_amount) : 0,
    total_amount: row.total_amount != null ? Number(row.total_amount) : 0,
  };
}

const orderService = {
  // Get all orders
  async getOrders() {
    const query = `SELECT * FROM \`${dataset}.${table}\``;
    const [rows] = await bigquery.query({ query });
    return rows.map(normalizeOrderRow);
  },

  // Get one order by ID
  async getOrderById(orderid) {
    const query = `
      SELECT * FROM \`${dataset}.${table}\`
      WHERE orderid = @orderid
    `;
    const params = { orderid: String(orderid) };

    const [rows] = await bigquery.query({ query, params });
    const row = rows[0] || null;
    return row ? normalizeOrderRow(row) : null;
  },

  // Get all orders for a user
  async getOrdersByUser(userid) {
    const query = `
      SELECT * FROM \`${dataset}.${table}\`
      WHERE userid = @userid
    `;
    const params = { userid: String(userid) };

    const [rows] = await bigquery.query({ query, params });
    return rows.map(normalizeOrderRow);
  },

  // Create order (typically from a cart)
  async createOrder(data) {
    const orderid = randomUUID();

    // Always set server-side timestamp in UTC
    const now = new Date().toISOString(); // ISO string, UTC

    const params = {
      orderid,
      userid: String(data.userid),
      addressid: String(data.addressid),
      cartid: String(data.cartid),

      order_created_at: now,
      order_status: data.order_status ?? "pending",

      subtotal_amount:
        typeof data.subtotal_amount === "number"
          ? data.subtotal_amount
          : 0,
      tax_amount:
        typeof data.tax_amount === "number"
          ? data.tax_amount
          : 0,
      shipment_amount:
        typeof data.shipment_amount === "number"
          ? data.shipment_amount
          : 0,
      total_amount:
        typeof data.total_amount === "number"
          ? data.total_amount
          : 0,

      shipment_location: data.shipment_location ?? null,
    };

    const query = `
      INSERT INTO \`${dataset}.${table}\`
      (
        orderid, userid, addressid, cartid,
        order_created_at, order_status,
        subtotal_amount, tax_amount, shipment_amount, total_amount,
        shipment_location
      )
      VALUES (
        @orderid, @userid, @addressid, @cartid,
        @order_created_at, @order_status,
        @subtotal_amount, @tax_amount, @shipment_amount, @total_amount,
        @shipment_location
      )
    `;

    await bigquery.query({ query, params });

    return normalizeOrderRow(params);
  },

  // Update order (status + tracking)
  async updateOrder(orderid, data) {
    const params = {
      orderid: String(orderid),
      order_status: data.order_status ?? null,
      shipment_location: data.shipment_location ?? null,
    };

    const query = `
      UPDATE \`${dataset}.${table}\`
      SET
        order_status = @order_status,
        shipment_location = @shipment_location
      WHERE orderid = @orderid
    `;

    await bigquery.query({ query, params });

    return {
      orderid,
      userid: null,            // not updated here
      addressid: null,         // not updated here
      cartid: null,            // not updated here
      order_created_at: null,  // not updated here
      order_status: params.order_status,
      subtotal_amount: null,
      tax_amount: null,
      shipment_amount: null,
      total_amount: null,
      shipment_location: params.shipment_location,
    };
  },

  // Delete order
  async deleteOrder(orderid) {
    const query = `
      DELETE FROM \`${dataset}.${table}\`
      WHERE orderid = @orderid
    `;
    const params = { orderid: String(orderid) };

    await bigquery.query({ query, params });
    return true;
  },
};

export default orderService;
