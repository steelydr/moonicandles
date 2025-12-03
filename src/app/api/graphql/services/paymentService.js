// src/app/api/graphql/services/paymentService.js
import { randomUUID } from "crypto";
import bigquery from "../lib/bigqueryClient";

const dataset = "mooni-candles-api.candle_store";
const table = "payment";

// Normalize BigQuery row → plain JS for GraphQL
function normalizePaymentRow(row) {
  return {
    ...row,
  };
}

const paymentService = {
  // Get all payments
  async getPayments() {
    const query = `SELECT * FROM \`${dataset}.${table}\``;
    const [rows] = await bigquery.query({ query });
    return rows.map(normalizePaymentRow);
  },

  // Get a single payment by paymentid
  async getPaymentById(paymentid) {
    const query = `
      SELECT * FROM \`${dataset}.${table}\`
      WHERE paymentid = @paymentid
    `;
    const params = { paymentid: String(paymentid) };

    const [rows] = await bigquery.query({ query, params });
    const row = rows[0] || null;
    return row ? normalizePaymentRow(row) : null;
  },

  // Get all payments for a specific order
  async getPaymentsByOrder(orderid) {
    const query = `
      SELECT * FROM \`${dataset}.${table}\`
      WHERE orderid = @orderid
    `;
    const params = { orderid: String(orderid) };

    const [rows] = await bigquery.query({ query, params });
    return rows.map(normalizePaymentRow);
  },

  // Create a new payment
  async createPayment(data) {
    const paymentid = randomUUID();

    const params = {
      paymentid,
      orderid: String(data.orderid),
      payment_status: data.payment_status ?? "pending",
      payment_method: data.payment_method ?? "credit_card",
      currency: data.currency ?? "USD",
      payment_msg: data.payment_msg ?? null,
    };

    const query = `
      INSERT INTO \`${dataset}.${table}\`
      (paymentid, orderid, payment_status, payment_method, currency, payment_msg)
      VALUES (@paymentid, @orderid, @payment_status, @payment_method, @currency, @payment_msg)
    `;

    await bigquery.query({ query, params });

    return normalizePaymentRow(params);
  },

  // Update an existing payment
  async updatePayment(paymentid, data) {
    const params = {
      paymentid: String(paymentid),
      payment_status: data.payment_status ?? null,
      payment_method: data.payment_method ?? null,
      currency: data.currency ?? null,
      payment_msg: data.payment_msg ?? null,
    };

    const query = `
      UPDATE \`${dataset}.${table}\`
      SET
        payment_status = @payment_status,
        payment_method = @payment_method,
        currency = @currency,
        payment_msg = @payment_msg
      WHERE paymentid = @paymentid
    `;

    await bigquery.query({ query, params });

    return {
      paymentid,
      orderid: null, // not changed here
      payment_status: params.payment_status,
      payment_method: params.payment_method,
      currency: params.currency,
      payment_msg: params.payment_msg,
    };
  },

  // Delete a payment
  async deletePayment(paymentid) {
    const query = `
      DELETE FROM \`${dataset}.${table}\`
      WHERE paymentid = @paymentid
    `;
    const params = { paymentid: String(paymentid) };

    await bigquery.query({ query, params });
    return true;
  },
};

export default paymentService;
