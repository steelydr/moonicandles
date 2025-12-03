// src/app/api/graphql/resolvers/orderResolvers.js
import orderService from "../services/orderService.js";

const orderResolvers = {
  Query: {
    // Get all orders
    orders: () =>
      orderService.getOrders(),

    // Get one order by ID
    order: (_parent, { orderid }) =>
      orderService.getOrderById(orderid),

    // Get all orders belonging to a specific user
    ordersByUser: (_parent, { userid }) =>
      orderService.getOrdersByUser(userid),
  },

  Mutation: {
    // Create a new order
    createOrder: (_parent, args) =>
      orderService.createOrder(args),

    // Update order status or shipment location
    updateOrder: (_parent, { orderid, ...data }) =>
      orderService.updateOrder(orderid, data),

    // Delete an order
    deleteOrder: (_parent, { orderid }) =>
      orderService.deleteOrder(orderid),
  },
};

export default orderResolvers;
