// src/app/api/graphql/resolvers/cartResolvers.js
import cartService from "../services/cartService.js";

const cartResolvers = {
  Query: {
    // Get all carts
    carts: () => cartService.getCarts(),

    // Get a single cart by ID
    cart: (_parent, { cartid }) =>
      cartService.getCartById(cartid),

    // Get all carts belonging to a specific user
    cartsByUser: (_parent, { user_id }) =>
      cartService.getCartsByUser(user_id),
  },

  Mutation: {
    // Create a new cart entry
    createCart: (_parent, args) =>
      cartService.createCart(args),

    // Update existing cart entry
    updateCart: (_parent, { cartid, ...data }) =>
      cartService.updateCart(cartid, data),

    // Delete a cart entry
    deleteCart: (_parent, { cartid }) =>
      cartService.deleteCart(cartid),
  },
};

export default cartResolvers;
