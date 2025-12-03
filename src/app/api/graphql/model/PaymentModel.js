// src/app/api/graphql/models/PaymentModel.js

/**
 * Payment Schema (BigQuery-Backed)
 *
 * @typedef {Object} Payment
 * @property {string} paymentid          // PK
 * @property {string} orderid            // FK → order.orderid
 * @property {string} payment_status     // pending, processing, completed, failed, refunded, cancelled
 * @property {string} payment_method     // credit_card, debit_card, paypal, apple_pay, google_pay, bank_transfer
 * @property {string} currency           // ISO-4217 currency code (USD, EUR, GBP)
 * @property {string|null} payment_msg   // gateway response / transaction reference
 */

const PaymentModel = {
  paymentid: "string",
  orderid: "string",
  payment_status: "string",
  payment_method: "string",
  currency: "string",
  payment_msg: "string",
};

export default PaymentModel;
