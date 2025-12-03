// src/app/api/graphql/resolvers/customDesignResolvers.js
import customDesignService from "../services/customDesignService.js";

const customDesignResolvers = {
  Query: {
    // Get all custom designs
    customDesigns: () =>
      customDesignService.getCustomDesigns(),

    // Get a single custom design by ID
    customDesign: (_parent, { customizationid }) =>
      customDesignService.getCustomDesignById(customizationid),

    // Get all custom designs created by a specific user
    customDesignsByUser: (_parent, { userid }) =>
      customDesignService.getCustomDesignsByUser(userid),
  },

  Mutation: {
    // Create a new custom design
    createCustomDesign: (_parent, args) =>
      customDesignService.createCustomDesign(args),

    // Update an existing custom design
    updateCustomDesign: (_parent, { customizationid, ...data }) =>
      customDesignService.updateCustomDesign(customizationid, data),

    // Delete a custom design
    deleteCustomDesign: (_parent, { customizationid }) =>
      customDesignService.deleteCustomDesign(customizationid),
  },
};

export default customDesignResolvers;
