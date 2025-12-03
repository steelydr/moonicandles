// src/app/api/graphql/resolvers/paymentResolvers.js
import paymentService from "../services/paymentService.js";

const paymentResolvers = {
  Query: {
    // Get all payments
    payments: () =>
      paymentService.getPayments(),

    // Get a single payment by ID
    payment: (_parent, { paymentid }) =>
      paymentService.getPaymentById(paymentid),

    // Get all payments for a specific order
    paymentsByOrder: (_parent, { orderid }) =>
      paymentService.getPaymentsByOrder(orderid),
  },

  Mutation: {
    // Create a new payment
    createPayment: (_parent, args) =>
      paymentService.createPayment(args),

    // Update an existing payment
    updatePayment: (_parent, { paymentid, ...data }) =>
      paymentService.updatePayment(paymentid, data),

    // Delete a payment
    deletePayment: (_parent, { paymentid }) =>
      paymentService.deletePayment(paymentid),
  },
};

export default paymentResolvers;
