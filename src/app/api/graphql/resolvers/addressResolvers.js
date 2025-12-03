// src/app/api/graphql/resolvers/addressResolvers.js
import addressService from "../services/addressService.js";

const addressResolvers = {
  Query: {
    // Get all addresses
    addresses: () => addressService.getAddresses(),

    // Get a single address by addressid
    address: (_parent, { addressid }) =>
      addressService.getAddressById(addressid),

    // Get all addresses for a specific user
    addressesByUser: (_parent, { userid }) =>
      addressService.getAddressesByUser(userid),
  },

  Mutation: {
    // Create a new address
    createAddress: (_parent, args) => addressService.createAddress(args),

    // Update an existing address
    updateAddress: (_parent, { addressid, ...data }) =>
      addressService.updateAddress(addressid, data),

    // Delete an address
    deleteAddress: (_parent, { addressid }) =>
      addressService.deleteAddress(addressid),
  },
};

export default addressResolvers;
